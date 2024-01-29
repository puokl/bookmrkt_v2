import axios from "axios";
import { productType } from "../../types/productType";
import * as tokenService from "../../utils/tokenService";

const headers = tokenService.setAuthHeaders();

// create new product
const createProduct = async (productData: productType) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/products`,
      productData,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    console.log("error", error.response.data);
  }
};

// get single product
const getSingleProduct = async (productId: any) => {
  const response = await axios.get(
    `${process.env.REACT_APP_ENDPOINT}/api/products/${productId}`,
    { headers }
  );
  return response.data;
};

// get all products
const getAllProduct = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_ENDPOINT}/api/products`,
    { headers }
  );
  //FIXME - fix get product controller in backend, it seems miss middleware
  console.log("RESPONSE", response);
  const newAccessToken = response.headers["x-new-access-token"];
  console.log("New Access Token:", newAccessToken);
  // return response.data;
  return response;
};

// get all product from user
// //FIXME - create new controller
// const getAllUserProduct = async () => {
//   const response = await axios.get(
//     `${process.env.REACT_APP_ENDPOINT}/api/userproducts`,

//     { withCredentials: true }
//   );
//   console.log("response", response);
//   //FIXME - fix get product controller in backend, it seems miss middleware
//   return response.data;
// };
const getAllUserProduct = async () => {
  // const accessToken = localStorage.getItem("accessToken");
  // const refreshToken = localStorage.getItem("refreshToken");
  // console.log("accessToken", accessToken);
  // console.log("refreshToken", refreshToken);

  try {
    console.log("first");
    const response = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/api/userproducts`,
      { headers }
    );
    console.log("second");
    console.log("response", response);
    // FIXME - fix get product controller in backend, it seems miss middleware
    return response.data;
  } catch (error) {
    // Handle errors, e.g., token refresh or redirect to login
    console.error("Error fetching user products:", error);
    throw error;
  }
};

// delete a product
const deleteProduct = async (productId: any) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_ENDPOINT}/api/products/${productId}`,
    { headers }
  );
  return response.data;
};

// update a single product
const updateProduct = async (productId: string, productData: productType) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_ENDPOINT}/api/products/${productId}`,
      productData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

const productService = {
  getAllProduct,
  createProduct,
  getSingleProduct,
  getAllUserProduct,
  deleteProduct,
  updateProduct,
};
export default productService;
