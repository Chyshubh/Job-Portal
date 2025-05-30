import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications.jsx'
import ApplyJobs from './pages/ApplyJobs.Jsx'
import RecruiterLogin from './components/RecruiterLogin.jsx'
import AppContext from './context/AppContext.jsx'
import DashBoard from './pages/DashBoard.jsx'
import AddJob from './pages/AddJob.jsx'
import ManageJobs from './pages/ManageJobs.jsx'
import ViewApplications from './pages/ViewApplications.jsx'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const{showRLogin, companyToken} = useContext(AppContext);
  return (
    <div>
      {showRLogin && <RecruiterLogin/>}
      <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/apply-jobs/:id' element={<ApplyJobs/>} />
      <Route  path='/applications' element={<Applications />} />
      <Route path='/dashboard' element={<DashBoard/>}>
      {
        companyToken ? <>
        <Route path='add-job' element={<AddJob/>} />
      <Route path='manage-jobs' element={<ManageJobs/>} />
      <Route path='view-applications' element={<ViewApplications/>} />
        </> : null
      }
      </Route>
    </Routes>
    </div>
  )
}

export default App