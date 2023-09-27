import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: null,
};
const url = "http://localhost:3000/user"; //Api url for user

export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

// Async action creator for login
export const login = (data) => async (dispatch) => {
  try {
    const user = await axios.post(`${url}/login`, data);
    // Dispatch the setUser action to store the user data
    dispatch(setUser(user.data));

    return {
      success: user.data.success,
      message: user.data.message,
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

// Async action creator for signup
export const signup = (data) => async (dispatch) => {
  try {
    const user = await axios.post(`${url}/signup`, data);
    // Dispatch the setUser action to store the user data
    dispatch(setUser(user.data));
    return {
      success: user.data.success,
      message: user.data.message,
    };
  } catch (error) {
    // Handle signup error or dispatch an error action
    console.error("Signup failed:", error);
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};

//Async action creater to get a particular user
export const getUser = (data) => async (dispatch) => {
  try {
    const result = await axios.post(`${url}/getUser`, data);
    return {
      success: result.data.success,
      message: result.data.message,
      user: result.data.user,
    };
  } catch (error) {
    console.error("Getting User failed:", error);
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};
