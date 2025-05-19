import { useState } from 'react'
import './App.css'
import ProjectList from '../Components/ProjectList'
import CategoryFilter from '../Components/CategoryFilter'
import Header from '../Components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='container mt-4'>
      <div className='row bg-primary text-white'>
        <Header/>
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <CategoryFilter/>
        </div>
        <div className='col-md-9'>
          <ProjectList/>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
