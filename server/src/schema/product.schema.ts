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

const pagesEnum = z.enum([
  "1-50",
  "50-100",
  "100-200",
  "200-300",
  "300-400",
  "+400",
]);

const yearEnum = z.enum([
  "-1970",
  "1970-80",
  "1980-90",
  "1990-00",
  "2000-10",
  "2010-20",
  "2020-",
]);
const categoryEnum = z.enum([
  "novel",
  "essay",
  "sport",
  "kids",
  "biography",
  "cookbook",
  "others",
]);
const locationEnum = z.enum([
  "berlin",
  "paris",
  "milan",
  "london",
  "amsterdam",
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
    pages: pagesEnum,
    year: yearEnum,
    category: categoryEnum,
    location: locationEnum,
    userId: string().optional(),
    userName: string().optional(),
    image: string().optional(),
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
