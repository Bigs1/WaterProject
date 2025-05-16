import { useState } from 'react'
import './App.css'
import ProjectList from '../Components/ProjectList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProjectList/>
    </>
  )
}

export default App
