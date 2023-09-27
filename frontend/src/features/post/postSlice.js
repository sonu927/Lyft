import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: [],
};

const url = "http://localhost:3000/post"; //Api url for posts

export const postSlice = createSlice({
  name: "postState",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;

//Async action for posts
export const addPost = (data) => async (dispatch) => {
  try {
    const result = await axios.post(`${url}/add`, data);

    return {
      success: result.data.success,
      message: result.data.message,
    };
  } catch (error) {
    // Handle login error or dispatch an error action
    console.error("Login failed:", error);
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};

//Reducer to get all posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const result = await axios.get(`${url}/all`);
    dispatch(setPosts(result.data));

    return {
      success: result.data.success,
      message: result.data.message,
      posts: result.data.posts,
    };
  } catch (error) {
    // Handle login error or dispatch an error action
    console.error("Login failed:", error);
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};

//Reducer to like the post
export const likePost = (data) => async (dispatch) => {
  try {
    const result = await axios.post(`${url}/like`, data);
    dispatch(getAllPosts());
    return {
      success: result.data.success,
      message: result.data.message,
      post: result.data.post,
    };
  } catch (error) {
    console.error("Liking Post failed:", error);
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};

//Reducer to add comment to post
export const addCommentToPost = (data) => async (dispatch) => {
  try {
    const result = await axios.post(`${url}/comment`, data);

    dispatch(getAllPosts());
    return {
      success: result.data.success,
      message: result.data.message,
      comment: result.data.comment,
    };
  } catch (error) {
    console.error("Adding comment failed:", error);
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};
