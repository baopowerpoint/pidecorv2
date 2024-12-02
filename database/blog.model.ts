import { Types, models, model, Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  slug: string;
  thumbnail: string;
  description: string;
  tags: Types.ObjectId[];
  author: Types.ObjectId;
  views: number;
  likes: number;
}

const BlogSchema = new Schema<IBlog>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    slug: { type: String, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Blog = models?.Blog || model<IBlog>("Blog", BlogSchema);
export default Blog;
