preventDefault = function Event$preventDefault () {
    var event = this !== null && this !== window ? this : window.event;
    event.returnValue = false;
};