import mongoose from "mongoose";

import { Product } from "../products/product.model.js";
import { InventoryMovement } from "./inventory.model.js";
import { StockMovementInput } from "./inventory.types.js";

export const stockIn = async (
  businessId: string,
  userId: string,
  input: StockMovementInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("Invalid user ID");
  }

  if (!mongoose.isValidObjectId(input.productId)) {
    throw new Error("Invalid product ID");
  }

  if (!Number.isInteger(input.quantity) || input.quantity <= 0) {
    throw new Error("Quantity must be a positive integer");
  }

  const product = await Product.findOne({
    _id: input.productId,
    businessId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const previousStock = product.stock;
  const newStock = previousStock + input.quantity;

  product.stock = newStock;
  await product.save();

  const movement = await InventoryMovement.create({
    businessId,
    productId: product._id,
    type: "STOCK_IN",
    quantity: input.quantity,
    previousStock,
    newStock,
    reason: input.reason,
    createdBy: userId,
  });

  return {
    product,
    movement,
  };
};

export const stockOut = async (
  businessId: string,
  userId: string,
  input: StockMovementInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("Invalid user ID");
  }

  if (!mongoose.isValidObjectId(input.productId)) {
    throw new Error("Invalid product ID");
  }

  if (!Number.isInteger(input.quantity) || input.quantity <= 0) {
    throw new Error("Quantity must be a positive integer");
  }

  const product = await Product.findOne({
    _id: input.productId,
    businessId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const previousStock = product.stock;

  if (input.quantity > previousStock) {
    throw new Error("Insufficient stock");
  }

  const newStock = previousStock - input.quantity;

  product.stock = newStock;
  await product.save();

  const movement = await InventoryMovement.create({
    businessId,
    productId: product._id,
    type: "STOCK_OUT",
    quantity: input.quantity,
    previousStock,
    newStock,
    reason: input.reason,
    createdBy: userId,
  });

  return {
    product,
    movement,
  };
};

export const getProductMovements = async (
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
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return InventoryMovement.find({
    businessId,
    productId,
  }).sort({
    createdAt: -1,
  });
};

export const getInventorySummary = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const products = await Product.find({
    businessId,
  }).sort({
    name: 1,
  });

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const lowStockProducts = products.filter(
    (product) =>
      product.stock <= product.lowStockThreshold
  );

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  );

  const inventoryValue = products.reduce(
    (total, product) =>
      total + product.stock * product.cost,
    0
  );

  return {
    totalProducts,
    totalStock,
    lowStockCount: lowStockProducts.length,
    outOfStockCount: outOfStockProducts.length,
    inventoryValue,
    lowStockProducts,
    outOfStockProducts,
  };
};