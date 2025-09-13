/* eslint-disable no-unused-vars */
import React from 'react'

const UserCard = ({user}) => {
  const {firstName,lastName,photoUrl,age,gender,about}=user
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
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Intrested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
