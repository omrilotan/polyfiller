Event.prototype.preventDefault = function () {
    event = this !== null && this !== window ? this : window.event;
    event.returnValue = false;
};