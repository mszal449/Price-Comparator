import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShop extends Document {
  id: string;
  name: string;
  url: string;
  created_at: Date;
}

const ShopSchema: Schema<IShop> = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "shops" },
);

export const Shop: Model<IShop> =
  mongoose.models?.Shop || mongoose.model<IShop>("Shop", ShopSchema);
export default Shop;
