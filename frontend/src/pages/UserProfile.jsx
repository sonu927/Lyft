import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../features/user/userSlice";
import Navbar from "../components/Navbar";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const dispatch = useDispatch();
  //user is fetched as soon as component is mounted
  useEffect(() => {
    const fetchUser = async () => {
      const data = {
        userId,
      };
      const result = await dispatch(getUser(data));
      setUser(result.user);
    };
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-slate-700 p-8 rounded-lg shadow-md w-2/5 mx-auto mt-10">
        <div className="flex items-center justify-center mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
            alt=""
            className="h-20 w-20"
          />
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-lg mb-2">Email</div>
          <div className="text-lg font-semibold text-gray-200">
            {user.email}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-lg mb-2">Name</div>
          <div className="text-lg font-semibold text-gray-200">{user.name}</div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
