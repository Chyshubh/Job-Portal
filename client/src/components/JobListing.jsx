import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { assets } from '../assets/assets/assets';

const JobListing = () => {

    const {searchFilter, isSearched, s} = useContext(AppContext);
  return (
    <div>

        {/*Sidebar */}
        <div className="">
            {/*Search Filter from Hero Component*/}
            {
                isSearched && (searchFilter.title !== '' || searchFilter.location !== '') &&
                <>
                <h3 className="">Current Search</h3>
                <div className="">
                    {searchFilter.title &&(
                            <span className="">
                                {searchFilter.title}
                                <img src={assets.cross_icon} alt="" className="cursor-pointer" />
                            </span>
                        )}
                    {searchFilter.location &&(
                            <span className="">
                               {searchFilter.location} 
                               <img src={assets.cross_icon} alt="" className="cursor-pointer" />
                            </span>
                        )}
                </div>
                </>
            }
        </div>
    </div>
  )
}

export default JobListing