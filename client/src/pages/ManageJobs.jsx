import React from 'react'
import { manageJobsData } from '../assets/assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ManageJobs = () => {

    const navigate = useNavigate();

  return (
    <div className='container p-4 max-w-5xl'>
        <div className="overflow-x-auto">
            <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
                <thead>
                    <tr className="">
                        <th className="py-2 px-4 border-b text-left">#</th>
                        <th className="py-2 px-4 border-b text-left">Job Title</th>
                        <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
                        <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
                        <th className="py-2 px-4 border-b text-center max-sm:hidden">Applicants</th>
                        <th className="py-2 px-4 border-b text-left">Visible</th>
                    </tr>
                </thead>
                <tbody>
                {manageJobsData.map((data,index)=>(
                    <tr key={index} className='text-gray-700'>
                        <td className="py-2 px-4 border-b">{index+1}</td>
                        <td className="py-2 px-4 border-b">{data.title}</td>
                        <td className="py-2 px-4 border-b max-sm:hidden">{moment(data.date).format('ll')}</td>
                        <td className="py-2 px-4 border-b max-sm:hidden">{data.location}</td>
                        <td className="py-2 px-4 border-b text-center max-sm:hidden">{data.applicants}</td>
                        <td className="py-2 px-4 border-b">
                            <input type="checkbox" className="scale-125 ml-4" />
                        </td>
                    </tr>
                        
                ))}
                </tbody>
            </table>
        </div>
        <div className="mt-4 flex justify-end">
            <button onClick={()=>navigate('/dashboard/add-job')} className="bg-black text-white py-2 px-4 rounded">Add new job</button>
        </div>
    </div>
  )
}

export default ManageJobs