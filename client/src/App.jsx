import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications.jsx'
import ApplyJobs from './pages/ApplyJobs.Jsx'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/apply-jobs/:id' element={<ApplyJobs/>} />
      <Route  path='/applications' element={<Applications />} />
    </Routes>
    </div>
  )
}

export default App