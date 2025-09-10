/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/constants"

const Login = () => {
  const [emailId, setEmailId]=useState("srilekha@gmail.com");
  const [password, setPassword]=useState("Srilekha@1234");
  const [error,setError]=useState("")
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin=async()=> {
      try{
      const res=await axios.post(BASE_URL+"/login",{
        emailId,
        password
      },{withCredentials:true}
      );
      dispatch(addUser(res.data))
      return navigate('/');
      }
      catch(err){
         setError(err?.response?.data ||"Something went wrong")
        console.error(err)
      }
      
  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title">Enter your credentials</h2>
            <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input type="email"
             className="input" 
             placeholder="Email" 
             value={emailId}
             onChange={(e)=>setEmailId(e.target.value)}/>

            <label className="label">Password</label>
            <input type="password" 
             className="input" 
             placeholder="Password" 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}/>

            <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
            <p className='text-red-500'>{error}</p>
            </fieldset>

            </div>
            <div className="card-actions justify-center">
                <button className="btn btn-primary">SignUp</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login
