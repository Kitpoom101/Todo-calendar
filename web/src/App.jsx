import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './component/Layout'
import Calendar from './component/Calendar'
import { HoveringCell } from './context/HoveringCell'
import MainScene from './component/MainPage/MainScene'
import { AnimatePresence } from 'framer-motion'

function App() {
  const [view, setView] = useState("main");


  return (
      // to pass context around in layout
    <AnimatePresence mode='wait'>
      {view === "main" && (
        <MainScene key='main' onOpenCalendar={() => setView("calendar")}></MainScene>
      ) }
      {view === "calendar" && (
        <HoveringCell>
          <Layout key='calendar' onOpenMain={() => setView("main")}>
          </Layout>
        </HoveringCell>
      )}
    </AnimatePresence>
  )
}

export default App
