import React from 'react'
import { assets } from '../assets/assets/assets'
import { useNavigate } from 'react-router-dom';

const JobCart = ({ job }) => {

  const navigate = useNavigate();
    if (!job) {
        return <div>Loading...</div>;  // Loading state
      }
      if (!job.title) {
        return <div>No job data available</div>;  // Fallback
      }
  return (
    <div className='border p-6 shadow rounded'>
        <div className="flex justify-between items-center">
        <img src={job.companyId.image} alt={`${job.company} logo`} className="h-8" />
        </div>
        <h4 className="font-medium text-xl mt-2">{job.title}</h4>
        <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">{job.location}</span>
            <span className="bg-red-50 border border-red-200 px-4 py-1.5 rounded">{job.level}</span>
        </div>
        <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{__html:(job.description || "").slice(0, 150)}}></p>
        <div className="mt-4 flex gap-4 text-sm">
            <button onClick={()=>{navigate(`/apply-jobs/${job._id}`); scrollTo(0,0)}} className="bg-blue-600 text-white px-4 py-2 rounded">Apply Now</button>
            <button onClick={()=>{navigate(`/apply-jobs/${job._id}`); scrollTo(0,0)}} className="border border-gray-500 text-gray-500 px-4 py-2 rounded">Learn More</button>
        </div>
    </div>
  )
}

export default JobCart;