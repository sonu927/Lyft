import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addCommentToPost, likePost } from "../features/post/postSlice";
import { enqueueSnackbar } from "notistack";
import Comments from "./Comments";

const Post = ({ post }) => {
  const user = useSelector((state) => state.user.value);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  //To get time when was post created
  function getTimeDifferenceString(timestamp) {
    const currentTime = new Date();
    const createdAt = new Date(timestamp);

    const timeDifference = currentTime - createdAt;
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    }
  }

  //To handle when post is liked
  const handlePostLikeClick = async (postId, user) => {
    const data = {
      postId,
      user: user.user,
    };

    const result = await dispatch(likePost(data));
    if (result.success) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  //To handle adding comment to post
  const handlePostComment = async (postId, user) => {
    const data = {
      postId,
      user: user.user,
      comment: comment,
    };

    const r = await dispatch(addCommentToPost(data));

    if (r.success) {
      enqueueSnackbar(r.message, { variant: "success" });
      setComment("");
    } else {
      enqueueSnackbar(r.message, { variant: "error" });
    }
  };
  return (
    <div className="border border-gray-950 rounded-md bg-slate-700 p-4 m-4">
      <div className="flex items-center mb-2">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
          alt="user-pic"
          className="h-10 w-10"
        />
        <div className="ml-2">
          <Link
            to={`/user/${post.user._id}`}
            state={{
              user: post.user,
            }}
            className="font-semibold text-gray-200 mr-2 hover:underline"
          >
            {post.user.name}
          </Link>
          <span className="text-gray-400 text-sm">
            {getTimeDifferenceString(post.createdAt)}
          </span>
        </div>
      </div>
      <div className="text-white text-base mb-4">{post.caption}</div>

      <div className="flex border-t border-b border-gray-500 py-2">
        <div className="flex items-center text-white">
          <button
            onClick={() => handlePostLikeClick(post._id, user)}
            className="focus:outline-none"
          >
            <BiLike className="text-gray-300 text-xl" />
          </button>
          <span className="ml-1">{post.likes.length}</span>
        </div>

        <div className="ml-4 flex items-center text-white">
          <AiOutlineComment className="text-gray-300 text-xl" />
          <span className="ml-1">{post.comments.length}</span>
        </div>
      </div>

      <div className="py-2 flex">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Start typing a comment"
          className="border rounded-l-md p-2 w-full focus:outline-none bg-slate-400 text-white"
        />
        <button
          className="bg-emerald-400  text-base text-gray-600 font-semibold rounded-r-md hover:bg-emerald-600 hover:text-gray-300"
          onClick={() => handlePostComment(post._id, user)}
        >
          Add Comment
        </button>
      </div>

      <div className="py-2">
        <Comments comments={post.comments} />
      </div>
    </div>
  );
};

export default Post;
