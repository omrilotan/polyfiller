Element.prototype.contains =
    HTMLDocument.prototype.contains =
        function (node) {
    while (element = element.parentNode) {
        if (element == this) {
            return true;
        }
    }
    return false;
};