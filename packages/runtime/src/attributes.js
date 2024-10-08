export function setAttributes(attrs, el) {
  const { class: className, style: style, ...otherAttrs } = attrs;

  if (className) {
    setClass(el, className);
  }
  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(el, prop, value);
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

function setStyle(el, prop, value) {
  el.style[prop] = value;
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
