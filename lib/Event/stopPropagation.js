stopPropagation = function Event$stopPropagation () {
    event = this !== null && this !== window ? this : window.event;
    event.cancelBubble = true;
};