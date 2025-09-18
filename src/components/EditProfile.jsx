/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios'
import {BASE_URL} from '../utils/constants'
import {useDispatch} from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  const [firstName,setFirstName]=useState(user.firstName);
  const [lastName,setLastName]=useState(user.lastName);
  const [photoUrl,setPhotoUrl]=useState(user.photoUrl)
  const [gender,setGender]=useState(user.gender);
  const [age,setAge]=useState(user.age);
  const [about,setAbout]=useState(user.about);
  const [error,setError]=useState("");
  const [showToast,setShowToast]=useState(false);
  const dispatch=useDispatch();

  const saveProfile=async()=>{
    try{
      const res= await axios.patch(BASE_URL+'/profile/edit',{
        firstName,
        lastName,
        photoUrl,
        age: Number(age),
        gender,
        about
      },{withCredentials:true})
      dispatch(addUser(res?.data?.data))
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    catch(err){
      console.log(err)
      setError(err.response?.data?.error)
    }
  }


  return (
      <div>
  {showToast && (
    <div className="toast toast-top toast-end">
      <div className="alert alert-info">
        <span>Profile updated successfully!</span>
      </div>
    </div>
  )}
    <div className='flex justify-center my-2'>
      <div className="flex justify-center mx-10">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-100 border p-1">
        <legend className="fieldset-legend">Edit Profile</legend>

            <label className="label">FirstName</label>
            <input type="text" 
              className="input input-bordered input-sm w-full"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)} />

            <label className="label">LastName</label>
            <input type="text"
             className="input input-bordered input-sm w-full"
             value={lastName}
             onChange={(e)=>setLastName(e.target.value)} />

            <label className="label">PhotoUrl</label>
            <input type="text"
             className="input input-bordered input-sm w-full" 
             value={photoUrl}
             onChange={(e)=>setPhotoUrl(e.target.value)} />

            <label className="label">Gender</label>
            <input type="text" 
              className="input input-bordered input-sm w-full"
               value={gender}
               onChange={(e) => {
               setGender(e.target.value);
              setError("");   
              }}/>

            <label className="label">Age</label>
            <input type="text" 
              className="input input-bordered input-sm w-full"
              value={age} 
              onChange={(e)=>setAge(e.target.value)}/>

            <label className="label">About</label>
            <input type="text" 
              className="input input-bordered input-sm w-full"
              value={about} 
              onChange={(e)=>setAbout(e.target.value)}/>

            <button className="btn btn-primary my-1" onClick={saveProfile}>Save Profile</button>
            {error && (
            <p className="text-red-500 mt-2">{error}</p>
            )}



        </fieldset>
        </div>
      <div>
          <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
      </div>
    </div>
    </div>
  )
}

export default EditProfile
