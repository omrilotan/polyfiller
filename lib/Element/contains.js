contains =
(window.HTMLDocument ? HTMLDocument.prototype : document).contains = function Element$contains (node) {
    while (node = node.parentNode) {
        if (node == this) {
            return true;
        }
    }
    return false;
};