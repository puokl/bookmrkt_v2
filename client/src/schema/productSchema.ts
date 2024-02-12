import { object, string, number } from "zod";

export const createProductSchema = object({
  title: string().nonempty({ message: "Title is required" }),
  author: string().nonempty({ message: "Author is required" }),
  language: string().nonempty({ message: "Language is required" }),
  user: string().optional(),
  description: string().optional(),
  condition: string().nonempty({ message: "Condition is required" }),
  location: string({
    required_error: "location is required",
  }),
  price: number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  year: string({
    required_error: "pages is required",
  }),
  pages: string({
    required_error: "pages is required",
    invalid_type_error: "pages must be a string",
  }),
  category: string({
    required_error: "category is required",
    invalid_type_error: "category must be a string",
  }),
  image: string().optional(),
});
