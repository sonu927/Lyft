import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { useSelector } from "react-redux";

function App() {
  //Private Routing
  function PrivateOutlet() {
    const user = useSelector((state) => state.user.value);
    return user ? <Outlet /> : <Navigate to="/" />;
  }
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user/:userId" element={<PrivateOutlet />}>
        <Route path="" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
