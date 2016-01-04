find = function Array$find (fn) {
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