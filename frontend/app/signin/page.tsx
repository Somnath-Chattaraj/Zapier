"use client"
import AppBar from '@/components/AppBar'
import { PrimaryButton, SecondaryButton } from '@/components/Button'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BACKEND_URL } from '../config'

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  return (
    <div className='h-screen '>
      <AppBar signup={true} Login={false} contactSales={false} threeLines={false} network={false} />
      <div className='flex text-left w-full  justify-center space-x-12'>
        <div className='md:w-1/3 hidden md:visible md:flex md:mt-48 md:flex-col r'>
          <div className='text-3xl font-bold'>Automate across your teams</div>
          <div className='flex justify-center text-gray-600 items-center text-md my-5'>Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.</div>
          <button className="bg-blue-800 hover:bg-blue-950 py-2 w-1/2 text-white">Explore Zapier Enterprise</button>
        </div>
        <div className='items-center justify-center'>
          <div className='w-full flex items-center justify-center mt-12 text-2xl font-bold'>
            <p>Log in to your account</p>
          </div>
        <div className=' border border-gray-300  px-3 py-5 rounded-md justify-center items-center mt-10'>
                  <div className='mx-5'>
                      <button onClick={() => signIn()} type="button" className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 lg:px-24 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
                  </div>
                  
                  <div className="flex items-center justify-center px-5 my-2">
                      <div className="flex-grow border-t p border-gray-400"></div>
                      <span className="mx-4 text-gray-500">OR</span>
                      <div className="flex-grow border-t border-gray-400"></div>
                  </div>
                  {/* <div className='px-5 py-2 md-5'>
                          <label  className="block mb-2 text-sm  text-gray-900 font-semibold">*Name (required)</label>
                          <input type="text" id="first_name" onChange={(ev) => {setName(ev.target.value)}} className="bg-transparent border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                  </div> */}
                  <div className='px-5 py-2 md-5'>
                          <label  className="block mb-2 text-sm  text-gray-900 font-semibold">*Email (required)</label>
                          <input type="text" id="first_name" onChange={(ev) => {setEmail(ev.target.value)}} className="bg-transparent border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                  </div>
                  <div className='px-5 py-2 md-5'>
                          <label  className="block mb-2 text-sm  text-gray-900 font-semibold">*Password (required)</label>
                          <input type="password" id="first_name" onChange={(ev) => {setPassword(ev.target.value)}} className="bg-transparent border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                  </div>
                  {/* <PrimaryButton onClick={() => {router.push('/signup')}} children={'Get Started free'}/> */}
                  <div className='mt-4 mr-5'>
                  <SecondaryButton onClick={async() => {
                    try {
                      const res = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
                        email,
                        password,
                      },{withCredentials: true});
                      router.push('/dashboard');
                    } catch (error) {
                      console.error("Error: ", error);
                      alert("Error signing up");
                    }
                      
                  }} children={'Continue'}/>

                  </div>
          </div>
          </div>
      </div>
    </div>
    
  )
}

export default Signin