import { Request, Response } from "express";
import ProductModel from "../models/product.model";

export async function searchProductHandler(req: Request, res: Response) {
  try {
    const { title } = req.query;

    const agg = [
      {
        $search: {
          autocomplete: {
            query: title,
            path: "title",
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          author: 1,
          image: "$image",
          location: "$location",
          price: "$price",
          productId: 1,
        },
      },
    ];

    const response = await ProductModel.aggregate(agg);

    return res.json(response);
  } catch (error) {
    console.log("Error in searchProductHandler", error);
    return res.json([]);
  }
}
