'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function SignupPage() {
    const router = useRouter();
    const [user,setUser] = useState({
        email:"",
        password:"",
        username:"",
    })


    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading,setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup success",response.data)
            router.push('/login')

        } catch (error:any) {
            console.log("Signup Failed");
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0
            && user.username.length > 0){
             setButtonDisabled(false)   
            }else {
                setButtonDisabled(true)
            }
    },[user])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 to-blue-500'>
            <h1 className="text-4xl font-bold text-white mb-6">{loading ? "Processing" : "Signup"}</h1>
            <hr className="w-1/2 border-t-2 border-white mb-6"/>
            <label htmlFor='username' className="text-white font-semibold">Username</label>
            <input
                className="p-3 border border-white rounded-lg mb-4 focus:outline-none focus:border-blue-300 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Enter your username"
            />
            <label htmlFor="email" className="text-white font-semibold">Email</label>
            <input 
                className="p-3 border border-white rounded-lg mb-4 focus:outline-none focus:border-blue-300 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Enter your email"
            />
            <label htmlFor="password" className="text-white font-semibold">Password</label>
            <input 
                className="p-3 border border-white rounded-lg mb-4 focus:outline-none focus:border-blue-300 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Enter your password"
            />
            <button
                onClick={onSignup}
                className={`p-3 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}>
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login" className="text-white font-semibold mt-4 hover:text-blue-300 transition duration-300">
            If you already have an account, log in here.
            </Link>
        </div>
    );
    
}

export default SignupPage