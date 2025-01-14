import mongoose, { Schema, Document, Model } from "mongoose";
import { PriceSchema, IPrice } from "./Price";

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  prices: IPrice[];
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
    prices: { type: [PriceSchema], default: [] },
  },
  { collection: "products" },
);

export const Product: Model<IProduct> =
  mongoose.models?.Product ||
  mongoose.model<IProduct>("Product", ProductSchema, "products");
export default Product;
