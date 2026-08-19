import mongoose, {
  Document,
  Schema,
} from "mongoose";

export type PurchaseOrderStatus =
  | "DRAFT"
  | "ORDERED"
  | "RECEIVED"
  | "CANCELLED";

export interface IPurchaseOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  unitCost: number;
  total: number;
}

export interface IPurchaseOrder
  extends Document {
  businessId: mongoose.Types.ObjectId;
  supplierId: mongoose.Types.ObjectId;
  orderNumber: string;
  status: PurchaseOrderStatus;
  items: IPurchaseOrderItem[];
  subtotal: number;
  notes?: string;
  orderedAt?: Date;
  receivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const purchaseOrderItemSchema =
  new Schema<IPurchaseOrderItem>(
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      unitCost: {
        type: Number,
        required: true,
        min: 0,
      },

      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      _id: false,
    }
  );

const purchaseOrderSchema =
  new Schema<IPurchaseOrder>(
    {
      businessId: {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: true,
        index: true,
      },

      supplierId: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
        index: true,
      },

      orderNumber: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "DRAFT",
          "ORDERED",
          "RECEIVED",
          "CANCELLED",
        ],
        default: "DRAFT",
      },

      items: {
        type: [purchaseOrderItemSchema],
        required: true,
        validate: {
          validator: (
            items: IPurchaseOrderItem[]
          ) => items.length > 0,
          message:
            "Purchase order must contain at least one item",
        },
      },

      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },

      notes: {
        type: String,
        trim: true,
      },

      orderedAt: {
        type: Date,
      },

      receivedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

purchaseOrderSchema.index(
  {
    businessId: 1,
    orderNumber: 1,
  },
  {
    unique: true,
  }
);

purchaseOrderSchema.index({
  businessId: 1,
  supplierId: 1,
});

purchaseOrderSchema.index({
  businessId: 1,
  status: 1,
});

export const PurchaseOrder =
  mongoose.model<IPurchaseOrder>(
    "PurchaseOrder",
    purchaseOrderSchema
  );