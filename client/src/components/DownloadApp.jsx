import React from 'react'
import { assets } from '../assets/assets/assets'

const DownloadApp = () => {
  return (
    <div className="container relative px-4 2xl:px-20 mx-auto my-20">
      <div className="relative bg-gradient-to-r from-violet-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 max-w-md">
          Download Mobile App For Better Experience
        </h1>
        <div className="flex gap-4">
          <a href="#" className="inline-block">
            <img src={assets.play_store} alt="" className="h-12" />
          </a>
          <a href="#" className="inline-block">
            <img src={assets.app_store} alt="" className="h-12" />
          </a>
        </div>
      </div>
      <img
        src={assets.app_main_img}
        alt=""
        className="absolute w-80 right-8 bottom-8 max-lg:hidden"
      />
    </div>
  )
}

export default DownloadApp
