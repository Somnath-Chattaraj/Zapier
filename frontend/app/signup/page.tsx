"use client";

import AppBar from '@/components/AppBar'
import { PrimaryButton } from '@/components/Button'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { BACKEND_URL } from '../config';

const Signup = () => {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  return (
    <div className='px-2 pd-10'>
        <AppBar signup={false} Login={true} contactSales={false} threeLines={false}  network={false} />
        <div className=' flex flex-col md:flex-row w-full items-center flex-1 px-10'>
            <div className='flex flex-col'>
                <div className='text-3xl md:w-1/2 pt-20 pd-5 font-bold'>Join millions worldwide who automate their work using Zapier.</div>
                <ul className='pt-5 space-y-3'>
                    <div className='flex space-x-2 text-gray-600' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle"><path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path></svg>
                        <p>Easy setup, no coding required</p></div>
                    <div className='flex space-x-2 text-gray-600' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle"><path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path></svg>
                        <p>Free forever for core features</p></div>
                    <div className='flex space-x-2 text-gray-600' > 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="success400" name="formCheckCircle"><path fill="#2D2E2E" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path></svg>
                        <p> 14-day trial of premium features & apps</p></div>
                </ul>
            </div>

            <div className='border-2 flex justify-center flex-col border-gray-300 space-y-4 rounded-lg mt-14 py-5'>
                <div className='mx-5'>
                    <button onClick={() => signIn()} type="button" className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 lg:px-24 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
                </div>
                <div className="flex items-center justify-center px-5 my-2">
                    <div className="flex-grow border-t p border-gray-400"></div>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className='px-5 py-2'>
                        <label  className="block mb-2 text-sm  text-gray-900 font-bold">*Name (required)</label>
                        <input onChange={(ev) => setName(ev.target.value)} type="text" id="first_name" className="bg-transparent border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className='px-5 py-2'>
                        <label  className="block mb-2 text-sm  text-gray-900 font-bold">* Email (required)</label>
                        <input onChange={(ev) => setEmail(ev.target.value)} type="text" id="first_name" className="bg-transparent border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className='px-5 py-2'>
                        <label  className="block mb-2 text-sm  text-gray-900 font-bold">*Password (required)</label>
                        <input onChange={(ev) => setPassword(ev.target.value)} type="password" id="first_name" className="bg-transparent border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                    {/* <div className='w-full'>
                        <label  className="block mb-2 text-sm  text-gray-900 font-bold">*First name (required)</label>
                        <input type="text" id="first_name" className="bg-transparent border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className='w-full'>
                        <label  className="block mb-2 w-full text-sm font-bold text-gray-900">*Last name (required)</label>
                        <input type="text" id="last_name" className="bg-transparent border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div> */}
                    
                <PrimaryButton onClick={async () => {
                    try {
                        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                            username : name,
                            email,
                            password,
                        },{withCredentials: true})
                        router.push('/dashboard');
                    } catch (error) {
                        console.error("Error: ", error);
                        alert("Error signing up");
                }}} children={'Get Started free'}/>
                    <div className='px-5'>
                    By signing up, you agree to Zapier's <u>terms of service</u> and <u>privacy policy.</u>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Signup