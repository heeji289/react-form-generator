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
    const component = _currentComponent;
    const index = _stateIndex;

    if (!_states.has(component)) {
      _states.set(component, []);
    }

    const componentStates = _states.get(component);
    if (componentStates[index] === undefined) {
      componentStates[index] = initialValue;
    }

    const setState = (newValue) => {
      if (componentStates[index] !== newValue) {
        componentStates[index] = newValue;
        setTimeout(_render, 0);
      }
    };

    _stateIndex++;

    return [componentStates[index], setState];
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
    for (const [key, value] of Object.entries(vnode.props ?? {})) {
      if (key.startsWith('on')) {
        dom.addEventListener(key.substring(2).toLowerCase(), value);
      } else if (key === 'className') {
        dom.setAttribute('class', value);
      } else {
        dom.setAttribute(key, value);
      }
    }

    // children을 dom에 붙임
    vnode.children?.forEach((child) => {
      dom.appendChild(createDOM(child));
    });

    return dom;
  };

  const updateDOM = (prevNode, newVnode, container, index = 0) => {
    if (prevNode === null) {
      // 초기 렌더링
      container.appendChild(createDOM(newVnode));
    } else if (newVnode === null) {
      // 해당 노드 제거가 필요한 경우
      container.removeChild(container.childNodes[index]);
    } else if (newVnode.type === 'TEXT_ELEMENT') {
      // 텍스트 노드 변경
      if (prevNode !== newVnode) {
        container.childNodes[index].textContent = newVnode.props.nodeValue;
      }
    } else if (checkNodeChanged(prevNode, newVnode)) {
      // 노드가 완전히 바뀜 (<div> -> <span> 같이)
      // 완전 새로운 노드를 만들어서 교체
      const newDOM = createDOM(newVnode);
      container.replaceChild(newDOM, container.childNodes[index]);
    } else {
      // 속성이나 자식 요소가 변경된 경우
      // 속성은 업데이트하고
      updateAttributes(
        container.childNodes[index],
        prevNode.props,
        newVnode.props
      );

      // 자식은 재귀적으로 업데이트
      const prevChildren = prevNode.children;
      const newChildren = newVnode.children;

      const maxLength = Math.max(prevChildren.length, newChildren.length);

      for (let i = 0; i < maxLength; i++) {
        updateDOM(
          prevChildren[i],
          newChildren[i],
          container.childNodes[index],
          i
        );
      }
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
    const allProps = { ...prevProps, ...newProps };

    for (const [key, value] of Object.entries(allProps)) {
      if (key.startsWith('on')) {
        element.addEventListener(key.substring(2).toLowerCase(), value);
      } else if (key === 'className') {
        element.setAttribute('class', value);
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

export default React();
