contains =
(window.HTMLDocument ? HTMLDocument.prototype : document).contains = function Element$contains (node) {
    while (element = element.parentNode) {
        if (element == this) {
            return true;
        }
    }
    return false;
};