import mongoose, { Document, Schema } from "mongoose";

export type InventoryMovementType =
  | "STOCK_IN"
  | "STOCK_OUT"
  | "ADJUSTMENT";

export interface IInventoryMovement extends Document {
  businessId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  type: InventoryMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const inventoryMovementSchema =
  new Schema<IInventoryMovement>(
    {
      businessId: {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: true,
        index: true,
      },

      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        index: true,
      },

      type: {
        type: String,
        enum: [
          "STOCK_IN",
          "STOCK_OUT",
          "ADJUSTMENT",
        ],
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      previousStock: {
        type: Number,
        required: true,
        min: 0,
      },

      newStock: {
        type: Number,
        required: true,
        min: 0,
      },

      reason: {
        type: String,
        trim: true,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

inventoryMovementSchema.index({
  businessId: 1,
  productId: 1,
  createdAt: -1,
});

export const InventoryMovement =
  mongoose.model<IInventoryMovement>(
    "InventoryMovement",
    inventoryMovementSchema
  );