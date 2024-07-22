const React = () => {
  let _container;
  let _vnode;
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
    const dom = createDOM(_vnode);
    _container.innerHTML = '';
    _container.appendChild(dom);
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
        _render();
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

  return {
    render,
    useState,
  };
};

export default React();
