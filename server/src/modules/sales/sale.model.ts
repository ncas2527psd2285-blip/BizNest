import mongoose, {
  Document,
  Schema,
} from "mongoose";

export type SaleStatus =
  | "DRAFT"
  | "COMPLETED"
  | "CANCELLED";

export interface ISaleItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ISale extends Document {
  businessId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  invoiceNumber: string;
  status: SaleStatus;
  items: ISaleItem[];
  subtotal: number;
  notes?: string;
  completedAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const saleItemSchema =
  new Schema<ISaleItem>(
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

      unitPrice: {
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

const saleSchema = new Schema<ISale>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "DRAFT",
    },

    items: {
      type: [saleItemSchema],
      required: true,
      validate: {
        validator: (
          items: ISaleItem[]
        ) => items.length > 0,
        message:
          "Sale must contain at least one item",
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

    completedAt: {
      type: Date,
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

saleSchema.index(
  {
    businessId: 1,
    invoiceNumber: 1,
  },
  {
    unique: true,
  }
);

saleSchema.index({
  businessId: 1,
  customerId: 1,
});

saleSchema.index({
  businessId: 1,
  status: 1,
});

export const Sale =
  mongoose.model<ISale>(
    "Sale",
    saleSchema
  );