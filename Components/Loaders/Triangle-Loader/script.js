const SETTINGS = {
    rebound: {
        tension: 16,
        friction: 5
    },
    spinner: {
        id: 'spinner',
        radius: 90,
        sides: 3,
        depth: 4,
        colors: {
            //background: '#231E76',
            //stroke: '#231E76',
            background: '#f0f0f0',
            stroke: '#272633',
            base: null,
            child: '#272633'
        },
        alwaysForward: true, // When false the spring will reverse normally.
        restAt: 0.5, // A number from 0.1 to 0.9 || null for full rotation
        renderBase: false
    }
};

'use strict';

(function () {
    var rebound = {};
    var util = rebound.util = {};
    var concat = Array.prototype.concat;
    var slice = Array.prototype.slice;

    // Bind a function to a context object.
    util.bind = function bind(func, context) {
        var args = slice.call(arguments, 2);
        return function () {
            func.apply(context, concat.call(args, slice.call(arguments)));
        };
    };

    // Add all the properties in the source to the target.
    util.extend = function extend(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    };

    var SpringSystem = rebound.SpringSystem = function SpringSystem(looper) {
        this._springRegistry = {};
        this._activeSprings = [];
        this.listeners = [];
        this._idleSpringIndices = [];
        this.looper = looper || new AnimationLooper();
        this.looper.springSystem = this;
    };

    util.extend(SpringSystem.prototype, {

        _springRegistry: null,

        _isIdle: true,

        _lastTimeMillis: -1,

        _activeSprings: null,

        listeners: null,

        _idleSpringIndices: null,


        setLooper: function setLooper(looper) {
            this.looper = looper;
            looper.springSystem = this;
        },


        createSpring: function createSpring(tension, friction) {
            var springConfig;
            if (tension === undefined || friction === undefined) {
                springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
            } else {
                springConfig = SpringConfig.fromOrigamiTensionAndFriction(tension, friction);
            }
            return this.createSpringWithConfig(springConfig);
        },

        createSpringWithBouncinessAndSpeed: function createSpringWithBouncinessAndSpeed(bounciness, speed) {
            var springConfig;
            if (bounciness === undefined || speed === undefined) {
                springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
            } else {
                springConfig = SpringConfig.fromBouncinessAndSpeed(bounciness, speed);
            }
            return this.createSpringWithConfig(springConfig);
        },

        // Add a spring with the provided SpringConfig.
        createSpringWithConfig: function createSpringWithConfig(springConfig) {
            var spring = new Spring(this);
            this.registerSpring(spring);
            spring.setSpringConfig(springConfig);
            return spring;
        },

        getIsIdle: function getIsIdle() {
            return this._isIdle;
        },

        getSpringById: function getSpringById(id) {
            return this._springRegistry[id];
        },

        // Get a listing of all the springs registered with this
        // SpringSystem.
        getAllSprings: function getAllSprings() {
            var vals = [];
            for (var id in this._springRegistry) {
                if (this._springRegistry.hasOwnProperty(id)) {
                    vals.push(this._springRegistry[id]);
                }
            }
            return vals;
        },

        registerSpring: function registerSpring(spring) {
            this._springRegistry[spring.getId()] = spring;
        },

        deregisterSpring: function deregisterSpring(spring) {
            removeFirst(this._activeSprings, spring);
            delete this._springRegistry[spring.getId()];
        },

        advance: function advance(time, deltaTime) {
            while (this._idleSpringIndices.length > 0) {
                this._idleSpringIndices.pop();
            } for (var i = 0, len = this._activeSprings.length; i < len; i++) {
                var spring = this._activeSprings[i];
                if (spring.systemShouldAdvance()) {
                    spring.advance(time / 1000.0, deltaTime / 1000.0);
                } else {
                    this._idleSpringIndices.push(this._activeSprings.indexOf(spring));
                }
            }
            while (this._idleSpringIndices.length > 0) {
                var idx = this._idleSpringIndices.pop();
                idx >= 0 && this._activeSprings.splice(idx, 1);
            }
        },


        loop: function loop(currentTimeMillis) {
            var listener;
            if (this._lastTimeMillis === -1) {
                this._lastTimeMillis = currentTimeMillis - 1;
            }
            var ellapsedMillis = currentTimeMillis - this._lastTimeMillis;
            this._lastTimeMillis = currentTimeMillis;

            var i = 0,
                len = this.listeners.length;
            for (i = 0; i < len; i++) {
                listener = this.listeners[i];
                listener.onBeforeIntegrate && listener.onBeforeIntegrate(this);
            }

            this.advance(currentTimeMillis, ellapsedMillis);
            if (this._activeSprings.length === 0) {
                this._isIdle = true;
                this._lastTimeMillis = -1;
            }

            for (i = 0; i < len; i++) {
                listener = this.listeners[i];
                listener.onAfterIntegrate && listener.onAfterIntegrate(this);
            }

            if (!this._isIdle) {
                this.looper.run();
            }
        },


        activateSpring: function activateSpring(springId) {
            var spring = this._springRegistry[springId];
            if (this._activeSprings.indexOf(spring) == -1) {
                this._activeSprings.push(spring);
            }
            if (this.getIsIdle()) {
                this._isIdle = false;
                this.looper.run();
            }
        },



    });


    var Spring = rebound.Spring = function Spring(springSystem) {
        this._id = 's' + Spring._ID++;
        this._springSystem = springSystem;
        this.listeners = [];
        this._currentState = new PhysicsState();
        this._previousState = new PhysicsState();
        this._tempState = new PhysicsState();
    };

    util.extend(Spring, {
        _ID: 0,

        MAX_DELTA_TIME_SEC: 0.064,

        SOLVER_TIMESTEP_SEC: 0.001

    });

    util.extend(Spring.prototype, {

        _id: 0,

        _springConfig: null,

        _overshootClampingEnabled: false,

        _currentState: null,

        _previousState: null,

        _tempState: null,

        _startValue: 0,

        _endValue: 0,

        _wasAtRest: true,

        _restSpeedThreshold: 0.001,

        _displacementFromRestThreshold: 0.001,

        listeners: null,

        _timeAccumulator: 0,

        _springSystem: null,

        // Remove a Spring from simulation and clear its listeners.
        destroy: function destroy() {
            this.listeners = [];
            this.frames = [];
            this._springSystem.deregisterSpring(this);
        },

        // Get the id of the spring, which can be used to retrieve it from
        // the SpringSystems it participates in later.
        getId: function getId() {
            return this._id;
        },

        // Set the configuration values for this Spring. A SpringConfig
        // contains the tension and friction values used to solve for the
        // equilibrium of the Spring in the physics loop.
        setSpringConfig: function setSpringConfig(springConfig) {
            this._springConfig = springConfig;
            return this;
        },

        // Retrieve the SpringConfig used by this Spring.
        getSpringConfig: function getSpringConfig() {
            return this._springConfig;
        },

        setCurrentValue: function setCurrentValue(currentValue, skipSetAtRest) {
            this._startValue = currentValue;
            this._currentState.position = currentValue;
            if (!skipSetAtRest) {
                this.setAtRest();
            }
            this.notifyPositionUpdated(false, false);
            return this;
        },

        getStartValue: function getStartValue() {
            return this._startValue;
        },

        // Retrieve the current value of the Spring.
        getCurrentValue: function getCurrentValue() {
            return this._currentState.position;
        },

        // Get the absolute distance of the Spring from it's resting endValue
        // position.
        getCurrentDisplacementDistance: function getCurrentDisplacementDistance() {
            return this.getDisplacementDistanceForState(this._currentState);
        },

        getDisplacementDistanceForState: function getDisplacementDistanceForState(state) {
            return Math.abs(this._endValue - state.position);
        },

        setEndValue: function setEndValue(endValue) {
            if (this._endValue == endValue && this.isAtRest()) {
                return this;
            }
            this._startValue = this.getCurrentValue();
            this._endValue = endValue;
            this._springSystem.activateSpring(this.getId());
            for (var i = 0, len = this.listeners.length; i < len; i++) {
                var listener = this.listeners[i];
                var onChange = listener.onSpringEndStateChange;
                onChange && onChange(this);
            }
            return this;
        },

        // Retrieve the endValue or resting position of this spring.
        getEndValue: function getEndValue() {
            return this._endValue;
        },
        setVelocity: function setVelocity(velocity) {
            if (velocity === this._currentState.velocity) {
                return this;
            }
            this._currentState.velocity = velocity;
            this._springSystem.activateSpring(this.getId());
            return this;
        },

        // Get the current velocity of the Spring.
        getVelocity: function getVelocity() {
            return this._currentState.velocity;
        },

        // Set a threshold value for the movement speed of the Spring below
        // which it will be considered to be not moving or resting.
        setRestSpeedThreshold: function setRestSpeedThreshold(restSpeedThreshold) {
            this._restSpeedThreshold = restSpeedThreshold;
            return this;
        },

        // Retrieve the rest speed threshold for this Spring.
        getRestSpeedThreshold: function getRestSpeedThreshold() {
            return this._restSpeedThreshold;
        },

        // Set a threshold value for displacement below which the Spring
        // will be considered to be not displaced i.e. at its resting
        // `endValue`.
        setRestDisplacementThreshold: function setRestDisplacementThreshold(displacementFromRestThreshold) {
            this._displacementFromRestThreshold = displacementFromRestThreshold;
        },

        // Retrieve the rest displacement threshold for this spring.
        getRestDisplacementThreshold: function getRestDisplacementThreshold() {
            return this._displacementFromRestThreshold;
        },

        setOvershootClampingEnabled: function setOvershootClampingEnabled(enabled) {
            this._overshootClampingEnabled = enabled;
            return this;
        },

        // Check if overshoot clamping is enabled for this spring.
        isOvershootClampingEnabled: function isOvershootClampingEnabled() {
            return this._overshootClampingEnabled;
        },

        // Check if the Spring has gone past its end point by comparing
        // the direction it was moving in when it started to the current
        // position and end value.
        isOvershooting: function isOvershooting() {
            var start = this._startValue;
            var end = this._endValue;
            return this._springConfig.tension > 0 && (start < end && this.getCurrentValue() > end || start > end && this.getCurrentValue() < end);
        },

        advance: function advance(time, realDeltaTime) {
            var isAtRest = this.isAtRest();

            if (isAtRest && this._wasAtRest) {
                return;
            }

            var adjustedDeltaTime = realDeltaTime;
            if (realDeltaTime > Spring.MAX_DELTA_TIME_SEC) {
                adjustedDeltaTime = Spring.MAX_DELTA_TIME_SEC;
            }

            this._timeAccumulator += adjustedDeltaTime;

            var tension = this._springConfig.tension,
                friction = this._springConfig.friction,
                position = this._currentState.position,
                velocity = this._currentState.velocity,
                tempPosition = this._tempState.position,
                tempVelocity = this._tempState.velocity,
                aVelocity,
                aAcceleration,
                bVelocity,
                bAcceleration,
                cVelocity,
                cAcceleration,
                dVelocity,
                dAcceleration,
                dxdt,
                dvdt;

            while (this._timeAccumulator >= Spring.SOLVER_TIMESTEP_SEC) {

                this._timeAccumulator -= Spring.SOLVER_TIMESTEP_SEC;

                if (this._timeAccumulator < Spring.SOLVER_TIMESTEP_SEC) {
                    this._previousState.position = position;
                    this._previousState.velocity = velocity;
                }

                aVelocity = velocity;
                aAcceleration = tension * (this._endValue - tempPosition) - friction * velocity;

                tempPosition = position + aVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                tempVelocity = velocity + aAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                bVelocity = tempVelocity;
                bAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

                tempPosition = position + bVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                tempVelocity = velocity + bAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                cVelocity = tempVelocity;
                cAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

                tempPosition = position + cVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                tempVelocity = velocity + cAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
                dVelocity = tempVelocity;
                dAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

                dxdt = 1.0 / 6.0 * (aVelocity + 2.0 * (bVelocity + cVelocity) + dVelocity);
                dvdt = 1.0 / 6.0 * (aAcceleration + 2.0 * (bAcceleration + cAcceleration) + dAcceleration);

                position += dxdt * Spring.SOLVER_TIMESTEP_SEC;
                velocity += dvdt * Spring.SOLVER_TIMESTEP_SEC;
            }

            this._tempState.position = tempPosition;
            this._tempState.velocity = tempVelocity;

            this._currentState.position = position;
            this._currentState.velocity = velocity;

            if (this._timeAccumulator > 0) {
                this._interpolate(this._timeAccumulator / Spring.SOLVER_TIMESTEP_SEC);
            }

            if (this.isAtRest() || this._overshootClampingEnabled && this.isOvershooting()) {

                if (this._springConfig.tension > 0) {
                    this._startValue = this._endValue;
                    this._currentState.position = this._endValue;
                } else {
                    this._endValue = this._currentState.position;
                    this._startValue = this._endValue;
                }
                this.setVelocity(0);
                isAtRest = true;
            }

            var notifyActivate = false;
            if (this._wasAtRest) {
                this._wasAtRest = false;
                notifyActivate = true;
            }

            var notifyAtRest = false;
            if (isAtRest) {
                this._wasAtRest = true;
                notifyAtRest = true;
            }

            this.notifyPositionUpdated(notifyActivate, notifyAtRest);
        },

        notifyPositionUpdated: function notifyPositionUpdated(notifyActivate, notifyAtRest) {
            for (var i = 0, len = this.listeners.length; i < len; i++) {
                var listener = this.listeners[i];
                if (notifyActivate && listener.onSpringActivate) {
                    listener.onSpringActivate(this);
                }

                if (listener.onSpringUpdate) {
                    listener.onSpringUpdate(this);
                }

                if (notifyAtRest && listener.onSpringAtRest) {
                    listener.onSpringAtRest(this);
                }
            }
        },

        systemShouldAdvance: function systemShouldAdvance() {
            return !this.isAtRest() || !this.wasAtRest();
        },

        wasAtRest: function wasAtRest() {
            return this._wasAtRest;
        },

        isAtRest: function isAtRest() {
            return Math.abs(this._currentState.velocity) < this._restSpeedThreshold && (this.getDisplacementDistanceForState(this._currentState) <= this._displacementFromRestThreshold || this._springConfig.tension === 0);
        },


        setAtRest: function setAtRest() {
            this._endValue = this._currentState.position;
            this._tempState.position = this._currentState.position;
            this._currentState.velocity = 0;
            return this;
        },

        _interpolate: function _interpolate(alpha) {
            this._currentState.position = this._currentState.position * alpha + this._previousState.position * (1 - alpha);
            this._currentState.velocity = this._currentState.velocity * alpha + this._previousState.velocity * (1 - alpha);
        },

        getListeners: function getListeners() {
            return this.listeners;
        },

        addListener: function addListener(newListener) {
            this.listeners.push(newListener);
            return this;
        },

        removeListener: function removeListener(listenerToRemove) {
            removeFirst(this.listeners, listenerToRemove);
            return this;
        },

        removeAllListeners: function removeAllListeners() {
            this.listeners = [];
            return this;
        },

        currentValueIsApproximately: function currentValueIsApproximately(value) {
            return Math.abs(this.getCurrentValue() - value) <= this.getRestDisplacementThreshold();
        }

    });

    var PhysicsState = function PhysicsState() { };

    util.extend(PhysicsState.prototype, {
        position: 0,
        velocity: 0
    });

    var SpringConfig = rebound.SpringConfig = function SpringConfig(tension, friction) {
        this.tension = tension;
        this.friction = friction;
    };

    var AnimationLooper = rebound.AnimationLooper = function AnimationLooper() {
        this.springSystem = null;
        var _this = this;
        var _run = function _run() {
            _this.springSystem.loop(Date.now());
        };

        this.run = function () {
            util.onFrame(_run);
        };
    };

    rebound.SimulationLooper = function SimulationLooper(timestep) {
        this.springSystem = null;
        var time = 0;
        var running = false;
        timestep = timestep || 16.667;

        this.run = function () {
            if (running) {
                return;
            }
            running = true;
            while (!this.springSystem.getIsIdle()) {
                this.springSystem.loop(time += timestep);
            }
            running = false;
        };
    };

    rebound.SteppingSimulationLooper = function (timestep) {
        this.springSystem = null;
        var time = 0;

        // this.run is NOOP'd here to allow control from the outside using
        // this.step.
        this.run = function () { };

        // Perform one step toward resolving the SpringSystem.
        this.step = function (timestep) {
            this.springSystem.loop(time += timestep);
        };
    };

    var OrigamiValueConverter = rebound.OrigamiValueConverter = {
        tensionFromOrigamiValue: function tensionFromOrigamiValue(oValue) {
            return (oValue - 30.0) * 3.62 + 194.0;
        },

        origamiValueFromTension: function origamiValueFromTension(tension) {
            return (tension - 194.0) / 3.62 + 30.0;
        },

        frictionFromOrigamiValue: function frictionFromOrigamiValue(oValue) {
            return (oValue - 8.0) * 3.0 + 25.0;
        },

        origamiFromFriction: function origamiFromFriction(friction) {
            return (friction - 25.0) / 3.0 + 8.0;
        }
    };

    var BouncyConversion = rebound.BouncyConversion = function (bounciness, speed) {
        this.bounciness = bounciness;
        this.speed = speed;
        var b = this.normalize(bounciness / 1.7, 0, 20.0);
        b = this.projectNormal(b, 0.0, 0.8);
        var s = this.normalize(speed / 1.7, 0, 20.0);
        this.bouncyTension = this.projectNormal(s, 0.5, 200);
        this.bouncyFriction = this.quadraticOutInterpolation(b, this.b3Nobounce(this.bouncyTension), 0.01);
    };

    util.extend(BouncyConversion.prototype, {

        normalize: function normalize(value, startValue, endValue) {
            return (value - startValue) / (endValue - startValue);
        },

        projectNormal: function projectNormal(n, start, end) {
            return start + n * (end - start);
        },

        linearInterpolation: function linearInterpolation(t, start, end) {
            return t * end + (1.0 - t) * start;
        },

        quadraticOutInterpolation: function quadraticOutInterpolation(t, start, end) {
            return this.linearInterpolation(2 * t - t * t, start, end);
        },

        b3Friction1: function b3Friction1(x) {
            return 0.0007 * Math.pow(x, 3) - 0.031 * Math.pow(x, 2) + 0.64 * x + 1.28;
        },

        b3Friction2: function b3Friction2(x) {
            return 0.000044 * Math.pow(x, 3) - 0.006 * Math.pow(x, 2) + 0.36 * x + 2.;
        },

        b3Friction3: function b3Friction3(x) {
            return 0.00000045 * Math.pow(x, 3) - 0.000332 * Math.pow(x, 2) + 0.1078 * x + 5.84;
        },

        b3Nobounce: function b3Nobounce(tension) {
            var friction = 0;
            if (tension <= 18) {
                friction = this.b3Friction1(tension);
            } else if (tension > 18 && tension <= 44) {
                friction = this.b3Friction2(tension);
            } else {
                friction = this.b3Friction3(tension);
            }
            return friction;
        }
    });

    util.extend(SpringConfig, {

        fromOrigamiTensionAndFriction: function fromOrigamiTensionAndFriction(tension, friction) {
            return new SpringConfig(OrigamiValueConverter.tensionFromOrigamiValue(tension), OrigamiValueConverter.frictionFromOrigamiValue(friction));
        },

        fromBouncinessAndSpeed: function fromBouncinessAndSpeed(bounciness, speed) {
            var bouncyConversion = new rebound.BouncyConversion(bounciness, speed);
            return this.fromOrigamiTensionAndFriction(bouncyConversion.bouncyTension, bouncyConversion.bouncyFriction);
        },

        // Create a SpringConfig with no tension or a coasting spring with some
        // amount of Friction so that it does not coast infininitely.
        coastingConfigWithOrigamiFriction: function coastingConfigWithOrigamiFriction(friction) {
            return new SpringConfig(0, OrigamiValueConverter.frictionFromOrigamiValue(friction));
        }
    });

    SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG = SpringConfig.fromOrigamiTensionAndFriction(40, 7);

    util.extend(SpringConfig.prototype, { friction: 0, tension: 0 });

    // Here are a couple of function to convert colors between hex codes and RGB
    // component values. These are handy when performing color
    // tweening animations.
    var colorCache = {};
    util.hexToRGB = function (color) {
        if (colorCache[color]) {
            return colorCache[color];
        }
        color = color.replace('#', '');
        if (color.length === 3) {
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        }
        var parts = color.match(/.{2}/g);

        var ret = {
            r: parseInt(parts[0], 16),
            g: parseInt(parts[1], 16),
            b: parseInt(parts[2], 16)
        };

        colorCache[color] = ret;
        return ret;
    };

    util.rgbToHex = function (r, g, b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        r = r.length < 2 ? '0' + r : r;
        g = g.length < 2 ? '0' + g : g;
        b = b.length < 2 ? '0' + b : b;
        return '#' + r + g + b;
    };

    var MathUtil = rebound.MathUtil = {

        mapValueInRange: function mapValueInRange(value, fromLow, fromHigh, toLow, toHigh) {
            var fromRangeSize = fromHigh - fromLow;
            var toRangeSize = toHigh - toLow;
            var valueScale = (value - fromLow) / fromRangeSize;
            return toLow + valueScale * toRangeSize;
        },


        interpolateColor: function interpolateColor(val, startColor, endColor, fromLow, fromHigh, asRGB) {
            fromLow = fromLow === undefined ? 0 : fromLow;
            fromHigh = fromHigh === undefined ? 1 : fromHigh;
            startColor = util.hexToRGB(startColor);
            endColor = util.hexToRGB(endColor);
            var r = Math.floor(util.mapValueInRange(val, fromLow, fromHigh, startColor.r, endColor.r));
            var g = Math.floor(util.mapValueInRange(val, fromLow, fromHigh, startColor.g, endColor.g));
            var b = Math.floor(util.mapValueInRange(val, fromLow, fromHigh, startColor.b, endColor.b));
            if (asRGB) {
                return 'rgb(' + r + ',' + g + ',' + b + ')';
            } else {
                return util.rgbToHex(r, g, b);
            }
        },

        degreesToRadians: function degreesToRadians(deg) {
            return deg * Math.PI / 180;
        },

        radiansToDegrees: function radiansToDegrees(rad) {
            return rad * 180 / Math.PI;
        }

    };

    util.extend(util, MathUtil);


    function removeFirst(array, item) {
        var idx = array.indexOf(item);
        idx != -1 && array.splice(idx, 1);
    }

    var _onFrame;
    if (typeof window !== 'undefined') {
        _onFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }
    if (!_onFrame && typeof process !== 'undefined' && process.title === 'node') {
        _onFrame = setImmediate;
    }

    // Cross browser/node timer functions.
    util.onFrame = function onFrame(func) {
        return _onFrame(func);
    };

    // Export the public api using exports for common js or the window for
    // normal browser inclusion.
    if (typeof exports != 'undefined') {
        util.extend(exports, rebound);
    } else if (typeof window != 'undefined') {
        window.rebound = rebound;
    }
})();


