import mongoose, {
  Document,
  Schema,
} from "mongoose";

export type ExpenseStatus =
  | "PENDING"
  | "PAID"
  | "CANCELLED";

export interface IExpense extends Document {
  businessId: mongoose.Types.ObjectId;
  title: string;
  category: string;
  amount: number;
  description?: string;
  status: ExpenseStatus;
  expenseDate: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema =
  new Schema<IExpense>(
    {
      businessId: {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: true,
        index: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      description: {
        type: String,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "PAID",
          "CANCELLED",
        ],
        default: "PENDING",
      },

      expenseDate: {
        type: Date,
        required: true,
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

expenseSchema.index({
  businessId: 1,
  expenseDate: -1,
});

expenseSchema.index({
  businessId: 1,
  category: 1,
});

expenseSchema.index({
  businessId: 1,
  status: 1,
});

export const Expense =
  mongoose.model<IExpense>(
    "Expense",
    expenseSchema
  );