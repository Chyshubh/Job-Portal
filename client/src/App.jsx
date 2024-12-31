import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications.jsx'
import ApplyJobs from './pages/ApplyJobs.Jsx'
import RecruiterLogin from './components/RecruiterLogin.jsx'
import AppContext from './context/AppContext.jsx'

const App = () => {
  const{showRLogin} = useContext(AppContext);
  return (
    <div>
      {showRLogin && <RecruiterLogin/>}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/apply-jobs/:id' element={<ApplyJobs/>} />
      <Route  path='/applications' element={<Applications />} />

    </Routes>
    </div>
  )
}

export default App