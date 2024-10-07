import withOutNulls from "./utils/array";

// object that contains the types of nodes.
export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};

export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withOutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}

export function hString(text) {
  return {
    type: DOM_TYPES.TEXT,
    value: text,
  };
}

export function hFragment(children) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withOutNulls(children)),
  };
}

export function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" ? hString(child) : child
  );
}

export function lipsum(number) {
  let arr;
  for (let i = 0; i < number; i++) {
    arr.push("lorem ipsum dolor sit amet");
  }
  return hFragment(arr);
}

export function MessageComponent(level, message) {
  return h("div", { class: `message message--${level}` }, [
    h("p", {}, [message]),
  ]);
}
