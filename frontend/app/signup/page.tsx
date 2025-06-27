"use client";

import AppBar from '@/components/AppBar'
import { PrimaryButton } from '@/components/Button'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { BACKEND_URL } from '../config';
import { User, Mail, Lock, ArrowRight, Check, Sparkles, Shield, Zap } from 'lucide-react';

const Signup = () => {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSignup = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                username: name,
                email,
                password,
            }, { withCredentials: true });
            router.push('/dashboard');
        } catch (error) {
            console.error("Error: ", error);
            alert("Error signing up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
            <AppBar signup={false} Login={true} contactSales={false} threeLines={false} network={false} />
            
            <div className='px-4 py-12'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    
                    {/* Left Side - Marketing Content */}
                    <div className='space-y-8'>
                        <div className='space-y-6'>
                            <div className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium'>
                                <Sparkles className='w-4 h-4' />
                                <span>Join Millions</span>
                            </div>
                            <h1 className='text-4xl lg:text-5xl font-bold text-slate-900 leading-tight'>
                                Join millions worldwide who automate their work
                            </h1>
                            <p className='text-lg text-slate-600 leading-relaxed'>
                                Start automating your workflows today and experience the power of seamless integration.
                            </p>
                        </div>

                        <div className='space-y-6'>
                            <div className='flex items-start space-x-4'>
                                <div className='bg-green-100 p-2 rounded-full mt-1'>
                                    <Check className='w-5 h-5 text-green-600' />
                                </div>
                                <div>
                                    <h3 className='font-semibold text-slate-900'>Easy setup, no coding required</h3>
                                    <p className='text-slate-600 text-sm mt-1'>Get started in minutes with our intuitive drag-and-drop interface</p>
                                </div>
                            </div>
                            
                            <div className='flex items-start space-x-4'>
                                <div className='bg-blue-100 p-2 rounded-full mt-1'>
                                    <Check className='w-5 h-5 text-blue-600' />
                                </div>
                                <div>
                                    <h3 className='font-semibold text-slate-900'>Free forever for core features</h3>
                                    <p className='text-slate-600 text-sm mt-1'>Start free and upgrade only when you need advanced features</p>
                                </div>
                            </div>
                            
                            <div className='flex items-start space-x-4'>
                                <div className='bg-purple-100 p-2 rounded-full mt-1'>
                                    <Check className='w-5 h-5 text-purple-600' />
                                </div>
                                <div>
                                    <h3 className='font-semibold text-slate-900'>14-day trial of premium features</h3>
                                    <p className='text-slate-600 text-sm mt-1'>Experience the full power with our premium trial</p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className='bg-white p-6 rounded-2xl shadow-lg border border-slate-200'>
                            <div className='flex items-center space-x-4'>
                                <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl'>
                                    <Shield className='w-6 h-6 text-white' />
                                </div>
                                <div>
                                    <h4 className='font-semibold text-slate-900'>Enterprise Security</h4>
                                    <p className='text-slate-600 text-sm'>SOC 2 compliant with bank-level encryption</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Signup Form */}
                    <div className='w-full max-w-md mx-auto'>
                        <div className='bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden'>
                            
                            {/* Header */}
                            <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6'>
                                <div className='text-center'>
                                    <Zap className='w-8 h-8 text-white mx-auto mb-3' />
                                    <h2 className='text-2xl font-bold text-white'>Get Started</h2>
                                    <p className='text-blue-100 text-sm mt-1'>Create your free account</p>
                                </div>
                            </div>

                            {/* Form */}
                            <div className='px-8 py-8 space-y-6'>
                                
                                {/* Google Sign Up */}
                                <button 
                                    onClick={() => signIn()} 
                                    className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span>Sign up with Google</span>
                                </button>

                                {/* Divider */}
                                <div className="flex items-center">
                                    <div className="flex-1 border-t border-gray-200"></div>
                                    <span className="mx-4 text-sm text-gray-500 bg-white px-2">or</span>
                                    <div className="flex-1 border-t border-gray-200"></div>
                                </div>

                                {/* Name Input */}
                                <div className='space-y-2'>
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Full Name
                                    </label>
                                    <div className='relative'>
                                        <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                                        <input 
                                            type="text" 
                                            value={name}
                                            onChange={(ev) => setName(ev.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white" 
                                            placeholder="Enter your full name"
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className='space-y-2'>
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Email Address
                                    </label>
                                    <div className='relative'>
                                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(ev) => setEmail(ev.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white" 
                                            placeholder="Enter your email"
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className='space-y-2'>
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                                        <input 
                                            type="password" 
                                            value={password}
                                            onChange={(ev) => setPassword(ev.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white" 
                                            placeholder="Create a strong password"
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Sign Up Button */}
                                <button
                                    onClick={handleSignup}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <span>Get Started Free</span>
                                            <ArrowRight className='w-5 h-5' />
                                        </>
                                    )}
                                </button>

                                {/* Terms */}
                                <p className='text-xs text-slate-500 text-center leading-relaxed'>
                                    By signing up, you agree to our{' '}
                                    <button className='text-blue-600 hover:text-blue-700 underline'>
                                        Terms of Service
                                    </button>{' '}
                                    and{' '}
                                    <button className='text-blue-600 hover:text-blue-700 underline'>
                                        Privacy Policy
                                    </button>
                                </p>

                                {/* Sign In Link */}
                                <div className='text-center'>
                                    <p className='text-sm text-slate-600'>
                                        Already have an account?{' '}
                                        <button 
                                            onClick={() => router.push('/signin')}
                                            className='text-blue-600 hover:text-blue-700 font-semibold'
                                        >
                                            Sign in
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup