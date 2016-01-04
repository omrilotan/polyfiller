some = function Array$some (fn/*, arg*/) {
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