import { models, model, Document, Schema, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  collections?: Types.ObjectId[];
  products: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    collections: {
      type: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
      default: null,
    },
    products: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Category =
  models?.Category || model<ICategory>("Category", CategorySchema);

export default Category;
