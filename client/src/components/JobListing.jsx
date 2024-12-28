import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets/assets';
import JobCart from './JobCart';

const JobListing = () => {

    const { searchFilter, isSearched, setSearchFilter } = useContext(AppContext);
    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>

            {/*Sidebar */}
            <div className="w-full lg:w-1/4 bg-white px-4">
                {/*Search Filter from Hero Component*/}
                {
                    isSearched && (searchFilter.title !== '' || searchFilter.location !== '') &&
                    <>
                        <h3 className="font-medium text-lg mb-4">Current Search</h3>
                        <div className="mb-4 text-gray-600">
                            {searchFilter.title && (
                                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                                    {searchFilter.title}
                                    <img onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))} src={assets.cross_icon} alt="" className="cursor-pointer" />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                                    {searchFilter.location}
                                    <img onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} src={assets.cross_icon} alt="" className="cursor-pointer" />
                                </span>
                            )}
                        </div>
                    </>
                }

                {/* Category Filter */}
                <div className="max-lg:hidden">
                    <h4 className="font-medium text-lg py-4">Search by Categories</h4>
                    <ul className="space-y-4 text-gray-600">
                        {
                            JobCategories.map((category, index) => (
                                <li className='flex gap-3 items-center' key={index}>
                                    <input className='scale-125' type="checkbox" name="" id="" />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Location Filter */}
                <div className="max-lg:hidden">
                    <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
                    <ul className="space-y-4 text-gray-600">
                        {
                            JobLocations.map((location, index) => (
                                <li className='flex gap-3 items-center' key={index}>
                                    <input className='scale-125' type="checkbox" name="" id="" />
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Job Listing */}
                <section className='w-full lg:w=3/4 text-gray-600 max-lg:px-4'>
                    <h3 className="font-mediumntext-3xl py-2" id='job-list'>Latest Jobs</h3>
                    <p className="mb-8">Get your desired job from top companies</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {jobsData.map((job, index) => (
                            <JobCart key={index} job={job} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default JobListing