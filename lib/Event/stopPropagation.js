stopPropagation = function Event$stopPropagation () {
    var event = this !== null && this !== window ? this : window.event;
    event.cancelBubble = true;
};