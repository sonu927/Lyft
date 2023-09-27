import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //to logout user
  const clickLogout = () => {
    dispatch(logout());
    enqueueSnackbar("Logged Out!", { variant: "info" });
    navigate("/");
  };
  return (
    <div className="w-full p-4  text-white bg-slate-700">
      <div className="flex justify-between items-center">
        <div className="flex  items-center">
          <img
            className="h-10 w-auto inline-block mr-2"
            src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
            alt="Your Company"
          />
          <span className="text-2xl font-bold">
            <Link to={"/home"}>Lyft</Link>
          </span>
        </div>
        <div className="flex  items-center justify-around w-[30%] md:w-[20%]">
          <span className="text-2xl font-bold mr-2 text-emerald-300 text-center">
            <Link to={`/user/${user.user._id}`}>{user.user.name}</Link>
          </span>
          <img
            className="h-10 inline-block outline rounded-full outline-emerald-400 mr-1"
            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
            alt="user icon"
          />
          <button
            className="p-1 rounded-lg bg-emerald-500 text-base text-center"
            onClick={clickLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
