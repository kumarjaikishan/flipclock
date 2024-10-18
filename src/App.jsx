import { useState } from 'react'
import './App.css'
// import Flipclock from './countdown'
import Flipclock from './clock'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Flipclock/>
    </>
  )
}

export default App
