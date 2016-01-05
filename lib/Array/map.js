map = function Array$map (callback, context) {

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