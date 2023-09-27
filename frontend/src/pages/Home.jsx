import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import AddPost from "../components/AddPost";
import { getAllPosts } from "../features/post/postSlice";
import Post from "../components/Post";

const Home = () => {
  const user = useSelector((state) => state.user.value);
  const posts = useSelector((state) => state.post.value);

  return (
    <>
      <Navbar />
      <div className="text-center flex justify-center items-center">
        <AddPost />
      </div>
      <div>
        {posts.posts.map((item, index) => {
          return <Post post={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default Home;