'use strict';



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polygon = function () {
    function Polygon() {
        var radius = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
        var sides = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];
        var depth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var colors = arguments[3];

        _classCallCheck(this, Polygon);

        this._radius = radius;
        this._sides = sides;
        this._depth = depth;
        this._colors = colors;

        this._x = 0;
        this._y = 0;

        this.rotation = 0;
        this.scale = 1;

        // Get basePolygon points straight away.
        this.points = this._getRegularPolygonPoints();
    }

    /**
     * Get the points of any regular polygon based on
     * the number of sides and radius.
     */


    _createClass(Polygon, [{
        key: '_getRegularPolygonPoints',
        value: function _getRegularPolygonPoints() {

            var points = [];

            var i = 0;

            while (i < this._sides) {
                // Note that sin and cos are inverted in order to draw
                // polygon pointing down like: ∇
                var x = -this._radius * Math.sin(i * 2 * Math.PI / this._sides);
                var y = this._radius * Math.cos(i * 2 * Math.PI / this._sides);

                points.push({ x: x, y: y });

                i++;
            }

            return points;
        }

        /**
         * Get the inscribed polygon points by calling `getInterpolatedPoint`
         * for the points (start, end) of each side.
         */

    }, {
        key: '_getInscribedPoints',
        value: function _getInscribedPoints(points, progress) {
            var _this = this;

            var inscribedPoints = [];

            points.forEach(function (item, i) {

                var start = item;
                var end = points[i + 1];

                if (!end) {
                    end = points[0];
                }

                var point = _this._getInterpolatedPoint(start, end, progress);

                inscribedPoints.push(point);
            });

            return inscribedPoints;
        }


    }, {
        key: '_getInterpolatedPoint',
        value: function _getInterpolatedPoint(start, end, progress) {

            var Ax = start.x;
            var Ay = start.y;

            var Bx = end.x;
            var By = end.y;

            var Cx = Ax + (Bx - Ax) * progress;
            var Cy = Ay + (By - Ay) * progress;

            return {
                x: Cx,
                y: Cy
            };
        }


    }, {
        key: '_getUpdatedChildren',
        value: function _getUpdatedChildren(progress) {

            var children = [];

            for (var i = 0; i < this._depth; i++) {

                // Get basePolygon points on first lap
                // then get previous child points.
                var points = children[i - 1] || this.points;

                var inscribedPoints = this._getInscribedPoints(points, progress);

                children.push(inscribedPoints);
            }

            return children;
        }


    }, {
        key: 'renderChildren',
        value: function renderChildren(context, progress) {
            var _this2 = this;

            var children = this._getUpdatedChildren(progress);

            // child = array of points at a certain progress over the parent sides.
            children.forEach(function (points, i) {

                // Draw child.
                context.beginPath();
                points.forEach(function (point) {
                    return context.lineTo(point.x, point.y);
                });
                context.closePath();

                // Set colors.
                var strokeColor = _this2._colors.stroke;
                var childColor = _this2._colors.child;

                if (strokeColor) {
                    context.strokeStyle = strokeColor;
                    context.stroke();
                }

                if (childColor) {
                    var rgb = rebound.util.hexToRGB(childColor);

                    var alphaUnit = 1 / children.length;
                    var alpha = alphaUnit + alphaUnit * i;

                    var rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + alpha + ')';

                    context.fillStyle = rgba;

                    // Set Shadow.
                    context.shadowColor = 'rgba(0,0,0, 0.1)';
                    context.shadowBlur = 10;
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;

                    context.fill();
                }
            });
        }

        /**
         * Render.
         */

    }, {
        key: 'render',
        value: function render(context) {

            context.save();

            context.translate(this._x, this._y);

            if (this.rotation !== 0) {
                context.rotate(rebound.MathUtil.degreesToRadians(this.rotation));
            }

            if (this.scale !== 1) {
                context.scale(this.scale, this.scale);
            }

            // Draw basePolygon.
            context.beginPath();
            this.points.forEach(function (point) {
                return context.lineTo(point.x, point.y);
            });
            context.closePath();

            // Set colors.
            var strokeColor = this._colors.stroke;
            var childColor = this._colors.base;

            if (strokeColor) {
                context.strokeStyle = strokeColor;
                context.stroke();
            }

            if (childColor) {
                context.fillStyle = childColor;
                context.fill();
            }

            context.restore();
        }
    }]);

    return Polygon;
}();
'use strict';

