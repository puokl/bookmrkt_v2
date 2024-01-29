import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import authService from "./authService";
import { LoginType, RegisterType } from "../../types/authServiceType";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/register", // that's the action
  async (user: RegisterType, thunkAPI) => {
    try {
      console.log("hi from authservice");
      // that's the payload that comes back from the register function
      return await authService.registerUser(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginType, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await authService.logout();
  } catch (error) {
    console.log("error on logout", error);
  }
});

// Update profile

type UpdateType = {
  avatar: { image: string };
  userId: string;
};
export const updateProfile = createAsyncThunk(
  "auth/update",
  async (data: UpdateType, thunkAPI) => {
    try {
      const { avatar, userId } = data;
      console.log("data", data);
      await authService.updateProfile(avatar, userId);
      console.log("avatar after updateProfile", avatar);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// newAccessToken when accesstoken expired
export const setAccessToken = createAsyncThunk(
  "auth/setAccessToken",
  async (newAccessToken: string, thunkAPI) => {
    return newAccessToken;
  }
);

export const selectAccessToken = (state: any) => state.auth.user?.accessToken;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message as string;
        state.user = null;
      })
      .addCase(setAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(setAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message as string;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
