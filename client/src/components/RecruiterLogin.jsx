import React, { useState } from 'react'
import { assets } from '../assets/assets/assets';

const RecruiterLogin = () => {
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassWord] = useState('');
    const [email, setEmail] = useState('');

    const [image, setImage] =useState(false);
    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);



  return (
    <div>
     <form action="" className="">
        <h1 className="">Recruiter {state}</h1>
        <p className="">Welcome back! Please sign in to continue</p>
        <>
        <div className="">
            <img src={assets.person_icon} alt="" className="" />
            <input onChange={e=>setName(e.target.value)} value={name} type="text" placeholder='Company Name' className="" required/>
        </div>

        <div className="">
            <img src={assets.email_icon} alt="" className="" />
            <input onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' className="" required/>
        </div>

        <div className="">
            <img src={assets.lock_icon} alt="" className="" />
            <input onChange={e=>setPassWord(e.target.value)} value={password} type="password" placeholder='Password' className="" required/>
        </div>

        <button className="">
            {state === 'Login' ? 'login' : 'create account'}
        </button>
        </>
     </form>
    </div>
  )
}

export default RecruiterLogin