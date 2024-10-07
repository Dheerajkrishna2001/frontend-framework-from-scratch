function withOutNulls(arr) {
  return arr.filter((item) => item != null);
}

const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};
function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withOutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}
function hString(text) {
  return {
    type: DOM_TYPES.TEXT,
    value: text,
  };
}
function hFragment(children) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withOutNulls(children)),
  };
}
function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" ? hString(child) : child
  );
}

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

function setAttributes(el, attrs) {
  const { class: className, style: style, ...otherAttrs } = attrs;
  if (className) {
    setClass(el, className);
  }
  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(el, prop, style);
    });
  }
  Object.entries(otherAttrs).forEach(([prop, value]) => {
    setAttribute(el, prop, value);
  });
}
function setClass(el, className) {
  el.className = "";
  if (typeof className === "string") {
    el.className = className;
  } else if (Array.isArray(className)) {
    el.classList.add(...className);
  }
}
function setStyle(el, prop, style) {
  el.style[prop] = style[prop];
}
function setAttribute(el, prop, value) {
  if (value === null) {
    removeAttribute(el, prop);
  } else if (prop.startsWith("data-")) {
    el.setAttribute(prop, value);
  } else {
    el[prop] = value;
  }
}
function removeAttribute(el, prop) {
  el[prop] = null;
  el.removeAttribute(prop);
}

function mountDOM(vdom, parentEl) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT:
      createTextNode(vdom, parentEl);
      break;
    case DOM_TYPES.ELEMENT:
      createElementNode(vdom, parentEl);
      break;
    case DOM_TYPES.FRAGMENT:
      createFragmentNode(vdom, parentEl);
      break;
    default:
      throw new Error(`Unknown vdom type: ${vdom.type}`);
  }
  console.log(vdom);
}
function createTextNode(vdom, parentEl) {
  const { value } = vdom;
  const textNode = document.createTextNode(value);
  vdom.el = textNode;
  parentEl.appendChild(textNode);
}
function createFragmentNode(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;
  children.forEach((child) => mountDOM(child, parentEl));
}
function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom;
  const elementNode = document.createElement(tag);
  addProps(props, elementNode, vdom);
  vdom.el = elementNode;
  children.forEach((child) => mountDOM(child, elementNode));
  parentEl.appendChild(elementNode);
}
function addProps(el, props, vdom) {
  const { on: events, ...attrs } = props;
  setAttributes(attrs, el);
  vdom.listeners = addEventListeners(events, el);
}

function destroyDOM(vdom) {
  switch (vdom.type) {
    case DOM_TYPES.ELEMENT:
      removeElementNode(vdom);
      break;
    case DOM_TYPES.FRAGMENT:
      removeFragmentNode(vdom);
      break;
    case DOM_TYPES.TEXT:
      removeTextNode(vdom);
      break;
    default:
      throw new Error(`Unknown vdom type: ${vdom.type}`);
  }
  delete vdom.el;
}
function removeTextNode(vdom) {
  const { el } = vdom;
  el.remove();
}
function removeElementNode(vdom) {
  const { el, children, listeners } = vdom;
  el.remove();
  children.forEach(destroyDOM);
  if (listeners) {
    removeEventListeners(listeners, el);
    delete vdom.listeners;
  }
}
function removeFragmentNode(vdom) {
  const { children } = vdom;
  children.forEach(destroyDOM);
}

class Dispatcher {
  #subs = new Map();
  #afterCommandHandlers = [];
  subscribe(commandName, handler) {
   if(!this.#subs.has(commandName)){
    this.#subs.set(commandName, []);
   }
   const handlers = this.#subs.get(commandName);
   if(handlers.has(handler)){
    return ()=>{}
   }
   handlers.push(handler);
   return ()=>{
    handlers.splice(handlers.indexOf(handler), 1);
   }
  }
  afterCommand(handler) {
    this.#afterCommandHandlers.push(handler);
    return ()=>{
      this.#afterCommandHandlers.splice(this.#afterCommandHandlers.indexOf(handler), 1);
    }
  }
  dispatch(commandName, payload) {
    const handlers = this.#subs.get(commandName);
    if (handlers) {
      handlers.forEach(handler => handler(payload));
    }
    else {
        console.warn(`No handlers for command: ${commandName}`);
    }
    this.#afterCommandHandlers.forEach(handler => handler(payload));
  }
}

function createApp({state,view, reducers ={}}) {
    parentEl = null;
    vdom = null;
    function renderApp(){
        destroyDOM();
        vdom = view(state);
        mountDOM(vdom, parentEl);
    }
    const dispatcher = new Dispatcher();
    const subscriptions = [dispatcher.afterCommand(renderApp)];
   for(const actionName in reducers){
    const reducer = reducers[actionName];
    subscriptions.push(dispatcher.subscribe(actionName, (payload)=>{
        state = reducer(state, payload);
    }));
   }
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
}

export { createApp, h, hFragment, hString };
