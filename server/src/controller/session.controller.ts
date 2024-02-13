import { CookieOptions, Request, Response } from "express";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
  validatePassword,
} from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";

// @desc    Create a user's session
// @route   POST /api/sessions
// @access  Private
export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    // 1. validate the user's password
    const user = await validatePassword(req.body);
    if (!user) {
      console.log("no user in create session handler");
      return res.status(401).send("Invalid email or password");
    }

    // 2. create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // 3. create an access token
    const accessToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      { expiresIn: process.env.ACCESSTOKENTTL || "1d" } // 1 day
    );

    // 4. create a refresh token
    const refreshToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      { expiresIn: process.env.REFRESHTOKENTTL || "1y" } // 1 year
    );

    // Set CORS headers to allow requests from the frontend
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials

    // 5. return access & refresh tokens
    return res.json({ accessToken, refreshToken, user });
  } catch (error) {
    console.error("Error in createUserSessionHandler:", error);
    return res.status(500).send("Internal Server Error");
  }
}

// @desc    Get user's session
// @route   GET /api/products/:productId
// @access  Public
export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

// @desc    Delete a session
// @route   DELETE /api/sessions
// @access  Private
export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  //ANCHOR - since user somehow can have multiple session (to fix), i loop through all the user'session and delete them all,
  //get array of sessions
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  const sessionIds = [];
  for (const session of sessions) {
    if (session.user.equals(userId)) {
      sessionIds.push(session._id);
    }
  }

  const sessionIdsStr = sessionIds.map((id) => id.toString());
  //ANCHOR -

  // Clear the access token and refresh token cookies

  // res.clearCookie("accessToken", accessTokenCookieOptions);
  // res.clearCookie("refreshToken", refreshTokenCookieOptions);

  await updateSession({ _id: sessionIdsStr }, { valid: false });
  // we're not deleting the session, but turn it to false
  // we're deleting all the session linked to a single user
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
