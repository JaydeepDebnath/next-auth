'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function VerifyEmailPage() {
    // const router = useRouter
    const [token,setToken ]= useState("")
    const [verified,setVerified] = useState(false)
    const [ error, setError ] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("api/users/verifyemail",{token})
            setVerified(true)
            setError(false)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data);
        }
    }

    useEffect (() => {
        setError(false)
        const urlToken = window.location.search.split("=")[0]
        setToken(urlToken || "")

        // const {query} = router;
        // const urlTokenTwo = query.token  // next js utilization        
    },[verifyUserEmail])


    useEffect(() => {
        setError(false)
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-blue-400 to-purple-600 text-white">

            <h1 className="text-4x font-bold mb-8">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black rounded-lg shadow-md">
                {token ? `${token}` : "no token"}</h2>

            {verified && (
                <div className='mt-8' >
                    <h2 className="text-2xl font-semibold mb-4 text-green-500">Email Verified</h2>
                    <Link href="/login" className="text-lg bg-white text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div className='mt-8'>
                    <h2 className="text-2xl font-semibold mb-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
                        Error Occurred
                    </h2>
                    <p className="text-lg text-red-200">{error}</p>
                </div>
            )}
        </div>
    )
}

