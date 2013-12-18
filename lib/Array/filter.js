Array.prototype.filter = function filter (fn) {
    var newArray = [];
    this.forEach(function filterTest (item) {
        if (!!fn.call(item, item)) {
            newArray.push(item);
        }
    });
    return newArray;
};