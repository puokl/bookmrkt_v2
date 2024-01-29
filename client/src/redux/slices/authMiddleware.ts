// import { Middleware } from "@reduxjs/toolkit";
// import { setAccessToken } from "./authSlice";
// import { AnyAction } from "redux";
// import { isFulfilled, isRejected } from "@reduxjs/toolkit";

// interface PayloadWithHeaders {
//   headers?: Record<string, string>;
//   // other properties as needed
// }

// const accessTokenMiddleware: Middleware =
//   (store) => (next) => (action: AnyAction) => {
//     if (setAccessToken.fulfilled.match(action)) {
//       const newAccessToken = action.payload;

//       // Save the new access token to sessionStorage
//       sessionStorage.setItem("accessToken", newAccessToken);
//     } else if (
//       isFulfilled(action) &&
//       (action.payload as PayloadWithHeaders)?.headers
//     ) {
//       const { headers } = action.payload as PayloadWithHeaders;

//       // Check for the X-New-Access-Token header
//       if (headers && headers["X-New-Access-Token"]) {
//         const newAccessToken = headers["X-New-Access-Token"];

//         // Save the new access token to sessionStorage
//         sessionStorage.setItem("accessToken", newAccessToken);
//       }

//       // Check for other headers as needed
//     } else if (isRejected(action)) {
//       // Handle rejection if needed
//     }

//     return next(action);
//   };

// export default accessTokenMiddleware;

import { Middleware } from "@reduxjs/toolkit";
import { setAccessToken } from "./tokenSlice";
import axios, { AxiosResponse } from "axios";

const apiMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    console.log("first");
    if (action.type.endsWith("/fulfilled")) {
      // Assuming that the payload is the Axios response
      const response = action.payload;

      console.log("second", response);

      // Check if the response is defined and contains the headers property
      if (response) {
        console.log("third");

        const newAccessToken = response.newAccessToken;

        if (newAccessToken) {
          console.log("inside authmiddleware token", newAccessToken);
          // Dispatch an action to set the new access token in the state
          sessionStorage.setItem("accessToken", newAccessToken);
          dispatch(setAccessToken(newAccessToken));
        }
      }
    }

    // Continue with the action
    return next(action);
  };

export default apiMiddleware;
