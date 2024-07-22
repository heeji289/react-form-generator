export function createElement(type, props, ...children) {
  return {
    type,
    props,
    children: children.flatMap((child) =>
      typeof child === 'object' ? child : createTextElement(child)
    ),
  };
}

// NOTE: 일관된 형태로 만들기 위해 텍스트 노드도 객체로 만듦
export function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
    },
    children: [],
  };
}

export function Fragment(props, ...children) {
  return children;
}
