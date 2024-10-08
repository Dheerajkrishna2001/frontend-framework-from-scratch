import { DOM_TYPES } from "./h";
import { addEventListeners } from "./events";
import { setAttributes } from "./attributes";

export function mountDOM(vdom, parentEl) {
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

function addProps(props,el, vdom) {

  const { on: events, ...attrs } = props;
  setAttributes(attrs, el);
  vdom.listeners = addEventListeners(events, el);
}