/**
 * Spinner.
 * Create a canvas element, append it to the body, render polygon with
 * inscribed children, provide init and complete methods to control spinner.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spinner = function () {
    function Spinner(params) {
        _classCallCheck(this, Spinner);

        var id = params.id,
            radius = params.radius,
            sides = params.sides,
            depth = params.depth,
            colors = params.colors,
            alwaysForward = params.alwaysForward,
            restAt = params.restAt,
            renderBase = params.renderBase;

        if (sides < 3) {
            console.warn('At least 3 sides required.');
            sides = 3;
        }

        this._canvas = document.createElement('canvas');
        this._canvas.style.backgroundColor = colors.background;

        this._canvasW = null;
        this._canvasH = null;
        this._canvasOpacity = 1;

        this._centerX = null;
        this._centerY = null;

        this._alwaysForward = alwaysForward;
        this._restThreshold = restAt;
        this._renderBase = renderBase;

        this._springRangeLow = 0;
        this._springRangeHigh = this._restThreshold || 1;

        // Instantiate basePolygon.
        this._basePolygon = new Polygon(radius, sides, depth, colors);

        this._progress = 0;

        this._isAutoSpin = null;
        this._isCompleting = null;
    }

    /**
     * Init spinner.
     */


    _createClass(Spinner, [{
        key: 'init',
        value: function init(spring, autoSpin) {

            this._addCanvas();

            this._spring = spring;
            this._addSpringListener();

            this._isAutoSpin = autoSpin;

            if (autoSpin) {
                // Start auto spin.
                this._spin();
            } else {
                // Render first frame only.
                this._spring.setEndValue(0);
                this.render();
            }
        }
    }, {
        key: '_addCanvas',
        value: function _addCanvas() {
            document.body.appendChild(this._canvas);
            this._context = this._canvas.getContext('2d');
            this._setCanvasSize();
        }
    }, {
        key: '_setCanvasSize',
        value: function _setCanvasSize() {
            this._canvasW = this._canvas.width = window.innerWidth;
            this._canvasH = this._canvas.height = window.innerHeight;

            this._canvas.style.position = 'fixed';
            this._canvas.style.top = 0;
            this._canvas.style.left = 0;

            this._centerX = this._canvasW / 2;
            this._centerY = this._canvasH / 2;
        }
    }, {
        key: '_addSpringListener',
        value: function _addSpringListener() {

            var ctx = this;


            this._spring.addListener({
                onSpringUpdate: function onSpringUpdate(spring) {

                    var val = spring.getCurrentValue();

                    // Input range in the `from` parameters.
                    var fromLow = 0,
                        fromHigh = 1,

                        // Property animation range in the `to` parameters.
                        toLow = ctx._springRangeLow,
                        toHigh = ctx._springRangeHigh;

                    val = rebound.MathUtil.mapValueInRange(val, fromLow, fromHigh, toLow, toHigh);

                    // Note that the render method is
                    // called with the spring motion value.
                    ctx.render(val);
                }
            });
        }

        /**
         * Start complete animation.
         */

    }, {
        key: 'setComplete',
        value: function setComplete() {
            this._isCompleting = true;
        }
    }, {
        key: '_completeAnimation',
        value: function _completeAnimation() {

            // Fade out the canvas.
            this._canvasOpacity -= 0.1;
            this._canvas.style.opacity = this._canvasOpacity;

            // Stop animation and remove canvas.
            if (this._canvasOpacity <= 0) {
                this._isAutoSpin = false;
                this._spring.setAtRest();
                this._canvas.remove();
            }
        }

        /**
         * Spin animation.
         */

    }, {
        key: '_spin',
        value: function _spin() {

            if (this._alwaysForward) {

                var currentValue = this._spring.getCurrentValue();

                // Switch the animation range used to compute the value
                // in the `onSpringUpdate`, so to change the reverse animation
                // of the spring at a certain threshold.
                if (this._restThreshold && currentValue === 1) {
                    this._switchSpringRange();
                }

                // In order to keep the motion going forward
                // when spring reach 1 reset to 0 at rest.
                if (currentValue === 1) {
                    this._spring.setCurrentValue(0).setAtRest();
                }
            }

            // Restart the spinner.
            this._spring.setEndValue(this._spring.getCurrentValue() === 1 ? 0 : 1);
        }
    }, {
        key: '_switchSpringRange',
        value: function _switchSpringRange() {

            var threshold = this._restThreshold;

            this._springRangeLow = this._springRangeLow === threshold ? 0 : threshold;
            this._springRangeHigh = this._springRangeHigh === threshold ? 1 : threshold;
        }

        /**
         * Render.
         */

    }, {
        key: 'render',
        value: function render(progress) {

            // Update progess if present and round to 4th decimal.
            if (progress) {
                this._progress = Math.round(progress * 10000) / 10000;
            }

            // Restart the spin.
            if (this._isAutoSpin && this._spring.isAtRest()) {
                this._spin();
            }

            // Complete the animation.
            if (this._isCompleting) {
                this._completeAnimation();
            }

            // Clear canvas and save context.
            this._context.clearRect(0, 0, this._canvasW, this._canvasH);
            this._context.save();

            // Move to center.
            this._context.translate(this._centerX, this._centerY);

            this._context.lineWidth = 1.5;

            // Render basePolygon.
            if (this._renderBase) {
                this._basePolygon.render(this._context);
            }

            // Render inscribed polygons.
            this._basePolygon.renderChildren(this._context, this._progress);

            this._context.restore();
        }
    }]);

    return Spinner;
}();
'use strict';

