import { Document, model, models, Schema } from "mongoose";

export interface IMaterial extends Document {
  name: string;
  slug: string;
  image: string;
  products: number;
}

const MaterialSchema = new Schema<IMaterial>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    products: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Mateial = models.Material || model<IMaterial>("Material", MaterialSchema);
export default Mateial;
