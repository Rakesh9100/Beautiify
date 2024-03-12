'use strict'

var a, b, c;
var outputText, outputValue;
(function () {
    'use strict';
    window.addEventListener('load', function () {
        var canvas = document.getElementById('canvas');

        if (!canvas || !canvas.getContext) {
            return false;
        }

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        var ctx = canvas.getContext('2d');
        var X = canvas.width = window.innerWidth;
        var Y = canvas.height = window.innerHeight;
        var mouseX = null;
        var mouseY = null;
        var dist = 80;
        var lessThan = Math.sqrt(dist * dist + dist * dist);
        var mouseDist = 150;
        var shapeNum;
        var shapes = [];
        var ease = 0.3;
        var friction = 0.9;
        var lineWidth = 5;
        X > Y ? shapeNum = X / dist : shapeNum = Y / dist;

        if (X < 768) {
            lineWidth = 2;
            dist = 40;
            lessThan = Math.sqrt(dist * dist + dist * dist);
            mouseDist = 50;
            X > Y ? shapeNum = X / dist : shapeNum = Y / dist;
        }

        /********************
          Animation
        ********************/

        window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (cb) {
                setTimeout(cb, 17);
            };

        /********************
          Shape
        ********************/

        function Shape(ctx, x, y, i) {
            this.ctx = ctx;
            this.init(x, y, i);
        }

        Shape.prototype.init = function (x, y, i) {
            this.x = x;
            this.y = y;
            this.xi = x;
            this.yi = y;
            this.i = i;
            this.r = 1;
            this.v = {
                x: 0,
                y: 0
            };
            this.c = rand(0, 360);
        };

        Shape.prototype.draw = function () {
            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = 'hsl(' + this.c + ', ' + '80%, 60%)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
        };

        Shape.prototype.mouseDist = function () {
            var x = mouseX - this.x;
            var y = mouseY - this.y;
            var d = x * x + y * y;
            var dist = Math.sqrt(d);
            if (dist < mouseDist) {
                this.v.x = +this.v.x;
                this.v.y = +this.v.y;
                var colAngle = Math.atan2(mouseY - this.y, mouseX - this.x);
                this.v.x = -Math.cos(colAngle) * 5;
                this.v.y = -Math.sin(colAngle) * 5;
                this.x += this.v.x;
                this.y += this.v.y;
            } else if (dist > mouseDist && dist < mouseDist + 10) {
                this.v.x = 0;
                this.v.y = 0;
            } else {
                this.v.x += (this.xi - this.x) * ease;
                this.v.y += (this.yi - this.y) * ease;
                this.v.x *= friction;
                this.v.y *= friction;
                this.x += this.v.x;
                this.y += this.v.y;
            }
        };

        Shape.prototype.drawLine = function (i) {
            var j = i;
            for (var i = 0; i < shapes.length; i++) {
                if (j !== i) {
                    var x = this.x - shapes[i].x;
                    var y = this.y - shapes[i].y;
                    var d = x * x + y * y;
                    var dist = Math.floor(Math.sqrt(d));
                    if (dist <= lessThan) {
                        ctx.save();
                        ctx.lineWidth = lineWidth;
                        ctx.strokeStyle = 'hsl(' + this.c + ', ' + '80%, 60%)';
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(shapes[i].x, shapes[i].y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        };

        Shape.prototype.render = function (i) {
            this.drawLine(i);
            if (mouseX !== null) this.mouseDist();
            this.draw();
        };

        for (var i = 0; i < shapeNum + 1; i++) {
            for (var j = 0; j < shapeNum + 1; j++) {
                if (j * dist - dist > Y) break;
                var s = new Shape(ctx, i * dist, j * dist, i, j);
                shapes.push(s);
            }
        }

        /********************
          Render
        ********************/

        function render() {
            ctx.clearRect(0, 0, X, Y);
            for (var i = 0; i < shapes.length; i++) {
                shapes[i].render(i);
            }
            requestAnimationFrame(render);
        }

        render();

        /********************
          Event
        ********************/

        function onResize() {
            X = canvas.width = window.innerWidth;
            Y = canvas.height = window.innerHeight;
            shapes = [];
            if (X < 768) {
                lineWidth = 2;
                dist = 40;
                lessThan = Math.sqrt(dist * dist + dist * dist);
                mouseDist = 50;
                X > Y ? shapeNum = X / dist : shapeNum = Y / dist;
            } else {
                lineWidth = 5;
                dist = 80;
                lessThan = Math.sqrt(dist * dist + dist * dist);
                mouseDist = 150;
                X > Y ? shapeNum = X / dist : shapeNum = Y / dist;
            }
            for (var i = 0; i < shapeNum + 1; i++) {
                for (var j = 0; j < shapeNum + 1; j++) {
                    if (j * dist - dist > Y) break;
                    var s = new Shape(ctx, i * dist, j * dist, i, j);
                    shapes.push(s);
                }
            }
        }

        window.addEventListener('resize', function () {
            onResize();
        });

        window.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, false);

        canvas.addEventListener('touchmove', function (e) {
            var touch = e.targetTouches[0];
            mouseX = touch.pageX;
            mouseY = touch.pageY;
        });

    });
})();
function validate() {

    // get the input
    a = document.forms["input_form"]["aterm"].value;
    b = document.forms["input_form"]["bterm"].value;
    c = document.forms["input_form"]["cterm"].value;


    // validate a, b and c
    if (a == 0) {
        outputText = "<em>a</em> cannot equal zero!";
    } else if (isNaN(a)) {
        outputText = "<em>a</em> must be a number!";
    } else if (isNaN(b)) {
        outputText = "<em>b</em> must be a number!";
    } else if (isNaN(c)) {
        outputText = "<em>c</em> must be a number!";
    } else {
        // calculate the result using x = (-b +- sqrt(b^2 - 4ac)) / 2a
        var d = Math.sqrt(Math.pow(b, 2) - 4 * a * c)

        if (d >= 0) {
            var x1 = (-b - d) / (2 * a);
            var x2 = (-b + d) / (2 * a);
            outputText = "For the equation <strong>" + (a == 1 ? "" : a) + "x\u00B2 + " + (b == 1 ? "" : b) + "x + " + c + " = 0</strong>,";
            outputValue = "x = <strong>" + x1 + "</strong> or <strong>" + x2 + "</strong>";
        }
        else {
            outputText = "For the equation <strong>" + (a == 1 ? "" : a) + "x\u00B2 + " + (b == 1 ? "" : b) + "x + " + c + " = 0,";
            outputValue = "No real roots as D<0";
        }
    }

    // output the result (or errors)
    document.getElementById("output_text").innerHTML = outputText;
    document.getElementById("outputValue").innerHTML = outputValue;
}