"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/profile')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-green-400 to-blue-500">
            <h1 className="text-4xl font-bold text-white mb-6">Profile</h1>
            <hr className="w-1/2 border-t-2 border-white mb-6" />
            <p className="text-white text-lg mb-4">Profile page</p>
            
            <h2 className="p-2 rounded-lg bg-green-600 text-white font-semibold text-lg mb-4">
                {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`} className="underline hover:text-blue-300 transition duration-300">{data}</Link>}
            </h2>
            
            <hr className="w-1/2 border-t-2 border-white mb-6" />
            
            <button
                onClick={logout}
                className="bg-blue-600 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Logout
            </button>
    
            <button
                onClick={getUserDetails}
                className="bg-green-700 mt-4 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Get User Details
            </button>
        </div>
    );
    
}