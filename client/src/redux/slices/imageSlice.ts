import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imageService from "./imageService";

const initialState = {
  avatar: "",
  productImage: "",
  isLoading: true,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

// upload new image
export const uploadAvatar = createAsyncThunk(
  "image/avatar",
  async (image: File, thunkAPI) => {
    try {
      console.log("image", image);
      return await imageService.uploadAvatar(image);
    } catch (error: any) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error on create chat");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// upload product image
export const uploadProductImage = createAsyncThunk(
  "image/addProductImage",
  async (image: File, thunkAPI) => {
    try {
      return await imageService.uploadProductImage(image);
    } catch (error: any) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error on create chat");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(uploadProductImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProductImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productImage = action.payload;
      })
      .addCase(uploadProductImage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default imageSlice.reducer;
