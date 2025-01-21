import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Indexpage from './Index';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Indexpage/>
    </>
  )
}

export default App
