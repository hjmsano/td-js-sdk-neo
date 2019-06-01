'use strict';

exports.setupRecurringEvent = setupRecurringEvent;
exports.addListener = addListener;
exports.removeListener = removeListener;

let managedEvents = {};
let handlerKey = 0;

function setupRecurringEvent(eventName){
    let event;
    let timer;

    try {
        event = new CustomEvent(eventName);
    } catch (e) {
        event = window.parent.document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, false, false, {});
    }

    window.parent.requestAnimationFrame = window.parent.requestAnimationFrame
        || window.parent.mozRequestAnimationFrame
        || window.parent.webkitRequestAnimationFrame;

    (function recurringEvent() {
        window.parent.requestAnimationFrame(recurringEvent);
        if (timer) {
            return false;
        }
        timer = setTimeout( () => {
            window.parent.dispatchEvent(event);
            timer = null;
        }, 250);
    })();
}

function addListener(element, type, listener, capture){
    element.addEventListener(type, listener, capture);
    managedEvents[handlerKey] = {
        element: element,
        type: type,
        listener: listener,
        capture: capture
    };
    return handlerKey++;
}

function removeListener(handlerKey){
    if (handlerKey in managedEvents) {
        let e = managedEvents[handlerKey];
        e.element.removeEventListener(e.type, e.listener, e.capture);
    }
}