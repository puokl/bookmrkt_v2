import { get, isArray } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

// we use this middleware to add the user to the req object

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("Request Headers:", req.headers);

  // const accessToken = get(req, "headers.authorization", "").replace(
  //   /^Bearer\s/,
  //   ""
  // );
  const authorizationHeader = req.get("authorization");
  const xRefreshTokenHeader = req.get("x-refresh-token");

  // console.log("Authorization Header:", authorizationHeader);
  // console.log("X-Refresh-Token Header:", xRefreshTokenHeader);
  const accessToken = get(req, "headers.authorization", "");
  // console.log("accessToken", get(req, "headers.authorization", ""));
  const refreshTokens = get(req, "headers.x-refresh-token");
  // Handle the case where x-refresh may be an array
  // console.log("refreshTokens", refreshTokens);
  const refreshToken = isArray(refreshTokens)
    ? refreshTokens[0]
    : refreshTokens;
  // console.log("refreshToken", refreshToken);

  const { decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    // console.log("res.locals.user with accesstoken", res.locals.user);
    return next();
  }

  if (!accessToken && refreshToken) {
    console.log("EXPIRED");
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    // console.log("newAccessToken", newAccessToken);

    if (newAccessToken) {
      // res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      res.setHeader("X-New-Access-Token", newAccessToken);
      // console.log("Response Headers:", res.getHeaders());
    }

    const result = verifyJwt(newAccessToken as string);
    // console.log("result", result);
    res.locals.user = result.decoded;
    // console.log("res.locals.user with refreshtoken", res.locals.user);

    return next();
  }

  if (!refreshToken && !accessToken) {
    console.log("No Refresh Token", refreshToken);
    return next();
  }

  return next();
};

export default deserializeUser;

// const deserializeUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const accessToken =
//     get(req, "cookies.accessToken") ||
//     get(req, "headers.authorization", "").replace(/^Bearer\s/, ""); // replace bearer with an empty string

//   const refreshToken =
//     get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

//   const { decoded } = verifyJwt(accessToken);

//   if (decoded) {
//     res.locals.user = decoded;
//     return next();
//   }
//   if (!accessToken && refreshToken) {
//     console.log("EXPIRED");
//     const newAccessToken = await reIssueAccessToken({ refreshToken }); // we check if refresh token is valid and we issue a new access toke

//     if (newAccessToken) {
//       res.setHeader("x-access-token", newAccessToken); // we set the new access token on the header
//       res.cookie("accessToken", newAccessToken, {
//         maxAge: 9000000, // 15min
//         httpOnly: true, // only accessible through http, not js. good security not provided by localstorage
//         // domain: process.env.DOMAIN,
//         path: "/",
//         sameSite: "none",
//         secure: true, // change to true in production (only https)
//       });
//     }

//     const result = verifyJwt(newAccessToken as string); // we decode that access token

//     res.locals.user = result.decoded; // we attach the user back to res.locals
//     // if they send a request with an expired access token the req flow is just going to continue as if they sent the req with a
//     // valid access token given that the refresh token was valid

//     return next();
//   }
//   if (!refreshToken) {
//     console.log("No Refresh Token", refreshToken);
//     return next();
//   }
//   return next();
// };

// export default deserializeUser;
