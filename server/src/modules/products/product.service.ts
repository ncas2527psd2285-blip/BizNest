import mongoose from "mongoose";

import { Category } from "../categories/category.model.js";
import { Product } from "./product.model.js";
import {
  CreateProductInput,
  ProductQuery,
  UpdateProductInput,
} from "./product.types.js";

export const createProduct = async (
  businessId: string,
  input: CreateProductInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const sku = input.sku.trim().toUpperCase();

  // Check category belongs to the same business
  if (input.categoryId) {
    if (!mongoose.isValidObjectId(input.categoryId)) {
      throw new Error("Invalid category ID");
    }

    const category = await Category.findOne({
      _id: input.categoryId,
      businessId,
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  // Check duplicate SKU inside this business
  const existingProduct = await Product.findOne({
    businessId,
    sku,
  });

  if (existingProduct) {
    throw new Error("SKU already exists for this business");
  }

  const product = await Product.create({
    businessId,
    name: input.name,
    sku,
    categoryId: input.categoryId,
    description: input.description,
    price: input.price,
    cost: input.cost,
    stock: input.stock ?? 0,
    lowStockThreshold: input.lowStockThreshold ?? 5,
    status: input.status ?? "ACTIVE",
  });

  return product;
};

export const getProducts = async (
  businessId: string,
  query: ProductQuery
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const {
    search,
    categoryId,
    status,
    page,
    limit,
  } = query;

  const filter: Record<string, unknown> = {
    businessId,
  };

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        sku: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (categoryId) {
    if (!mongoose.isValidObjectId(categoryId)) {
      throw new Error("Invalid category ID");
    }

    // Make sure the category belongs to this business
    const category = await Category.findOne({
      _id: categoryId,
      businessId,
    });

    if (!category) {
      throw new Error("Category not found");
    }

    filter.categoryId = categoryId;
  }

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("categoryId", "name description")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (
  businessId: string,
  productId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(productId)) {
    throw new Error("Invalid product ID");
  }

  const product = await Product.findOne({
    _id: productId,
    businessId,
  }).populate("categoryId", "name description");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateProduct = async (
  businessId: string,
  productId: string,
  input: UpdateProductInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(productId)) {
    throw new Error("Invalid product ID");
  }

  // Validate category when categoryId is being changed
  if (input.categoryId !== undefined) {
    if (!mongoose.isValidObjectId(input.categoryId)) {
      throw new Error("Invalid category ID");
    }

    const category = await Category.findOne({
      _id: input.categoryId,
      businessId,
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  const updateData = {
    ...input,
    ...(input.sku
      ? {
          sku: input.sku.trim().toUpperCase(),
        }
      : {}),
  };

  // Check duplicate SKU inside this business
  if (updateData.sku) {
    const existingProduct = await Product.findOne({
      businessId,
      sku: updateData.sku,
      _id: { $ne: productId },
    });

    if (existingProduct) {
      throw new Error(
        "SKU already exists for this business"
      );
    }
  }

  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      businessId,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate("categoryId", "name description");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const deleteProduct = async (
  businessId: string,
  productId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(productId)) {
    throw new Error("Invalid product ID");
  }

  const product = await Product.findOneAndDelete({
    _id: productId,
    businessId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};