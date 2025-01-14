import mongoose from "mongoose";

const RaportSchema = new mongoose.Schema({
  jarltech: { type: Boolean, default: false },
  jarltech_count: { type: Number, default: 0 },
  ingram_micro_24: { type: Boolean, default: false },
  ingram_micro_24_count: { type: Number, default: 0 },
  koncept_l: { type: Boolean, default: false },
  koncept_l_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

export const RaportModel =
  mongoose.models.Raport || mongoose.model("Raport", RaportSchema, "raports");
