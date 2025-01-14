import mongoose from "mongoose";
import { PriceSchema } from "./price";

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
    prices: { type: [PriceSchema], default: [] },
  },
  { collection: "products" },
);

export const Product =
  mongoose.models?.Product ||
  mongoose.model("product", ProductSchema, "products");
