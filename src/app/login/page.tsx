"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
      email: "",
      password: "",
     
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const onLogin = async () => {
      try {
          setLoading(true);
          const response = await axios.post("/api/users/login", user);
          console.log("Login success", response.data);
          toast.success("Login success");
          router.push("/profile");
      } catch (error:any) {
          console.log("Login failed", error.message);
          toast.error(error.message);
      } finally{
      setLoading(false);
      }
  }

  useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0) {
          setButtonDisabled(false);
      } else{
          setButtonDisabled(true);
      }
  }, [user,]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-blue-400 to-purple-500">
        <h1 className="text-4xl font-bold text-white mb-6">{loading ? "Processing" : "Login"}</h1>
        <hr className="w-1/2 border-t-2 border-white mb-6" />
        
        <label htmlFor="email" className="text-white font-semibold">Email</label>
        <input 
            className="p-3 border border-white rounded-lg mb-4 focus:outline-none focus:border-blue-300 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="Enter your email"
        />
        
        <label htmlFor="password" className="text-white font-semibold">Password</label>
        <input 
            className="p-3 border border-white rounded-lg mb-6 focus:outline-none focus:border-blue-300 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Enter your password"
        />
        
        <button
            onClick={onLogin}
            className="p-3 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Login here
        </button>
        
        <Link href="/signup" className="text-white underline mt-4 hover:text-blue-300 transition duration-300">
            <p>Don{'\''}t have an account? Sign up here.</p>
        </Link>
    </div>
  );
 
}