import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

export const getPosts = createAsyncThunk(
  "posts/getposts",
  async (payload, thunkApi) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const getPost = createAsyncThunk(
  "posts/getpost",
  async (payload, thunkApi) => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/" + payload
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    resetState: (state) => {
      state.posts = [];
      state.post = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.isSuccess = true;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getPost.pending, (state, action) => {
        state.post = null;
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { resetState } = postSlice.actions;

export default postSlice.reducer;
