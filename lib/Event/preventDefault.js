preventDefault = function Event$preventDefault () {
    event = this !== null && this !== window ? this : window.event;
    event.returnValue = false;
};