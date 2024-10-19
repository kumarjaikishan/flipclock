import { Routes, Route } from 'react-router-dom';
import './App.css'
import FlipCountdown from './countdown'
import Flipclock from './clock'
import Navbar from './navbar';
import Timer from './timer';

function App() {

  return (
    <>
      <Navbar />
      <div className="whole light">
        <Routes>
          <Route path="/" element={<Flipclock />} />
          <Route path="/countdown" element={<FlipCountdown />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </div>
    </>
  )
}

export default App
