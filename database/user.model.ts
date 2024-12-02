import { model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  password?: string;
  email: string;
  role: "user" | "admin";
  likes: number;
  shippingAddress: {
    phone: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
  };

  picture?: string;
}
const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: {
      type: String,
      required: false, // Password is optional (could be used if not using OAuth)
      select: false, // Password should not be returned by default
    },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true, // Mandatory
      unique: true, // Ensuring the email is unique
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"], // Email validation
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    likes: { type: Number, default: 0 },
    shippingAddress: {
      type: {
        phone: { type: String },
        province: { type: String },
        district: { type: String },
        ward: { type: String },
        detail: { type: String },
      },
      default: null,
    },
    picture: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);
export default User;
