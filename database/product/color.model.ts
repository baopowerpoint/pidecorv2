import { model, models, Schema, Document } from "mongoose";

export interface IColor extends Document {
  name: string;
  slug: string;
  hex: string;
  products: number;
}
const ColorSchema = new Schema<IColor>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    hex: { type: String, required: true },
    products: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Color = models.Color || model<IColor>("Color", ColorSchema);
export default Color;
