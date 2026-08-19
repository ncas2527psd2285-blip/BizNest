import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>(
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

    company: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.index({
  businessId: 1,
  name: 1,
});

customerSchema.index({
  businessId: 1,
  email: 1,
});

export const Customer = mongoose.model<ICustomer>(
  "Customer",
  customerSchema
);