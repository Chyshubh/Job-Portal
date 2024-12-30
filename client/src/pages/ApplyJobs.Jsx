import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import App from '../App';
import AppContext from '../context/AppContext';
import Loadiing from '../components/Loadiing';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets/assets';

const ApplyJobs = () => {

  const {id} = useParams();
  const [jobData, setJobData] = useState(null);
  const{jobs} = useContext(AppContext);

  const fetchjob = async ()=>{
    const data= jobs.filter(job=> job._id === id)
    if(data.length !== 0){
      setJobData(data[0]);
      console.log(data[0]);
      
    }
  }

  useEffect(()=>{
    if(jobs.length > 0 ){
      fetchjob();
    }
  },[id,jobs])

  return jobData ? (
    <>
      <Navbar/>
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <img src={assets.company_icon} alt="" className="" />
              <div className="">
                <h1 className="">{jobData.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
      <Loadiing/> 
  )
}

export default ApplyJobs