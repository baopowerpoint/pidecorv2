import { model, models, Schema, Document } from "mongoose";

export interface INotification extends Document {
  title: string;
  content: string;
  isRead: boolean;
  user: string;
  type: "order" | "promotion";
}

const NotificationSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["order", "promotion"], required: true },
  },
  { timestamps: true }
);

const Notification =
  models?.Notification || model("Notification", NotificationSchema);
export default Notification;
