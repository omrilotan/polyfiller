removeEventListener = 
(window.HTMLDocument ? HTMLDocument.prototype : document).removeEventListener = 
Window.prototype.removeEventListener = function Element$removeEventListener (type, method /* useCapture */) {
    if (typeof this.detachEvent === "function") {
        this.detachEvent("on" + type, method);
    } else {
        this["on" + type] = null;
    }
};