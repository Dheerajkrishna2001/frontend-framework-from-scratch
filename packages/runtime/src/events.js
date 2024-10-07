export function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler);
  return handler;
}

<<<<<<< HEAD
export function addEventListeners(listeners = {}, el) {
||||||| cc25477
function addEventListeners(listeners = {}, el) {
=======
export function addEventListeners(listeners = {}, el) {
  console.log(listeners, "listeners");
>>>>>>> a91e591079310bd9b7af72a53f673968d192321a
  let addListeners = {};
  Object.entries(listeners).forEach((EventName, handler) => {
    const addListener = addEventListener(EventName, handler, el);
    addListeners[EventName] = addListener;
  });
  return addListeners;
}

export function removeEventListeners(listeners = {}, el) {
  Object.entries(listeners).forEach((EventName, handler) => {
    el.removeEventListener(EventName, handler);
  });
}
<<<<<<< HEAD


||||||| cc25477

export default {
  addEventListener,
  addEventListeners,
  removeEventListeners,
};
=======
>>>>>>> a91e591079310bd9b7af72a53f673968d192321a
