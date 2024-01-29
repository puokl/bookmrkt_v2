import { object, string, number } from "zod";

export const createProductSchema = object({
  title: string().nonempty({ message: "Title is required" }),
  author: string().nonempty({ message: "Author is required" }),
  language: string().nonempty({ message: "Language is required" }),
  user: string().optional(),
  description: string()
    .min(10, { message: "Description must be at least 10 characters" })
    .optional(),
  condition: string().nonempty({ message: "Condition is required" }),
  location: string().nonempty({ message: "Location is required" }),
  price: number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),

  year: number({
    required_error: "year is required",
    invalid_type_error: "year must be a number",
  }),
  pages: number({
    required_error: "pages is required",
    invalid_type_error: "pages must be a number",
  }),
});
