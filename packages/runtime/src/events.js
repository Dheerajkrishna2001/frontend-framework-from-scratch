export function addEventListener(eventName, handler, el) {
  console.log(eventName, handler, el, "eventName, handler, el");
  el.addEventListener(eventName, handler);
  return handler;
}

export function addEventListeners(listeners = {}, el) {
  console.log(listeners, "listeners");
  let addListeners = {};
  Object.entries(listeners).forEach(([EventName, handler]) => {
    const addListener = addEventListener(EventName, handler, el);
    addListeners[EventName] = addListener;
  });
  return addListeners;
}

export function removeEventListeners(listeners = {}, el) {
  Object.entries(listeners).forEach(([EventName, handler]) => {
    el.removeEventListener(EventName, handler);
  });
}
