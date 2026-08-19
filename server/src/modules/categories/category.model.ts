import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index(
  { businessId: 1, name: 1 },
  { unique: true }
);

export const Category = mongoose.model<ICategory>(
  "Category",
  categorySchema
);