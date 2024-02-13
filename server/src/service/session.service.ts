import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

// FilterQuery is a generic that takes the sessiondocument
export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
  // .lean() means that is not going to return all the functions on the object. it just returns the plain object. similar to .toJSON()
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.deleteMany(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !decoded.session) {
    return false; // Ensure session information is present in the decoded payload
  }

  // Omitting the "exp" property from the decoded payload
  const { exp, ...payloadWithoutExp } = decoded;

  const newAccessToken = signJwt(
    { ...payloadWithoutExp, session: payloadWithoutExp.session },
    { expiresIn: "1d" }
  );
  return newAccessToken;
}
