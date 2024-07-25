import * as React from './mini-react/react';

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default function App() {
  return (
    <div className='container'>
      <h1>Hello World</h1>
      <Counter />
    </div>
  );
}
