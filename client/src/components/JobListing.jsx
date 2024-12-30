import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets/assets';
import JobCart from './JobCart';

const JobListing = () => {
  const { searchFilter, isSearched, setSearchFilter, jobs } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  return (
    <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search Filter */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className="font-medium text-lg mb-4">Current Search</h3>
            <div className="mb-4 text-gray-600">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                  {searchFilter.title}
                  <img
                    onClick={() => setSearchFilter((prev) => ({ ...prev, title: '' }))}
                    src={assets.cross_icon}
                    alt="Clear title"
                    className="cursor-pointer"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                  {searchFilter.location}
                  <img
                    onClick={() => setSearchFilter((prev) => ({ ...prev, location: '' }))}
                    src={assets.cross_icon}
                    alt="Clear location"
                    className="cursor-pointer"
                  />
                </span>
              )}
            </div>
          </>
        )}

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? 'Close' : 'Filters'}
        </button>

        {/* Category Filter */}
        <div className={showFilter ? '' : 'hidden'}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input className="scale-125" type="checkbox" id={`category-${index}`} />
                <label htmlFor={`category-${index}`}>{category}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={showFilter ? '' : 'hidden'}>
          <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input className="scale-125" type="checkbox" id={`location-${index}`} />
                <label htmlFor={`location-${index}`}>{location}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listing */}
      <div className="w-full lg:w-3/4 px-4">
        <h3 className="font-medium text-3xl py-2">Latest Jobs</h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice((currentPage - 1) * 6, currentPage * 6).map((job) => (
            <JobCart key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        {jobs.length > 0 && (
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              className="p-2"
            >
              <img src={assets.left_arrow_icon} alt="Previous Page" />
            </button>
            {Array.from({ length: Math.ceil(jobs.length / 6) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 flex items-center justify-center border rounded ${
                  currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(jobs.length / 6)))}
              className="p-2"
            >
              <img src={assets.right_arrow_icon} alt="Next Page" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
