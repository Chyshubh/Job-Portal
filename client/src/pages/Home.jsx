import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import DownloadApp from '../components/DownloadApp'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <JobListing/>
      <DownloadApp/>
    </div>
  )
}

export default Home