// Custom SETTINGS for each demo in related index.html

var settings = SETTINGS || {
    rebound: {
        tension: 2,
        friction: 5
    },
    spinner: {
        radius: 80,
        sides: 3,
        depth: 4,
        colors: {
            background: '#000000',
            stroke: '#000000',
            base: '#222222',
            child: '#FFFFFF'
        },
        alwaysForward: true, // When false the spring will reverse normally.
        restAt: 0.5, // A number from 0.1 to 0.9 || null for full rotation
        renderBase: true // Optionally render basePolygon
    }
};

var demo = {
    settings: settings,

    spring: null,
    spinner: null,


    initRebound: function initRebound() {

        var settings = demo.settings.rebound;

        // Create a SpringSystem.
        var springSystem = new rebound.SpringSystem();

        // Add a spring to the system.
        demo.spring = springSystem.createSpring(settings.tension, settings.friction);
    },


    /**
     * Initialize Spinner with settings.
     */
    initSpinner: function initSpinner() {

        var settings = demo.settings.spinner;

        // Instantiate Spinner.
        demo.spinner = new Spinner(settings);
    },



    init: function init() {

        var spinnerTypeAutoSpin = true;

        // Instantiate animation engine and spinner system.
        demo.initRebound();
        demo.initSpinner();

        // Init animation with Rebound Spring System.
        demo.spinner.init(demo.spring, spinnerTypeAutoSpin);

    },



    loadSomething: function loadSomething() {

        var oReq = new XMLHttpRequest();

        oReq.addEventListener('progress', function (oEvent) {
            if (oEvent.lengthComputable) {

                var percent = Math.ceil(oEvent.loaded / oEvent.total * 100);
                console.log('ajax loding percent', percent);

                demo.spring.setEndValue(percent * 0.01);
            }
        });

    }
};