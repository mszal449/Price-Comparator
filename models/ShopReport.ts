import mongoose, { Schema } from "mongoose";

const shopReportSchema = new Schema({
  shop_id: String,
  price_count: Number,
  success: Boolean,
  created_at: { type: Date, default: Date.now },
});

const ShopReport =
  mongoose.models?.ShopReport ||
  mongoose.model("ShopReport", shopReportSchema, "shop_reports");
export default ShopReport;
