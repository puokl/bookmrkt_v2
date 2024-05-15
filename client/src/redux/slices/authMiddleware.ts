import { Middleware } from "@reduxjs/toolkit";
import { setAccessToken } from "./tokenSlice";
import axios, { AxiosResponse } from "axios";

const apiMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type.endsWith("/fulfilled")) {
      const response = action.payload;
      if (response) {
        const newAccessToken = response.newAccessToken;

        if (newAccessToken) {
          sessionStorage.setItem("accessToken", newAccessToken);
          dispatch(setAccessToken(newAccessToken));
        }
      }
    }
    return next(action);
  };

export default apiMiddleware;
