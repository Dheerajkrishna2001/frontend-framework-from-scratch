export function attributes(el, attrs) {
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

function removeStyle(el, prop) {
  el.style[prop] = null;
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
