// polyfiller.
// https://github.com/omrilotan/polyfiller
// Build Date: 2016-10-07

if (typeof String.prototype.trim !== "function") {
    String.prototype.trim = function String$trim () {
        return this.replace(/^\s+|\s+$/g, "");
    };
}

if (typeof String.prototype.repeat !== "function") {
    String.prototype.repeat = function String$repeat (count) {
        if (count < 0) {
          throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
          throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        var string = '' + this;
    
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (string.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
    
        if (string.length == 0 || count == 0) {
          return '';
        }
    
        while (count--) {
            string += string;
        }
        return string;
    };
}

if (typeof Array.prototype.filter !== "function") {
    Array.prototype.filter = function Array$filter (fn) {
        var index = data[member].length;
        while (index--) {
            if (!fn(this[index])) {
                this.splice(index, index + 1);
            }
        }
        return this;
    };
}

if (typeof Array.prototype.find !== "function") {
    Array.prototype.find = function Array$find (fn) {
        if (typeof fn !== "function") {
            throw new TypeError("predicate must be a function");
        }
    
        var i = this.length;
    
        // Iterate from the end in case the array gets mutated in the process
        while (i--) {
            if (fn.call(this[i], this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };
}

if (typeof Array.prototype.findIndex !== "function") {
    Array.prototype.findIndex = function Array$findIndex (fn) {
        if (typeof fn !== "function") {
            throw new TypeError("predicate must be a function");
        }
    
        var i = this.length;
    
        // Iterate from the end in case the array gets mutated in the process
        while (i--) {
            if (fn.call(this[i], this[i], i, this)) {
                return i;
            }
        }
        return -1;
    };
}

if (typeof Array.prototype.forEach !== "function") {
    Array.prototype.forEach = function Array$forEach (fn, scope) {
        var i = 0,
            len = this.length;
        for (; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}

if (typeof Array.prototype.indexOf !== "function") {
    Array.prototype.indexOf = function Array$indexOf (what, i) {
        i = i || 0;
        var len = this.length;
        while (i < len) {
            if (this[i] === what) {
                return i;
            }
            ++i;
        }
        return -1;
    };
}

if (typeof Array.prototype.map !== "function") {
    Array.prototype.map = function Array$map (callback, context) {
    
        if (typeof callback !== "function") {
          throw new TypeError(callback + " is not a function");
        }
    
        var i = 0,
            len = this.length,
            result = new Array(len);
    
        for (; i < len; i++) {
            result[i] = callback.call(context, this[i], i, this);
        }
    
        return result;
    };
}

if (typeof Array.prototype.reduce !== "function") {
    Array.prototype.reduce = function Array$reduce (callback, context) {
        if (this === null || this === undefined) {
            throw new TypeError("Array.prototype.reduce called on null or undefined");
        }
        if (typeof callback !=="function") {
            throw new TypeError(callback + " is not a function");
        }
        var i = 0,
            len = this.length,
            value,
            isValueSet = false;
        if (arguments.length > 1) {
            value = context;
            isValueSet = true;
        }
        for (; len > i; ++i) {
            if (this.hasOwnProperty(i)) {
                if (isValueSet) {
                    value = callback(value, this[i], i, this);
                } else {
                    value = this[i];
                    isValueSet = true;
                }
            }
        }
        if (!isValueSet) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        return value;
    };
}

if (typeof Array.prototype.some !== "function") {
    Array.prototype.some = function Array$some (fn/*, arg*/) {
        if (typeof fn !== "function") {
            throw new TypeError("predicate must be a function");
        }
        var arg = arguments.length >= 2 ? arguments[1] : null,
            i = this.length;
    
        while (i--) {
            if (fn.call(arg, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}

if (typeof Object.prototype.hasOwnProperty !== "function") {
    Object.prototype.hasOwnProperty = function Object$hasOwnProperty (property) {
        var _prototype = this.__proto__ || this.constructor.prototype;
        return (property in this) && (!(property in _prototype) ||
                _prototype[property] !== this[property]);
    };
}

if (typeof Function.prototype.bind !== "function") {
    Function.prototype.bind = function Function$bind (that) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var args = Array.prototype.slice.call(arguments, 1), 
            original = this, 
            Dummy = function _Dummy () {},
            bound = function _bound () {
                return original.apply(this instanceof Dummy && that ?
                        this : that,
                        args.concat(Array.prototype.slice.call(arguments)));
            };
        Dummy.prototype = this.prototype;
        bound.prototype = new dummy();
        return bound;
    };
}

if (typeof Element.prototype.addEventListener !== "function") {
    Element.prototype.addEventListener = 
    (window.HTMLDocument ? HTMLDocument.prototype : document).addEventListener = 
    Window.prototype.addEventListener = function Element$addEventListener (type, method /* useCapture */) {
        if (typeof this.attachEvent === "function") {
            this.attachEvent("on" + type, method);
        } else {
            this["on" + type] = method;
        }
    };
}

if (typeof Element.prototype.contains !== "function") {
    Element.prototype.contains =
    (window.HTMLDocument ? HTMLDocument.prototype : document).contains = function Element$contains (node) {
        while (node = node.parentNode) {
            if (node == this) {
                return true;
            }
        }
        return false;
    };
}

if (typeof Element.prototype.matches !== "function") {
    Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector || function Element$matches (query) {
                var collection = document.querySelectorAll(query);
                return [].indexOf.call(collection, this) !== -1;
            };
}

if (typeof Element.prototype.removeEventListener !== "function") {
    Element.prototype.removeEventListener = 
    (window.HTMLDocument ? HTMLDocument.prototype : document).removeEventListener = 
    Window.prototype.removeEventListener = function Element$removeEventListener (type, method /* useCapture */) {
        if (typeof this.detachEvent === "function") {
            this.detachEvent("on" + type, method);
        } else {
            this["on" + type] = null;
        }
    };
}

if (typeof Event.prototype.preventDefault !== "function") {
    Event.prototype.preventDefault = function Event$preventDefault () {
        var event = this !== null && this !== window ? this : window.event;
        event.returnValue = false;
    };
}

if (typeof Event.prototype.stopPropagation !== "function") {
    Event.prototype.stopPropagation = function Event$stopPropagation () {
        var event = this !== null && this !== window ? this : window.event;
        event.cancelBubble = true;
    };
}