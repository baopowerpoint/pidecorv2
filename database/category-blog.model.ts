import { models, model, Document, Types, Schema } from "mongoose";

export interface ICategoryBlog extends Document {
  categoryId: Types.ObjectId;
  blogId: Types.ObjectId;
}

const collectionBlogSchema = new Schema<ICategoryBlog>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
});

const CategoryBlog =
  models?.CategoryBlog ||
  model<ICategoryBlog>("CategoryBlog", collectionBlogSchema);
export default CategoryBlog;
