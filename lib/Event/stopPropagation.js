Event.prototype.stopPropagation = function () {
    event = this !== null && this !== window ? this : window.event;
    event.cancelBubble = true;
};