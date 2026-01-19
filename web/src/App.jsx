import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './component/Layout'
import Calendar from './component/Calendar'

function App() {


  return (
    <>
      <Layout>
        <Calendar></Calendar>
      </Layout>
    </>
  )
}

export default App
