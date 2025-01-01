import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets/assets';

const AddJob = () => {

    const [title, setTitle] = useState();
    const [location, setLocation] = useState('Bangalore');
    const [category, setcategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null);
    const quillref = useRef(null)

    const onSubmitHandler = () => {
        e.preventDefault();
    }

    useEffect(() => {
        //Initiate Quill only once
        if (!quillref.current && editorRef.current) {
            quillref.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }

    }, [])

    return (
        <form onSubmit={onSubmitHandler} className="container p-4 flex flex-col w-full items-start gap-3">

            <div className="w-full">
                <p className="mb-2">Job Title</p>
                <input 
                onChange={e => setTitle(e.target.value)} value={title} type="text" placeholder='Type here' 
                className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded" />
            </div>

            <div className="w-full max-w-lg">
                <p className="my-2">Job Description</p>
                <div ref={editorRef} className="">

                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

                <div className="">
                    <p className="mb-2">Job Category</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setcategory(e.target.value)}>
                        {JobCategories.map((category, index) => (
                            <option key={index} value={category} className="">{category}</option>
                        ))}
                    </select>
                </div>

                <div className="">
                    <p className="mb-2">Job Location</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((location, index) => (
                            <option key={index} value={location} className="">{location}</option>
                        ))}
                    </select>
                </div>

                <div className="">
                    <p className="mb-2">Job Level</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLevel(e.target.value)}>
                        <option value="Beginner level" className="">Beginner level</option>
                        <option value="Intermediate level" className="">Intermediate level</option>
                        <option value="Senior level" className="">Senior level</option>
                    </select>
                </div>

            </div>

            <div className="">
                <p className="mb-2">Job Salary</p>
                <input min={0} onChange={e=> setSalary(e.target.value)} value={salary} type="Number" placeholder='25,000' className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]" />
            </div>

            <button className="w-28 py-3 mt-4 bg-black text-white rounded-lg">ADD</button>
        </form>
    )
}

export default AddJob