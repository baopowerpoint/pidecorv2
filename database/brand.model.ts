import { Schema, model, models, Document } from "mongoose";

export interface IBrand extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  website?: string;
  products: number;
}

const BrandSchema = new Schema<IBrand>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  website: { type: String },
  products: { type: Number, default: 0 },
});
const Brand = models?.Brand || model<IBrand>("Brand", BrandSchema);
export default Brand;
