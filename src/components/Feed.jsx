import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
  const getFeed=async()=>{
    if(feed) return;
    try{
      const res=await axios.get(BASE_URL+'/feed',{withCredentials:true});
      dispatch(addFeed(res.data.data))
    }
    catch(err){
      console.error(err)
    }
  };
  useEffect(()=>{
    getFeed()
  },[]); 
  if(!feed) return;
  if (feed.length <= 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] px-4">
        <div className="bg-base-300 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <span className="text-6xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            You’re All Caught Up!
          </h2>
          <p className="text-base-content/70 mb-6">
            There are no more users left in your feed right now.  
            Check back later to discover more connections!
          </p>
        </div>
      </div>
    );
  }
  return (
    feed && (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed;
