import { useState } from 'react'
import './App.css'
import FlipCountdown from './countdown'
import Flipclock from './clock'

function App() {
  const [which, setwhich] = useState(0)

  return (
    <>
    <div style={{marginBottom:'350px',display:'flex' , gap:'8px'}}>
      <button onClick={()=> setwhich(0)}>Countdown</button>
      <button onClick={()=> setwhich(1)}>clock</button>
    </div>
     {which==0 && <FlipCountdown />}
     {which==1 && <Flipclock />}
    </>
  )
}

export default App
