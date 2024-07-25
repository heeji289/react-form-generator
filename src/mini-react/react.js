const React = () => {
  let _container;
  let _vnode;
  let _prevVnode = null;

  let _states = new Map();
  let _stateIndex = 0;
  let _currentComponent;

  /**
   * 가상DOM을 실제DOM으로 변환하여 렌더링
   */
  const render = (vnode, container) => {
    _container = container;
    _vnode = vnode;
    _render();
  };

  const _render = () => {
    // VDOM 생성
    const newVnode = createVirtualDOM(_vnode);
    updateDOM(_prevVnode, newVnode, _container);
    _prevVnode = newVnode;
  };

  const useState = (initialValue) => {
    if (!_states.has(_currentComponent)) {
      _states.set(_currentComponent, []);
    }

    const componentStates = _states.get(_currentComponent);
    if (componentStates[_stateIndex] === undefined) {
      componentStates[_stateIndex] = initialValue;
    }

    const setState = (newValue) => {
      if (componentStates[_stateIndex] !== newValue) {
        componentStates[_stateIndex] = newValue;
        setTimeout(_render, 0);
      }
    };

    _stateIndex++;

    return [componentStates[_stateIndex], setState];
  };

  /**
   * VDOM을 DOM으로 변환
   * @param vnode
   * @returns 변환된 DOM
   */
  const createDOM = (vnode) => {
    if (vnode.type === 'TEXT_ELEMENT') {
      return document.createTextNode(vnode.props.nodeValue);
    }

    if (typeof vnode.type === 'function') {
      _currentComponent = vnode.type;
      _stateIndex = 0;
      const result = vnode.type(vnode.props);
      return createDOM(result);
    }

    const dom = document.createElement(vnode.type);

    // props를 dom에 반영
    setAttributes(dom, vnode.props ?? {});

    // children을 dom에 붙임
    vnode.children?.forEach((child) => {
      dom.appendChild(createDOM(child));
    });

    return dom;
  };

  const updateDOM = (prevNode, newVnode, container, index = 0) => {
    const currentNode = container.childNodes[index];

    if (prevNode == null) {
      // 초기 렌더링
      container.appendChild(createDOM(newVnode));
    } else if (newVnode == null) {
      // 해당 노드 제거가 필요한 경우
      if (currentNode) {
        container.removeChild(currentNode);
      }
    } else if (newVnode.type === 'TEXT_ELEMENT') {
      // 텍스트 노드 변경
      if (prevNode.props.nodeValue !== newVnode.props.nodeValue) {
        currentNode.textContent = newVnode.props.nodeValue;
      }
    } else if (checkNodeChanged(prevNode, newVnode)) {
      // 노드가 완전히 바뀜 (<div> -> <span> 같이)
      // 완전 새로운 노드를 만들어서 교체
      const newDOM = createDOM(newVnode);
      container.replaceChild(newDOM, currentNode);
    } else {
      // 속성이나 자식 요소가 변경된 경우
      // 속성은 업데이트하고
      updateAttributes(currentNode, prevNode.props, newVnode.props);

      // 자식은 재귀적으로 업데이트
      const prevChildren = prevNode.children;
      const newChildren = newVnode.children;

      const maxLength = Math.max(prevChildren.length, newChildren.length);

      for (let i = 0; i < maxLength; i++) {
        updateDOM(prevChildren[i], newChildren[i], currentNode, i);
      }
    }

    // 남은 이전 자식 노드들 제거
    while (
      (currentNode?.childNodes?.length ?? 0) > (newVnode?.children?.length ?? 0)
    ) {
      currentNode.removeChild(currentNode.lastChild);
    }
  };

  const checkNodeChanged = (node1, node2) => {
    return typeof node1 !== typeof node2 || node1.type !== node2.type;
  };

  const createVirtualDOM = (vnode) => {
    if (typeof vnode.type === 'function') {
      _currentComponent = vnode.type;
      _stateIndex = 0;
      const result = vnode.type(vnode.props);
      return createVirtualDOM(result);
    }

    return {
      ...vnode,
      children: vnode.children?.map(createVirtualDOM),
    };
  };

  const updateAttributes = (element, prevProps, newProps) => {
    // 이전 속성 없애고
    for (const key in prevProps) {
      if (key.startsWith('on')) {
        const eventType = key.toLowerCase().substring(2);
        element.removeEventListener(eventType, prevProps[key]);
      } else {
        element.removeAttribute(key);
      }
    }

    setAttributes(element, newProps ?? {});
  };

  const setAttributes = (element, props) => {
    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith('on')) {
        element.addEventListener(key.substring(2).toLowerCase(), value);
      } else if (key === 'className') {
        element.setAttribute('class', value);
      } else if (key === 'disabled' || key === 'checked') {
        if (value === true || value === 'true') {
          element.setAttribute(key, '');
        } else {
          element.removeAttribute(key);
        }
      } else {
        element.setAttribute(key, value);
      }
    }
  };

  return {
    render,
    useState,
  };
};

export const { render, useState } = React();
