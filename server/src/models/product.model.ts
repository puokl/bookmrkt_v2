import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ProductInput {
  userId: UserDocument["_id"];
  username?: string;
  title: string;
  author: string;
  description: string;
  price: number;
  image?: string;
  pages: string;
  language: string;
  year: string;
  location?: string;
  condition: string;
  category?: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    author: { type: String, requiredì: true },
    // condition: { type: String, required: true },
    condition: {
      type: String,
      required: true,
      enum: [
        "brand new",
        "like new",
        "very good",
        "good",
        "acceptable",
        "poor",
      ],
      default: "good",
    },

    // language: { type: String, required: true },
    language: {
      type: String,
      required: true,
      enum: ["IT", "EN", "ES", "PT", "FR", "DE", "NL", "other"],
      default: "EN",
    },
    image: { type: String, required: false },
    // pages: { type: Number, required: true },
    pages: {
      type: String,
      required: true,
      enum: ["1-50", "50-100", "100-200", "200-300", "300-400", "+400"],
      default: "1-50",
    },
    // year: { type: Number, required: true },
    year: {
      type: String,
      required: true,
      enum: [
        "-1970",
        "1970-80",
        "1980-90",
        "1990-00",
        "2000-10",
        "2010-20",
        "2020-",
      ],
      default: "2020-",
    },
    location: {
      type: String,
      required: true,
      enum: ["berlin", "paris", "milan", "london", "amsterdam"],
      default: "berlin",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "novel",
        "essay",
        "sport",
        "kids",
        "biography",
        "cookbook",
        "others",
      ],
      default: "novel",
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
