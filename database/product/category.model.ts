import { models, model, Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  products: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    products: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
