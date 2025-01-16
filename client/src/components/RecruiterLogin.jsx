import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets/assets';
import AppContext from '../context/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


const RecruiterLogin = () => {

    const navigate = useNavigate()
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassWord] = useState('');
    const [email, setEmail] = useState('');

    const [image, setImage] = useState(false);
    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

    const { setShowRLogin, backendUrl, setCompanyData, setCompanyToken } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("Login button clicked");
        if (state == "Sign Up" && !isTextDataSubmited) {
            return setIsTextDataSubmited(true);
        }

        try {

            const endpoint = `${backendUrl}/api/company/login`;
            const Registerendpoint = `${backendUrl}/api/company/register`;

            if (state === "Login") {

                const { data } = await axios.post(endpoint, { email, password });

                if (data.success) {
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem('companyToken', data.token);
                    setShowRLogin(false)
                    navigate('/dashboard')
                }else{
                    toast.error(data.message)
                }
 
            } else{
                const formData = new FormData();
                formData.append('name',name)
                formData.append('password',password)
                formData.append('email',email)
                formData.append('image',image)

                const {data} = await axios.post(Registerendpoint,formData)

                if (data.success) {
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem('companyToken', data.token);
                    setShowRLogin(false)
                    navigate('/dashboard')
                }else{
                    toast.error(data.message)
                }
            }

        } catch (error) {
            console.error("Axios request failed:", error);
            toast.error(error.message);
        }

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500">
                <h1 className="text-center text-2xl text-neutral-700 font-medium">Recruiter {state}</h1>
                <p className="text-sm">Welcome back! Please sign in to continue</p>
                {state === "Sign Up" && isTextDataSubmited
                    ? <>

                        <div className="flex items-center gap-4 my-10">
                            <label htmlFor="image" className="">
                                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className="w-16 rounded-full" />
                                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' className="" hidden />
                            </label>
                            <p className="">Upload company <br /> logo</p>
                        </div>

                    </>
                    :
                    <>
                        {state !== 'Login' && (

                            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                                <img src={assets.person_icon} alt="" className="" />
                                <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' className="outline-none text-sm" required />
                            </div>
                        )}

                        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                            <img src={assets.email_icon} alt="" className="" />
                            <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' className="outline-none text-sm" required />
                        </div>

                        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                            <img src={assets.lock_icon} alt="" className="" />
                            <input onChange={e => setPassWord(e.target.value)} value={password} type="password" placeholder='Password' className="outline-none text-sm" required />
                        </div>

                    </>
                }
                {state === "Login" &&
                    <p className="text-sm text-blue-600 mt-4 cursor-pointer">Forget password?</p>
                }

                <button type='submit' className="bg-blue-600 w-full text-white py-2 rounded-full mt-4">
                    {state === 'Login' ? 'login' : isTextDataSubmited ? 'create account' : 'next'}
                </button>
                {
                    state === 'Login' ?
                        <p className="mt-5 text-center text-sm">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState("Sign Up")}>Sign Up</span></p>
                        : <p className="mt-5 text-center text-sm">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState("Login")}>Login</span></p>

                }
                <img onClick={() => setShowRLogin(false)} src={assets.cross_icon} alt="" className="absolute top-5 right-5 cursor-pointer" />
            </form>
        </div>
    )
}

export default RecruiterLogin