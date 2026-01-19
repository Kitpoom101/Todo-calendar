import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './component/Layout'
import Calendar from './component/Calendar'
import { HoveringCell } from './context/HoveringCell'

function App() {


  return (
      // to pass context around in layout
    <HoveringCell>
      <Layout>
        <Calendar></Calendar>
      </Layout>
    </HoveringCell>
  )
}

export default App
