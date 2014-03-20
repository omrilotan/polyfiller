Element.prototype.addEventListener = 
(window.HTMLDocument ? HTMLDocument.prototype : document).addEventListener = 
Window.prototype.addEventListener = function (type, method /* useCapture */) {
    if (typeof this.attachEvent === "function") {
        this.attachEvent("on" + type, method);
    } else {
        this["on" + type] = method;
    }
};