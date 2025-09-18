/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests=useSelector((store)=>store.requests);
    const dispatch=useDispatch();
    const reviewRequest=async(status,_id)=>{
      try{
        const res=axios.post(BASE_URL+'/request/review/'+status+'/'+_id,{},{withCredentials:true})
        dispatch(removeRequest(_id));
      }
      catch(err){
        //err is handled here
      }
    }
    const fetchRequests=async()=>{
        try{
        const res=await axios.get(BASE_URL+'/user/requests/received',{withCredentials:true});
        dispatch(addRequest(res.data.data))
    }
    catch(err){
        //err is handled here
    }
    }
    useEffect(()=>{fetchRequests()},[])
    
    if(!requests) return;
    if(requests.length===0) return <h1>No requests found</h1>
    
  return (
    <div>
      <div className="flex justify-center my-10 w-full">
      <div className="w-3/4">
        <h1 className="font-bold text-2xl mb-4">Requests</h1>

        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          </li>

          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
            return (
              <li key={_id} className="list-row flex justify-between items-centre gap-4 p-4 border-b bg-base-300">
                {/* Profile Picture */}
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                  />
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="font-semibold">{firstName} {lastName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {age} years {gender}
                  </div>
                  <p className="list-col-wrap text-xs mt-1">
                    {about}
                  </p>
                </div>
                <div className='display-flex'>
                <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Requests


