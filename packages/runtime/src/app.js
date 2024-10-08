import { mountDOM } from "./mount-dom.js";
import { destroyDOM } from "./destroy-dom.js";
import { Dispatcher } from "./dispatcher.js";

export function createApp({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;

  function renderApp() {
    if (vdom) {
      destroyDOM(vdom);
    }
    vdom = view(state,emit);
    mountDOM(vdom, parentEl);
  }

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
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
}
