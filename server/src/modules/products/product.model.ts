import mongoose, {
  Document,
  Schema,
} from "mongoose";

export type ProductStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface IProduct extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  sku: string;
  categoryId?: mongoose.Types.ObjectId;
  description?: string;
  price: number;
  cost: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
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

    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    cost: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "INACTIVE",
      ],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

// SKU unique inside each business.
productSchema.index(
  {
    businessId: 1,
    sku: 1,
  },
  {
    unique: true,
  }
);

// Product search.
productSchema.index({
  businessId: 1,
  name: 1,
});

// Category filtering.
productSchema.index({
  businessId: 1,
  categoryId: 1,
});

export const Product =
  mongoose.model<IProduct>(
    "Product",
    productSchema
  );