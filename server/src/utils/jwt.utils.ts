import jwt from "jsonwebtoken";
require("dotenv").config();

const privateKey: string = `${process.env.PRIVATEKEY}`;
const publicKey: string = `${process.env.PUBLICKEY}`;
const test: string = `${process.env.TEST}`;
export function signJwt(payload: object, options?: jwt.SignOptions): string {
  // const privateKey: string = process.env.PRIVATEKEY || "your-private-key";
  console.log("privateKey inside signjwt", privateKey);
  return jwt.sign(payload, privateKey, options);
  // return jwt.sign(payload, privateKey, { algorithm: "HS256" });
}

// export function verifyJwt(token: string) {
//   try {
//     console.log("token", token);
//     console.log("privateKey", privateKey);
//     console.log("publicKey", publicKey);
//     console.log("test", test);
//     const decoded = jwt.verify(token, privateKey);
//     console.log("no decoded");

//     return {
//       valid: true,
//       expired: false,
//       decoded,
//     };
//   } catch (error: any) {
//     console.error("Error inside verifyJwt:", error.message);

//     if (error.name === "TokenExpiredError") {
//       return {
//         valid: false,
//         expired: true,
//         decoded: null,
//       };
//     } else {
//       return {
//         valid: false,
//         expired: false,
//         decoded: null,
//       };
//     }
//   }
// }

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

// export interface Session {
//   _id: string;
// }

export interface VerifyJwtResult {
  valid: boolean;
  expired: boolean;
  decoded: User | null;
}

export function verifyJwt(token: string): VerifyJwtResult {
  try {
    // console.log("TOKEN", token);
    // console.log("PRIVATEKEY", privateKey);
    const decoded = jwt.verify(token, privateKey) as VerifyJwtResult["decoded"];

    // console.log("decoded inside verifyjwt", decoded);

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
