import withOutNulls from "./utils/array";

// object that contains the types of nodes.
export const DOM_TYPES = {
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
  return children.map((child) => {
    typeof child === "string" ? hString(child) : child;
  });
}

function lipsum(number) {
  let arr;
  for (let i = 0; i < number; i++) {
    arr.push("lorem ipsum dolor sit amet");
  }
  return hFragment(arr);
}

function MessageComponent(level, message) {
  return h("div", { class: `message message--${level}` }, [
    h("p", {}, [message]),
  ]);
}
modules.export = { h, hString, hFragment, lipsum, MessageComponent };
