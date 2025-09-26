/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils/constants";
import background from '../assets/background.jpg'

const Login = () => {
  const [emailId, setEmailId] = useState("srilekha@gmail.com");
  const [password, setPassword] = useState("Srilekha@1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, { withCredentials: true });
      dispatch(addUser(res.data.data))
      return navigate('/');
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.error(err)
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      navigate('/profile')
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side with background image */}
      <div className="hidden md:flex w-1/2 h-[600px]">
        <img
          src={background}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side with login form */}
      <div className="flex justify-center items-center w-full md:w-1/2 p-6 min-h-[600px]">
  <div className="card bg-base-300 w-full md:w-[90%] shadow-lg h-full">

          <div className="card-body">
            <h2 className="card-title">Enter your credentials</h2>
            <div>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                <legend className="fieldset-legend">{isLoginForm ? "Login" : "SignUp"}</legend>

                {!isLoginForm && (
                  <>
                    <label className="label">First Name</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="FirstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label className="label">Last Name</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="LastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </>
                )}

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="btn btn-neutral mt-4 w-full"
                  onClick={isLoginForm ? handleLogin : handleSignUp}
                >
                  {isLoginForm ? "Login" : "Signup"}
                </button>
                <p className='text-red-500 mt-2'>{error}</p>
              </fieldset>
            </div>

            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm
                  ? "Don't have an account? SignUp"
                  : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
