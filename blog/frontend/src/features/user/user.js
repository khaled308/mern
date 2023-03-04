import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserService, loginService, registerService } from "./userApi";

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      return await registerService(user);
    } catch (err) {
      console.log(err);
      const message =
        err.response && err.response.data && err.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    return await loginService(user);
  } catch (err) {
    console.log(err);
    const message =
      err.response && err.response.data && err.response.data.message;
    return thunkApi.rejectWithValue(message);
  }
});

export const getUser = createAsyncThunk("auth/info", async (_, thunkApi) => {
  try {
    return await getUserService();
  } catch (err) {
    console.log(err);
    const message =
      err.response && err.response.data && err.response.data.message;
    return thunkApi.rejectWithValue(message);
  }
});

const INITIAL_STATE = {
  user: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorsMessage: [],
  successMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    reset(state) {
      state.errorsMessage = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.successMessage = "";
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data;
        state.isSuccess = true;
        state.successMessage = action.payload?.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data;
        state.isSuccess = true;
        state.successMessage = action.payload?.message;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data;
        state.isSuccess = true;
        state.successMessage = action.payload?.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
