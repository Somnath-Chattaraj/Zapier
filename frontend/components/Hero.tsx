"use client";
import React from 'react'
import { PrimaryButton, SecondaryButton } from './Button'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter();
  return (

    <div className='flex flex-col justify-center items-center'>
        <div className='mt-20 w-3/4 flex justify-center items-center flex-col'>
            <div className='text-7xl font-semibold flex w-full justify-center text-center px-4'> Automate as fast as you can type </div>
            <div className='flex justify-center items-center mt-5 text-2xl mx-5 text-center'> AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.</div>
        </div>
        <div className='pt-7'>
            <PrimaryButton onClick={() => {router.push('/signup')}}  children={'Get started for free'}/>
            <SecondaryButton onClick={() => {router.push('/sales')}}  children={'Contact Sales'}/>
        </div>
        <div className='flex mt-5'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
        <p className='pl-2 font-bold'> Free forever</p>
        <p className='pl-1 pr-5 '> for core features</p>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
        <p className='pl-2 font-bold'> More apps</p>
        <p className='pl-1 pr-5 '> than any other platform</p>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
        <p className='pl-1 '> Cutting-edge</p>
        <p className='pl-2 font-bold'> AI features</p>
        </div>
    </div>
  )
}

export default Hero