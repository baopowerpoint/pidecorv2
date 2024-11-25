import { Schema, model, models, Document } from "mongoose";

export interface IVisitor extends Document {
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  deviceType: string;
  page: string;
}

const VisitorSchema = new Schema(
  {
    userId: {
      type: String,
      required: false,
      default: null,
    },
    location: {
      type: {
        latitude: Number,
        longitude: Number,
      },
      required: true,
      default: null,
    },
    deviceType: {
      type: String,
      required: true,
      default: null,
    },
    page: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Visitor = models.Visitor || model("Visitor", VisitorSchema);

export default Visitor;
