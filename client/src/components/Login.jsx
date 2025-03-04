// import {React,useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser,logout } from "../store/authSlice"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  
      // Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      await dispatch(loginUser({ email, password })); 
    }
  };

 // Redirect after successful login
 useEffect(() => {
  if (user) {
    navigate("/"); // Redirect to Home or Dashboard
  }
}, [user, navigate]);


  return (
    <div className='w-full min-h-screen h-full p-4 flex justify-center items-center '>

      <div className='w-full max-w-2xl ml-auto mr-auto flex sm:flex-row sm:justify-center flex-col'>
        <div className='sm:w-[40%] max-w-lg bg-amber-500 border-4 border-amber-500 p-4 flex flex-col gap-5 items-center          justify-center'>
            <h1 className='text-center font-bold text-2xl'>Hello!</h1>
            <p className='bg-black text-amber-500 w-full text-center p-1.5 rounded'>Login </p>
        </div>

        <form className='sm:w-[60%] border-4 border-amber-500 max-w-lg flex flex-col gap-5 p-5' onSubmit={handleSubmit}>
          <h1 className='p-2 text-center rounded'>Login Form</h1>
          <div className='p-2 w-full'>
            <input className='p-3 w-full bg-gray-200 outline-none rounded-full focus:bg-amber-200 text-black' 
            type="email" placeholder='Enter the email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          </div>

          <div className='p-2 w-full'>
            <input className='p-3 w-full bg-gray-200 outline-none rounded-full focus:bg-amber-200 text-black' 
            type="password" placeholder='Enter the password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          </div>

          {/* Submit Button */}
          <div className="p-2 w-full">
            <button
              type="submit"
              className="bg-black/70 transition-all duration-500 linear hover:bg-black/90 hover:scale-105 text-white font-bold w-full p-2 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

{/* Error Message */}
{error && <p className="text-center text-red-500">{error}</p>}

{/* Signup Link */}
<p className="text-center">
  Don't have an account? <Link to="/register" className="hover:text-red-500">Signup</Link>
</p>        </form>
      </div>
      
    </div>
  )
}

export default Login