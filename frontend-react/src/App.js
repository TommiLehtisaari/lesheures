import React, { useState } from 'react'
import Calendar from './components/calendar/Calendar'
import { testdata } from './utils/testdata'
import './App.css'

function App() {
  const [hourlogs, setHourlogs] = useState(testdata)
  return (
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Calendar hourlogs={hourlogs} />
    </div>
  )
}

export default App
