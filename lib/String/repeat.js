repeat = function String$repeat (count) {
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