export function createElement(type, props, ...children) {
  return { type, props, children };
}

export function Fragment(props, ...children) {
  return children;
}
