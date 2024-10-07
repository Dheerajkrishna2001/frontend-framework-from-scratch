import { mountDOM } from "./mount-dom.js";
import { destroyDOM } from "./destroy-dom.js";
import { Dispatcher } from "./dispatcher.js";

<<<<<<< HEAD
export function createApp({state,view, reducers ={}}) {
    parentEl = null;
    vdom = null;
   
    function renderApp(){
        destroyDOM();
        vdom = view(state);
        mountDOM(vdom, parentEl);
||||||| cc25477
function createApp({state,view, reducers ={}}) {
    parentEl = null;
    vdom = null;
   
    function renderApp(){
        destroyDOM();
        vdom = view(state);
        mountDOM(vdom, parentEl);
=======
export function createApp({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;

  function renderApp() {
    if (vdom) {
      destroyDOM(vdom);
>>>>>>> a91e591079310bd9b7af72a53f673968d192321a
    }
    vdom = view(state);
    mountDOM(vdom, parentEl);
  }

  function emit(eventName, payload) {
    dispatcher.emit(eventName, payload);
  }

  const dispatcher = new Dispatcher();

  const subscriptions = [dispatcher.afterCommand(renderApp)];

  for (const actionName in reducers) {
    const reducer = reducers[actionName];
    subscriptions.push(
      dispatcher.subscribe(actionName, (payload) => {
        state = reducer(state, payload);
      })
    );
  }

<<<<<<< HEAD
   return {
    mount(parentEl){
        app.parentEl = parentEl;
        renderApp();
    },
    unmount(){
        destroyDOM(vdom);
        subscriptions.forEach(unsubscribe => unsubscribe());
    }
   }
   
||||||| cc25477
   return {
    mount(parentEl){
        app.parentEl = parentEl;
        renderApp();
    }
   }
   
=======
  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      renderApp();

      return this;
    },
    unmount() {
      destroyDOM(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    },
  };
>>>>>>> a91e591079310bd9b7af72a53f673968d192321a
}
