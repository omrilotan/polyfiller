bind = function Function$bind (that) {
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