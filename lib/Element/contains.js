Element.prototype.contains =
(window.HTMLDocument ? HTMLDocument.prototype : document).contains = function (node) {
    while (element = element.parentNode) {
        if (element == this) {
            return true;
        }
    }
    return false;
};