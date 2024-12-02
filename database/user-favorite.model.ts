import { model, models, Schema, Types } from "mongoose";

export interface IUserFavorite extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
}

const UserFavoriteSchema = new Schema<IUserFavorite>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const UserFavorite =
  models?.UserFavorite ||
  model<IUserFavorite>("UserFavorite", UserFavoriteSchema);
export default UserFavorite;
