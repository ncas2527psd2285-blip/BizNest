import mongoose, { Document, Schema } from "mongoose";

export type UserRole =
  | "OWNER"
  | "ADMIN"
  | "MANAGER"
  | "EMPLOYEE"
  | "CASHIER"
  | "ACCOUNTANT"
  | "INVENTORY_MANAGER";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  businessId: mongoose.Types.ObjectId;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: [
        "OWNER",
        "ADMIN",
        "MANAGER",
        "EMPLOYEE",
        "CASHIER",
        "ACCOUNTANT",
        "INVENTORY_MANAGER",
      ],
      default: "OWNER",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index(
  { businessId: 1, email: 1 },
  { unique: true }
);

export const User = mongoose.model<IUser>("User", userSchema);