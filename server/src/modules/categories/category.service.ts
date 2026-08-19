import mongoose from "mongoose";

import { Product } from "../products/product.model.js";
import { Category } from "./category.model.js";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.types.js";

export const createCategory = async (
  businessId: string,
  input: CreateCategoryInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const name = input.name.trim();

  if (!name) {
    throw new Error("Category name is required");
  }

  const existingCategory = await Category.findOne({
    businessId,
    name,
  });

  if (existingCategory) {
    throw new Error(
      "Category already exists for this business"
    );
  }

  return Category.create({
    businessId,
    name,
    description: input.description,
  });
};

export const getCategories = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  return Category.find({
    businessId,
  }).sort({
    name: 1,
  });
};

export const getCategoryById = async (
  businessId: string,
  categoryId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(categoryId)) {
    throw new Error("Invalid category ID");
  }

  const category = await Category.findOne({
    _id: categoryId,
    businessId,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategory = async (
  businessId: string,
  categoryId: string,
  input: UpdateCategoryInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(categoryId)) {
    throw new Error("Invalid category ID");
  }

  const updateData = {
    ...input,
    ...(input.name
      ? {
          name: input.name.trim(),
        }
      : {}),
  };

  if (updateData.name !== undefined) {
    if (!updateData.name) {
      throw new Error("Category name cannot be empty");
    }

    const existingCategory = await Category.findOne({
      businessId,
      name: updateData.name,
      _id: { $ne: categoryId },
    });

    if (existingCategory) {
      throw new Error(
        "Category already exists for this business"
      );
    }
  }

  const category = await Category.findOneAndUpdate(
    {
      _id: categoryId,
      businessId,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const deleteCategory = async (
  businessId: string,
  categoryId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(categoryId)) {
    throw new Error("Invalid category ID");
  }

  // Prevent deleting a category that is still
  // being used by products in this business.
  const productUsingCategory = await Product.findOne({
    businessId,
    categoryId,
  });

  if (productUsingCategory) {
    throw new Error(
      "Cannot delete category because products are using it"
    );
  }

  const category = await Category.findOneAndDelete({
    _id: categoryId,
    businessId,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const getCategoryProducts = async (
  businessId: string,
  categoryId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(categoryId)) {
    throw new Error("Invalid category ID");
  }

  // Verify category belongs to current business.
  const category = await Category.findOne({
    _id: categoryId,
    businessId,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const products = await Product.find({
    businessId,
    categoryId,
  })
    .populate("categoryId", "name description")
    .sort({
      createdAt: -1,
    });

  return products;
};