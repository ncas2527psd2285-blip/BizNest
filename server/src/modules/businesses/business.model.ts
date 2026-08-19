import mongoose, { Document, Schema } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  type: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  logo?: string;
  currency: string;
  timezone: string;
  businessHours?: {
    day: string;
    open: string;
    close: string;
    isOpen: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const businessSchema = new Schema<IBusiness>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
    },

    currency: {
      type: String,
      default: "INR",
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    businessHours: [
      {
        day: String,
        open: String,
        close: String,
        isOpen: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Business = mongoose.model<IBusiness>(
  "Business",
  businessSchema
);