import mongoose from "mongoose";

import { Expense } from "./expense.model.js";
import {
  CreateExpenseInput,
  UpdateExpenseInput,
} from "./expense.types.js";

export const createExpense = async (
  businessId: string,
  createdBy: string,
  input: CreateExpenseInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(createdBy)) {
    throw new Error("Invalid user ID");
  }

  const title = input.title.trim();
  const category = input.category.trim();

  if (!title) {
    throw new Error(
      "Expense title is required"
    );
  }

  if (!category) {
    throw new Error(
      "Expense category is required"
    );
  }

  if (
    typeof input.amount !== "number" ||
    input.amount <= 0
  ) {
    throw new Error(
      "Expense amount must be greater than zero"
    );
  }

  const expenseDate = input.expenseDate
    ? new Date(input.expenseDate)
    : new Date();

  if (Number.isNaN(expenseDate.getTime())) {
    throw new Error(
      "Invalid expense date"
    );
  }

  const expense = await Expense.create({
    businessId,
    title,
    category,
    amount: input.amount,
    description:
      input.description?.trim(),
    status: "PENDING",
    expenseDate,
    createdBy:
      new mongoose.Types.ObjectId(
        createdBy
      ),
  });

  return expense;
};

export const getExpenses = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  return Expense.find({
    businessId,
  })
    .populate(
      "createdBy",
      "name email role"
    )
    .sort({
      expenseDate: -1,
      createdAt: -1,
    });
};

export const getExpenseById = async (
  businessId: string,
  expenseId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(expenseId)) {
    throw new Error("Invalid expense ID");
  }

  const expense = await Expense.findOne({
    _id: expenseId,
    businessId,
  }).populate(
    "createdBy",
    "name email role"
  );

  if (!expense) {
    throw new Error(
      "Expense not found"
    );
  }

  return expense;
};

export const updateExpense = async (
  businessId: string,
  expenseId: string,
  input: UpdateExpenseInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(expenseId)) {
    throw new Error("Invalid expense ID");
  }

  const existingExpense =
    await Expense.findOne({
      _id: expenseId,
      businessId,
    });

  if (!existingExpense) {
    throw new Error(
      "Expense not found"
    );
  }

  if (
    existingExpense.status ===
    "CANCELLED"
  ) {
    throw new Error(
      "Cancelled expense cannot be updated"
    );
  }

  const updateData: Record<
    string,
    unknown
  > = {};

  if (input.title !== undefined) {
    const title = input.title.trim();

    if (!title) {
      throw new Error(
        "Expense title is required"
      );
    }

    updateData.title = title;
  }

  if (input.category !== undefined) {
    const category =
      input.category.trim();

    if (!category) {
      throw new Error(
        "Expense category is required"
      );
    }

    updateData.category = category;
  }

  if (input.amount !== undefined) {
    if (
      typeof input.amount !== "number" ||
      input.amount <= 0
    ) {
      throw new Error(
        "Expense amount must be greater than zero"
      );
    }

    updateData.amount =
      input.amount;
  }

  if (
    input.description !== undefined
  ) {
    updateData.description =
      input.description.trim();
  }

  if (
    input.expenseDate !== undefined
  ) {
    const expenseDate =
      new Date(input.expenseDate);

    if (
      Number.isNaN(
        expenseDate.getTime()
      )
    ) {
      throw new Error(
        "Invalid expense date"
      );
    }

    updateData.expenseDate =
      expenseDate;
  }

  if (input.status !== undefined) {
    updateData.status =
      input.status;
  }

  const expense =
    await Expense.findOneAndUpdate(
      {
        _id: expenseId,
        businessId,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "createdBy",
      "name email role"
    );

  if (!expense) {
    throw new Error(
      "Expense not found"
    );
  }

  return expense;
};

export const deleteExpense = async (
  businessId: string,
  expenseId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(expenseId)) {
    throw new Error("Invalid expense ID");
  }

  const expense =
    await Expense.findOneAndDelete({
      _id: expenseId,
      businessId,
    });

  if (!expense) {
    throw new Error(
      "Expense not found"
    );
  }

  return expense;
};