import jwt from "jsonwebtoken";
require("dotenv").config();

const privateKey: string = `${process.env.PRIVATEKEY}`;
const publicKey: string = `${process.env.PUBLICKEY}`;
const test: string = `${process.env.TEST}`;

export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
  session: string;
  iat: number;
  exp: number;
}

export interface VerifyJwtResult {
  valid: boolean;
  expired: boolean;
  decoded: User | null;
}

export function signJwt(payload: object, options?: jwt.SignOptions): string {
  return jwt.sign(payload, privateKey, options);
  // return jwt.sign(payload, privateKey, { algorithm: "HS256" });
}

export function verifyJwt(token: string): VerifyJwtResult {
  try {
    const decoded = jwt.verify(token, privateKey) as VerifyJwtResult["decoded"];
    return {
      valid: true,
      expired: false,
      decoded: decoded as VerifyJwtResult["decoded"],
    };
  } catch (error: any) {
    console.error("Error inside verifyJwt:", error.message);

    if (error.name === "TokenExpiredError") {
      return {
        valid: false,
        expired: true,
        decoded: null,
      };
    } else {
      return {
        valid: false,
        expired: false,
        decoded: null,
      };
    }
  }
}
