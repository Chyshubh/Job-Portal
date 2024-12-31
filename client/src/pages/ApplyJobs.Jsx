import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import App from '../App';
import AppContext from '../context/AppContext';
import Loadiing from '../components/Loadiing';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets/assets';
import kconvert from 'k-convert';
import moment from 'moment'


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
              <img src={jobData.companyId.image} alt="" className="" />
              <div className="">
                <h1 className="">{jobData.title}</h1>
                <div className="">
                  <span className="">
                    <img src={assets.suitcase_icon} alt="" className="" />
                    {jobData.companyId.name}
                  </span>
                  <span>
                    <img src={assets.location_icon} alt="" className="" />
                    {jobData.location}
                  </span>
                  <span>
                    <img src={assets.person_icon} alt="" className="" />
                    {jobData.level}
                  </span>
                  <span>
                    <img src={assets.money_icon} alt="" className="" />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="">
              <button>Apply Now</button>
              <p className="">Posted {moment(jobData.data).fromNow()}</p>
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