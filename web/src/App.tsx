import { useState } from 'react'
import { useTestData } from "../src/hooks/getData" // use { } to get utility[hooks, ...] none for component
import TodoCard from './component/TodoCard';

function App() {
  const { data } = useTestData();
  return (
    <>
      <h1>{data ?? "failed"}</h1>
      <TodoCard date={new Date()} data='hello'></TodoCard>
    </>
  )
}

export default App
