(function () {

    function SVGMenu(el, options) {
        this.el = el;
        this.init();
    }

    SVGMenu.prototype.init = function () {
        this.trigger = this.el.querySelector('button.menu__handle');
        this.shapeEl = this.el.querySelector('div.morph-shape');

        var s = Snap(this.shapeEl.querySelector('svg'));
        this.pathEl = s.select('path');
        this.paths = {
            reset: this.pathEl.attr('d'),
            open: this.shapeEl.getAttribute('data-morph-open'),
            close: this.shapeEl.getAttribute('data-morph-close')
        };

        this.isOpen = false;

        this.initEvents();
    };

    SVGMenu.prototype.initEvents = function () {
        this.trigger.addEventListener('click', this.toggle.bind(this));
    };

    SVGMenu.prototype.toggle = function () {
        var self = this;

        if (this.isOpen) {
            classie.remove(self.el, 'menu--anim');
            setTimeout(function () { classie.remove(self.el, 'menu--open'); }, 250);
        }
        else {
            classie.add(self.el, 'menu--anim');
            setTimeout(function () { classie.add(self.el, 'menu--open'); }, 250);
        }
        this.pathEl.stop().animate({ 'path': this.isOpen ? this.paths.close : this.paths.open }, 350, mina.easeout, function () {
            self.pathEl.stop().animate({ 'path': self.paths.reset }, 800, mina.elastic);
        });

        this.isOpen = !this.isOpen;
    };

    new SVGMenu(document.getElementById('menu'));

})();

(function (window) {

    'use strict';

    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);