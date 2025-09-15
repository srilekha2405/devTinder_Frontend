/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      console.log(res?.data?.data);
      console.log("Type:", Array.isArray(res?.data?.data));
      dispatch(addConnection(res.data.data));
    } catch (err) {
      //handling error
    }
  };

  useEffect(() => { fetchConnections() }, []);

  if (!connections) return null;
  if (connections.length === 0) return <h1>Connections not found</h1>;

  return (
    <div className="flex justify-center my-10 w-full">
      <div className="w-3/4">
        <h1 className="font-bold text-2xl mb-4">Connections</h1>

        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          </li>

          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
            return (
              <li key={_id} className="list-row flex items-start gap-4 p-4 border-b bg-base-300">
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
                    {age} years • {gender}
                  </div>
                  <p className="list-col-wrap text-xs mt-1">
                    {about}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Connections;
