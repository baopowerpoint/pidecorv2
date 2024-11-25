import { Document, model, Schema } from "mongoose";

export interface IPattern extends Document {
  name: string;
  slug: string;
  products: number;
}

const PatternSchema = new Schema<IPattern>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    products: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Pattern = model<IPattern>("Pattern", PatternSchema);
export default Pattern;
