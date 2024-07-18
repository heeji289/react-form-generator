/**
 * VDOM을 Real DOM으로 변환하고 DOM에 추가
 * @param vnode - createElement의 결과
 * @param container - 변환한 VDOM을 추가할 곳 (Element)
 */
export function render(vnode, container) {
  const dom = createDOM(vnode);
  container.appendChild(dom);
}

/**
 * VDOM을 DOM으로 변환
 * @param vnode
 * @returns 변환된 DOM
 */
export function createDOM(vnode) {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode);
  }

  const dom = document.createElement(vnode.type);

  // props를 dom에 반영
  for (const [key, value] of Object.entries(vnode.props ?? {})) {
    dom.setAttribute(key, value);
  }

  // children을 dom에 붙임
  vnode.children?.forEach((child) => {
    render(child, dom);
  });

  return dom;
}
