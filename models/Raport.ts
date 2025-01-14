import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const ShopModel =
  mongoose.models?.Shop || mongoose.model("Shop", ShopSchema, "shops");
