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
  const authorizationHeader = req.get("authorization");
  const xRefreshTokenHeader = req.get("x-refresh-token");

  const accessToken = get(req, "headers.authorization", "");

  const refreshTokens = get(req, "headers.x-refresh-token");
  // Handle the case where x-refresh may be an array
  const refreshToken = isArray(refreshTokens)
    ? refreshTokens[0]
    : refreshTokens;

  const { decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (!accessToken && refreshToken) {
    console.log("EXPIRED");
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("X-New-Access-Token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);
    res.locals.user = result.decoded;
    return next();
  }

  if (!refreshToken && !accessToken) {
    console.log("No Refresh Token", refreshToken);
    return next();
  }

  return next();
};

export default deserializeUser;
