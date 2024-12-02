import { model, models, Schema, Types } from "mongoose";

export interface IReview extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  rating: number;
  title: string;
  comment: string;
  isApproved: boolean;
}

const ReviewSchema = new Schema<IReview>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
});

const Review = models?.Review || model<IReview>("Review", ReviewSchema);
export default Review;
