import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBlogService, getBlogService } from "./blogApi";

export const addBlog = createAsyncThunk("blogs/add", async (blog, thunkApi) => {
  try {
    return await addBlogService(blog);
  } catch (err) {
    console.log(err);
    const message =
      err.response && err.response.data && err.response.data.message;
    return thunkApi.rejectWithValue(message);
  }
});

export const getBlogs = createAsyncThunk("blogs/all", async (_, thunkApi) => {
  try {
    return await getBlogService();
  } catch (err) {
    console.log(err);
    const message =
      err.response && err.response.data && err.response.data.message;
    return thunkApi.rejectWithValue(message);
  }
});

const INITIAL_STATE = {
  blogs: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorsMessage: [],
  successMessage: "",
  blog: null,
  pagination: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: INITIAL_STATE,
  reducers: {
    reset(state) {
      state.errorsMessage = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.successMessage = "";
      state.blogs = [];
      state.pagination = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload.blog;
        state.successMessage = action.payload.message;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });

    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload.blogs;
        state.pagination = action.payload.pagination;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });
  },
});

export const { reset } = blogSlice.actions;

const { reducer } = blogSlice;

export default reducer;
