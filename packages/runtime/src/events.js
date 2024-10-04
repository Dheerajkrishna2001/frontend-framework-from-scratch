function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler);
  return handler;
}

function addEventListeners(listeners = {}, el) {
  let addListeners = {};
  Object.entries(listeners).forEach((EventName, handler) => {
    const addListener = addEventListener(EventName, handler, el);
    addListeners[EventName] = addListener;
  });
  return addListeners;
}

function removeEventListeners(listeners = {}, el) {
  Object.entries(listeners).forEach((EventName, handler) => {
    el.removeEventListener(EventName, handler);
  });
}

export default {
  addEventListener,
  addEventListeners,
  removeEventListeners,
};
