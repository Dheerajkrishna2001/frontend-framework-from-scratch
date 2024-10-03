function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler);
  return handler;
}

export function addEventListeners(listeners = {}, el) {
  let addListeners = {};
  Object.entries(listeners).forEach((EventName, handler) => {
    const addListener = addEventListener(EventName, handler, el);
    addListeners[EventName] = addListener;
  });
  return addListeners;
}
