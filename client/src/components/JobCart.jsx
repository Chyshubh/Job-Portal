import React from 'react'
import { assets } from '../assets/assets/assets'

const JobCart = ({job}) => {
  return (
    <div>
        <div className="">
            <img src={assets.company_icon} alt="" className="" />
        </div>
        <h4 className="">{job.title}</h4>
        <div className="">
            <span className="">{job.location}</span>
            <span className="">{job.level}</span>
        </div>
        <p dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
        <div className="">
            <button className="">Apply Now</button>
            <button className="">Learn More</button>
        </div>
    </div>
  )
}

export default JobCart