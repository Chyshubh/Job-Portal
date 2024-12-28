import React from 'react'
import { assets } from '../assets/assets/assets'

const JobCart = ({ job }) => {
    if (!job) {
        return <div>Loading...</div>;  // Loading state
      }
      if (!job.title) {
        return <div>No job data available</div>;  // Fallback
      }
  return (
    <div>
        <div className="">
        <img src={assets.company_icon} alt={`${job.company} logo`} className="" />
        </div>
        <h4 className="">{job.title}</h4>
        <div className="">
            <span className="">{job.location}</span>
            <span className="">{job.level}</span>
        </div>
        <p dangerouslySetInnerHTML={{__html:(job.description || "").slice(0, 150)}}></p>
        <div className="">
            <button className="">Apply Now</button>
            <button className="">Learn More</button>
        </div>
    </div>
  )
}

export default JobCart;