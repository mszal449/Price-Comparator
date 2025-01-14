import mongoose from "mongoose";

export interface IPrice {
  shop_id: string;
  shop_name: string;
  product_id: string;
  price: number;
  stock: number;
  currency: string;
  price_in_pln?: number;
  updated_at?: Date;
}

export const PriceSchema = new mongoose.Schema(
  {
    shop_id: { type: String, required: true },
    shop_name: { type: String, required: true },
    product_id: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    currency: { type: String, required: true },
    price_in_pln: { type: Number, default: 0.0 },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: "price" },
);

export const PriceModel =
  mongoose.models?.Price || mongoose.model("Price", PriceSchema);
