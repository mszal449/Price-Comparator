import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPrice extends Document {
  shop_id: string;
  shop_name: string;
  shop_description: string;
  product_id: string;
  price: number;
  stock: number;
  currency: string;
  price_in_pln?: number;
  updated_at?: Date;
}

export const PriceSchema: Schema<IPrice> = new Schema(
  {
    shop_id: { type: String, required: true },
    shop_name: { type: String, required: true },
    shop_description: { type: String, required: true },
    product_id: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    currency: { type: String, required: true },
    price_in_pln: { type: Number, default: 0.0 },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: "price" },
);

export const Price: Model<IPrice> =
  mongoose.models?.Price || mongoose.model<IPrice>("Price", PriceSchema);
export default Price;
