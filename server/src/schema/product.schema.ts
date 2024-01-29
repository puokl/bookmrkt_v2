import { object, number, string, TypeOf, union, z } from "zod";

const conditionEnum = z.enum([
  "brand new",
  "like new",
  "very good",
  "good",
  "acceptable",
  "poor",
]);
const languageEnum = z.enum([
  "IT",
  "EN",
  "ES",
  "PT",
  "FR",
  "DE",
  "NL",
  "other",
]);

const payload = {
  body: object({
    title: string({ required_error: "Title is required" }),
    description: string({ required_error: "Description is required" }).min(
      10,
      "Description should be at least 10 characters long"
    ),
    price: number({ required_error: "Price is required" }),
    author: string({ required_error: "Author is required" }),
    condition: conditionEnum,
    language: languageEnum,

    // condition: string({ required_error: "Condition is required" }),
    // language: string({ required_error: "Language is required" }),
    image: string().optional(),
    pages: number({ required_error: "Pages is required" }),
    year: number({ required_error: "Year is required" }),
    userId: string().optional(),
    userName: string().optional(),
    location: string().optional(),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
