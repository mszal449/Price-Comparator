import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRaport extends Document {
  jarltech: boolean;
  jarltech_count: number;
  ingram_micro_24: boolean;
  ingram_micro_24_count: number;
  koncept_l: boolean;
  koncept_l_count: number;
  created_at: Date;
}

const RaportSchema: Schema<IRaport> = new Schema(
  {
    jarltech: { type: Boolean, default: false },
    jarltech_count: { type: Number, default: 0 },
    ingram_micro_24: { type: Boolean, default: false },
    ingram_micro_24_count: { type: Number, default: 0 },
    koncept_l: { type: Boolean, default: false },
    koncept_l_count: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "raport" },
);

export const Raport: Model<IRaport> =
  mongoose.models?.Raport ||
  mongoose.model<IRaport>("Raport", RaportSchema, "raport");
export default Raport;
