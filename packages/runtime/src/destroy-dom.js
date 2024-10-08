import { DOM_TYPES } from "./h";
import { removeEventListeners } from "./events";

export function destroyDOM(vdom) {
  const { type, el } = vdom;
  switch (type) {
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
  // remove element
  el.remove();

  // remove children
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
