import { useState } from 'react'
import { useTestData } from "../src/hooks/getData" // use { } to get utility[hooks, ...] none for component
import TodoCard from './component/TodoCard';

function App() {
  const { data } = useTestData();
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{data ?? "failed"}</h1>
      <TodoCard date={new Date()} data='hello'></TodoCard>
      <button onClick={() => setCount(count+1)}>{count}</button>
    </>
  )
}

export default App
