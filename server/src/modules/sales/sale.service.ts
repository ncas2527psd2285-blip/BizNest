import mongoose from "mongoose";

import { Customer } from "../customers/customer.model.js";
import { InventoryMovement } from "../inventory/inventory.model.js";
import { Product } from "../products/product.model.js";

import { Sale } from "./sale.model.js";
import {
  CreateSaleInput,
  UpdateSaleInput,
} from "./sale.types.js";

const populateSale = (query: any) => {
  return query
    .populate(
      "customerId",
      "name email phone company"
    )
    .populate(
      "items.productId",
      "name sku price cost stock"
    );
};

export const createSale = async (
  businessId: string,
  createdBy: string,
  input: CreateSaleInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(createdBy)) {
    throw new Error("Invalid user ID");
  }

  if (!mongoose.isValidObjectId(input.customerId)) {
    throw new Error("Invalid customer ID");
  }

  if (!input.items || input.items.length === 0) {
    throw new Error(
      "Sale must contain at least one item"
    );
  }

  const customer = await Customer.findOne({
    _id: input.customerId,
    businessId,
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const productIds = input.items.map(
    (item) => item.productId
  );

  for (const productId of productIds) {
    if (!mongoose.isValidObjectId(productId)) {
      throw new Error("Invalid product ID");
    }
  }

  const products = await Product.find({
    _id: {
      $in: productIds,
    },
    businessId,
  });

  if (products.length !== productIds.length) {
    throw new Error(
      "One or more products not found"
    );
  }

  const items = input.items.map((item) => {
    if (
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      throw new Error(
        "Product quantity must be greater than zero"
      );
    }

    if (
      typeof item.unitPrice !== "number" ||
      item.unitPrice < 0
    ) {
      throw new Error(
        "Product unit price must be zero or greater"
      );
    }

    return {
      productId: new mongoose.Types.ObjectId(
        item.productId
      ),
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total:
        item.quantity * item.unitPrice,
    };
  });

  const subtotal = items.reduce(
    (total, item) =>
      total + item.total,
    0
  );

  const invoiceCount =
    await Sale.countDocuments({
      businessId,
    });

  const invoiceNumber =
    `INV-${String(invoiceCount + 1).padStart(5, "0")}`;

  const sale = await Sale.create({
    businessId,
    customerId: input.customerId,
    invoiceNumber,
    status: "DRAFT",
    items,
    subtotal,
    notes: input.notes?.trim(),
    createdBy: new mongoose.Types.ObjectId(
      createdBy
    ),
  });

  return populateSale(sale);
};

export const getSales = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  return populateSale(
    Sale.find({
      businessId,
    }).sort({
      createdAt: -1,
    })
  );
};

export const getSaleById = async (
  businessId: string,
  saleId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(saleId)) {
    throw new Error("Invalid sale ID");
  }

  const sale = await Sale.findOne({
    _id: saleId,
    businessId,
  });

  if (!sale) {
    throw new Error("Sale not found");
  }

  return populateSale(sale);
};

export const updateSale = async (
  businessId: string,
  saleId: string,
  input: UpdateSaleInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(saleId)) {
    throw new Error("Invalid sale ID");
  }

  const existingSale = await Sale.findOne({
    _id: saleId,
    businessId,
  });

  if (!existingSale) {
    throw new Error("Sale not found");
  }

  if (existingSale.status !== "DRAFT") {
    throw new Error(
      "Only draft sales can be updated"
    );
  }

  const sale = await Sale.findOneAndUpdate(
    {
      _id: saleId,
      businessId,
    },
    {
      $set: {
        notes: input.notes?.trim(),
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!sale) {
    throw new Error("Sale not found");
  }

  return populateSale(sale);
};

export const completeSale = async (
  businessId: string,
  saleId: string,
  createdBy: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(saleId)) {
    throw new Error("Invalid sale ID");
  }

  if (!mongoose.isValidObjectId(createdBy)) {
    throw new Error("Invalid user ID");
  }

  const sale = await Sale.findOne({
    _id: saleId,
    businessId,
  });

  if (!sale) {
    throw new Error("Sale not found");
  }

  if (sale.status === "COMPLETED") {
    throw new Error("Sale already completed");
  }

  if (sale.status === "CANCELLED") {
    throw new Error(
      "Cancelled sale cannot be completed"
    );
  }

  if (sale.status !== "DRAFT") {
    throw new Error(
      "Only draft sales can be completed"
    );
  }

  // Check stock before changing anything.
  for (const item of sale.items) {
    const product = await Product.findOne({
      _id: item.productId,
      businessId,
    });

    if (!product) {
      throw new Error(
        `Product ${item.productId} not found`
      );
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Insufficient stock for product ${product.name}`
      );
    }
  }

  // Decrease stock and create inventory movements.
  for (const item of sale.items) {
    const product = await Product.findOne({
      _id: item.productId,
      businessId,
    });

    if (!product) {
      throw new Error(
        `Product ${item.productId} not found`
      );
    }

    const previousStock = product.stock;
    const newStock =
      previousStock - item.quantity;

    product.stock = newStock;

    await product.save();

    await InventoryMovement.create({
      businessId,
      productId: product._id,
      type: "STOCK_OUT",
      quantity: item.quantity,
      previousStock,
      newStock,
      reason:
        `Sale ${sale.invoiceNumber} completed`,
      createdBy:
        new mongoose.Types.ObjectId(
          createdBy
        ),
    });
  }

  sale.status = "COMPLETED";
  sale.completedAt = new Date();

  await sale.save();

  return populateSale(sale);
};

export const cancelSale = async (
  businessId: string,
  saleId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(saleId)) {
    throw new Error("Invalid sale ID");
  }

  const sale = await Sale.findOne({
    _id: saleId,
    businessId,
  });

  if (!sale) {
    throw new Error("Sale not found");
  }

  if (sale.status === "COMPLETED") {
    throw new Error(
      "Completed sale cannot be cancelled"
    );
  }

  if (sale.status === "CANCELLED") {
    throw new Error("Sale already cancelled");
  }

  sale.status = "CANCELLED";

  await sale.save();

  return populateSale(sale);
};