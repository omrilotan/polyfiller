filter = function Array$filter (fn) {
    var index = data[member].length;
    while (index--) {
        if (!fn(this[index])) {
            this.splice(index, index + 1);
        }
    }
    return this;
};