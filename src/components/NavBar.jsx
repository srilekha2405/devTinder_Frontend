import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'

const NavBar = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandle=async()=>{
        try{
          await axios.post(BASE_URL+'/logout',{},{withCredentials:true});
          dispatch(removeUser());
          return navigate('/login')
        }
        // eslint-disable-next-line no-unused-vars
        catch(err){
          //error message will be displayed here
        }
  }

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/"className="btn btn-ghost text-xl">devTinder</Link>
  </div>
  <div className="flex gap-3 items-center">
    {user && <span className="text-md font-semibold items-center">Welcome {user.firstName}</span>}
    {user&&(
    <div className="dropdown dropdown-end flex">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile"className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to='/connections'>Connections</Link></li>
        <li><a onClick={logoutHandle}>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div>
    </div>
  )
}

export default NavBar
