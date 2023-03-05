import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addBlogService,
  deleteBlogService,
  editBlogService,
  getBlogService,
  getBlogsService,
} from "./blogApi";

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
    return await getBlogsService();
  } catch (err) {
    console.log(err);
    const message =
      err.response && err.response.data && err.response.data.message;
    return thunkApi.rejectWithValue(message);
  }
});

export const getBlog = createAsyncThunk("blogs/show", async (id, thunkApi) => {
  try {
    return await getBlogService(id);
  } catch (err) {
    console.log(err);
    const message =
      err.response && err.response.data && err.response.data.message;
    return thunkApi.rejectWithValue(message);
  }
});

export const editBlog = createAsyncThunk(
  "blogs/edit",
  async ({ id, blog }, thunkApi) => {
    try {
      return await editBlogService(id, blog);
    } catch (err) {
      console.log(err);
      const message =
        err.response && err.response.data && err.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id, thunkApi) => {
    try {
      return await deleteBlogService(id);
    } catch (err) {
      console.log(err);
      const message =
        err.response && err.response.data && err.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const INITIAL_STATE = {
  blogs: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorsMessage: [],
  successMessage: "",
  blog: {},
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

    builder
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload.blog;
        state.successMessage = action.payload.message;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });

    builder
      .addCase(editBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload.blog;
        state.successMessage = action.payload.message;
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });

    builder
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });
  },
});

export const { reset } = blogSlice.actions;

const { reducer } = blogSlice;

export default reducer;
