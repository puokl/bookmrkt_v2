import { object, string } from "zod";

export const createUserSchema = object({
  name: string().nonempty({
    message: "Name is required",
  }),
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .nonempty({ message: "Password is required" }),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required",
  }),
  email: string()
    .email("Not a valid email")
    .nonempty({ message: "Email is required" }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "paswords do not match",
  path: ["passwordConfirmation"],
});
