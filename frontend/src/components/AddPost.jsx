import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { addPost } from "../features/post/postSlice";
import { getAllPosts } from "../features/post/postSlice";

const AddPost = () => {
  const [caption, setCaption] = useState("");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  //to dispatch action to add new post
  const handleAddPost = async () => {
    const data = {
      caption,
      user: user.user,
    };

    const result = await dispatch(addPost(data));
    await dispatch(getAllPosts());
    if (result.success) {
      enqueueSnackbar(result.message, { variant: "success" });
      setCaption("");
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };
  return (
    <div className="mt-4 p-2 bg-slate-600 outline outline-emerald-700 rounded-md w-1/2">
      <div className="p-4 flex items-center justify-center">
        <textarea
          name="caption"
          id="caption"
          cols="25"
          rows="3"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write Post..."
          className="rounded-md focus:outline-none focus:ring focus:ring-emerald-300 focus:border-emerald-400 focus:border-b-4 w-5/6 bg-slate-300 border-b-4 border-t-0 border-l-0 border-r-0 border-slate-900 "
        ></textarea>
      </div>
      <div>
        <button
          className="p-2 bg-emerald-400 rounded-lg text-white hover:bg-emerald-700"
          onClick={handleAddPost}
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default AddPost;
