/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useState } from 'react';

const UserCard = ({user}) => {
  const [toastMessage,setToastMessage]=useState("");
  const [showToast,setShowToast]=useState(false);
  const {_id,firstName,lastName,photoUrl,age,gender,about}=user;
  const dispatch=useDispatch();
  const handleSendRequest=async(status,userId)=>{
    try{
      const res=await axios.post(BASE_URL+'/request/send/'+status+'/'+userId,
        {},
        {withCredentials:true}
      )
      dispatch(removeUserFromFeed(userId))
      setToastMessage(status==='intrested'?'You are intrested in this profile':'you ignored this profile');
      setShowToast(true);
      setTimeout(()=>setShowToast(false),1000);
    }
    catch(err){
      //error is handled here
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      {showToast && (
   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-auto">
    <div className="alert alert-info shadow-lg rounded-md px-4 py-2 text-sm">
      <span>{toastMessage}</span>
    </div>
  </div>
)}

    <figure className='h-70'> 
    <img
      src={photoUrl}
      alt="photo" 
      className="object-cover h-full w-full rounded-t-xl"/>
    </figure>
    <div className="card-body">
    <h2 className="card-title">{firstName +" "+lastName}</h2>
    {age && gender && <p>{age + ','+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("intrested",_id)}>Intrested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
