import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // 🔹 Load from localStorage
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};


// Async action for user login
export const loginUser = createAsyncThunk(
    "auth/loginUser", 
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://shopistyle-backend.vercel.app/api/v1/users/login", userData);
            localStorage.setItem("user", JSON.stringify(response.data.user)); // 
            localStorage.setItem("token", response.data.accesstoken); // 
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
    }
});


// Async action for user fetch user
export const fetchUser = createAsyncThunk("auth/fetchUser", async ({ getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) return rejectWithValue("No token found");
  try {
      const headers = {Authorization:`Bearer ${token}`};
      const response = await axios.get("https://shopistyle-backend.vercel.app/api/v1/users/profile",headers);
      return response.data.user;
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
});


// Async function for registering user
export const registerUser = createAsyncThunk("auth/registerUser", async (userdata,{rejectWithValue})=>{
  try {
    const headers = {"Content-Type":"application/json"};
    const response = await axios.post("https://shopistyle-backend.vercel.app/api/v1/users/register",userdata,headers)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data || "Signup failed")
  }

})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accesstoken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
