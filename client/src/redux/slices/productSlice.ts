import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { productType } from "../../types/productType";
import { parametriType } from "../../components/EditProductForm";

const initialState = {
  product: [] as productType[],
  products: [],
  isLoading: true,
  isError: false,
  isSuccess: false,
  message: "",
  newAccessToken: null,
};

// create new product
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData: productType, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
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

// get single product
export const getSingleProduct = createAsyncThunk(
  "product/getSingle",
  async (productId: string, thunkAPI) => {
    try {
      return await productService.getSingleProduct(productId);
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

// get all products
export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      // return await productService.getAllProduct();
      const response = await productService.getAllProduct();
      const newAccessToken = response.headers["x-new-access-token"];

      // Return only the necessary information (in this case, the new access token)
      return { data: response.data, newAccessToken };
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

// get all products from user
export const getAllUserProduct = createAsyncThunk(
  "product/getAllUserProduct",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllUserProduct();
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
// delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: string, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(productId);

      return { response, productId };
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update a product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ parametri }: { parametri: parametriType }, thunkAPI) => {
    try {
      const { productID, data } = parametri;
      const response = await productService.updateProduct(productID, data);
      return response;
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.product = action.payload as productType[];
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.data;
        state.newAccessToken = action.payload.newAccessToken;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllUserProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllUserProduct.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const ID = parseInt(action.payload.productId);
        state.isLoading = false;
        state.isSuccess = true;
        state.product = state.product.filter((item) => item.productId !== ID);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export default productSlice.reducer;
