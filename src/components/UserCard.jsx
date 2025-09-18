/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const {_id,firstName,lastName,photoUrl,age,gender,about}=user;
  const dispatch=useDispatch();
  const handleSendRequest=async(status,userId)=>{
    try{
      const res=await axios.post(BASE_URL+'/request/send/'+status+'/'+userId,
        {},
        {withCredentials:true}
      )
      dispatch(removeUserFromFeed(userId))
    }
    catch(err){
      //error is handled here
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
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
