목차
[Vanilla JS로 React 만들기](#-Vanilla-JS로-React-만들기)
[만든 React로 Google Form 제작](#-만든-React로-Google-Form-제작)

# Vanilla JS로 React 만들기

## 요구사항

### 1. jsx 트랜스파일링

- **목표**: 사용자가 jsx 문법으로 작성한 컴포넌트를 JavaScript 코드로 변환한다.
- **상세 내용**:

  1. esbuild 옵션을 활용해 jsx문법을 `createElement`로 변환
  2. `jsxInject` 옵션으로 자동으로 `createElement`를 import

  **before**

  ```jsx
  <div class='container'>
    <h1>Hello World</h1>
  </div>
  ```

  **after**

  ```jsx
  // type, props, children
  createElement(
    'div',
    { class: 'container' },
    createElement('h1', null, 'Hello World')
  );
  ```

### 2. Virtual DOM 구현

- **목표**: Virtual DOM을 생성하고 이를 실제 DOM으로 변환하여 렌더링한다.
- **상세 내용**:

  - `createElement` 함수를 통해 Virtual DOM 노드를 생성한다.

    ```jsx
    createElement(
      'div',
      { class: 'container' },
      createElement('h1', null, 'Hello World')
    );
    ```

  - **초기 렌더링**: Virtual DOM 노드를 실제 DOM 노드로 변환하고, 이를 지정된 컨테이너에 추가하여 화면에 렌더링한다.
    - 실제 DOM 노드 생성: `createDOM(Virtual DOM 객체)` 함수 사용
    - 지정된 컨테이너에 추가: `document.getElementById('root').appendChild(createDOM(vNode))`
  - **상태 변경 시 업데이트**: 기존 DOM과 새로운 Virtual DOM을 비교하여 변경된 부분만 실제 DOM에 반영한다.
    - `updateDOM` 함수로 이전 Virtual DOM과 새로운 Virtual DOM을 비교하여 변경된 부분만 업데이트

### 3. useState 훅 구현

- **목표**: 컴포넌트 내부에서 상태를 관리할 수 있는 `useState` 훅을 제공한다.
- **상세 내용**:

  - 초기 상태 값을 받아 현재 상태와 상태를 업데이트하는 함수를 반환한다.

    ```jsx
    const [count, setCount] = useState(0);
    ```

  - 상태 변경 시 컴포넌트 트리를 재탐색하여 변경된 부분만 재렌더링
    - 상태 변경 후 Virtual DOM을 다시 생성하고, 이전 Virtual DOM과 비교하여 변경된 부분만 실제 DOM에 반영

## 구현계획

### 1. jsx 트랜스파일링

- [x] jsx 문자열을 받아 태그, 속성, 자식 요소를 파싱하는 함수 작성
- [x] 파싱한 결과를 `createElement`를 호출하는 형태로 변환

### 2. Virtual DOM 구현

- [x] `createElement` 함수 구현
  - [x] 태그, 속성, 자식 요소를 받아 VDOM 노드를 생성하는 함수 작성
- [x] `createDOM` 함수 구현
  - [x] VDOM을 실제 DOM으로 변환하는 함수 작성
- [x] `render` 함수 구현
- [x] `updateDOM` 함수 구현
  - [x] 기존 DOM과 VDOM을 비교하는 로직 작성
  - [x] 변경된 부분만 업데이트하는 로직 작성

### 3. useState 훅 구현

- [x] 초기 상태 값을 받아 현재 상태와 상태 업데이트 함수를 반환하는 함수 작성
- [x] `setState`로직 작성
- [x] 상태 변경시 리렌더링되도록

# 만든 React로 Google Form 제작

- TODO
