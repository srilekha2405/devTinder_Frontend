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
      dispatch(addConnection(res.data.data));
    } catch (err) {
      //handling error
    }
  };

  useEffect(() => { fetchConnections() }, []);

  if (!connections) return null;
  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="bg-base-300 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No Connections Yet
          </h2>
          <p className="text-base-content/70">
            Once you connect with people, they’ll show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10 w-full">
      <div className="w-3/4">
        <h1 className="font-bold text-2xl mb-4">Connections</h1>

        <ul className="list bg-base-100 rounded-box shadow-md">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
            return (
              <li key={_id} className="list-row flex items-start gap-4 p-4 border-b bg-base-300">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-semibold">{firstName} {lastName}</div>
                  {age && gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age} years  {gender}
                    </div>
                  )}

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
