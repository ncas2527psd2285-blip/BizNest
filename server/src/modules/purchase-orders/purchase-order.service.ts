import mongoose from "mongoose";

import { InventoryMovement } from "../inventory/inventory.model.js";
import { Product } from "../products/product.model.js";
import { Supplier } from "../suppliers/supplier.model.js";

import { PurchaseOrder } from "./purchase-order.model.js";

import {
  CreatePurchaseOrderInput,
  UpdatePurchaseOrderInput,
} from "./purchase-order.types.js";

const populatePurchaseOrder = (query: any) => {
  return query
    .populate(
      "supplierId",
      "name company email phone"
    )
    .populate(
      "items.productId",
      "name sku price cost stock"
    );
};

export const createPurchaseOrder = async (
  businessId: string,
  input: CreatePurchaseOrderInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (
    !mongoose.isValidObjectId(input.supplierId)
  ) {
    throw new Error("Invalid supplier ID");
  }

  if (
    !input.items ||
    input.items.length === 0
  ) {
    throw new Error(
      "Purchase order must contain at least one item"
    );
  }

  const supplier = await Supplier.findOne({
    _id: input.supplierId,
    businessId,
  });

  if (!supplier) {
    throw new Error("Supplier not found");
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
      typeof item.unitCost !== "number" ||
      item.unitCost < 0
    ) {
      throw new Error(
        "Product unit cost must be zero or greater"
      );
    }

    return {
      productId: new mongoose.Types.ObjectId(
        item.productId
      ),
      quantity: item.quantity,
      unitCost: item.unitCost,
      total:
        item.quantity * item.unitCost,
    };
  });

  const subtotal = items.reduce(
    (total, item) =>
      total + item.total,
    0
  );

  const orderCount =
    await PurchaseOrder.countDocuments({
      businessId,
    });

  const orderNumber =
    `PO-${String(orderCount + 1).padStart(5, "0")}`;

  const purchaseOrder =
    await PurchaseOrder.create({
      businessId,
      supplierId: input.supplierId,
      orderNumber,
      status: "DRAFT",
      items,
      subtotal,
      notes: input.notes?.trim(),
    });

  return populatePurchaseOrder(
    purchaseOrder
  );
};

export const getPurchaseOrders = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  return populatePurchaseOrder(
    PurchaseOrder.find({
      businessId,
    }).sort({
      createdAt: -1,
    })
  );
};

export const getPurchaseOrderById =
  async (
    businessId: string,
    purchaseOrderId: string
  ) => {
    if (
      !mongoose.isValidObjectId(
        businessId
      )
    ) {
      throw new Error(
        "Invalid business ID"
      );
    }

    if (
      !mongoose.isValidObjectId(
        purchaseOrderId
      )
    ) {
      throw new Error(
        "Invalid purchase order ID"
      );
    }

    const purchaseOrder =
      await PurchaseOrder.findOne({
        _id: purchaseOrderId,
        businessId,
      });

    if (!purchaseOrder) {
      throw new Error(
        "Purchase order not found"
      );
    }

    return populatePurchaseOrder(
      purchaseOrder
    );
  };

export const updatePurchaseOrder =
  async (
    businessId: string,
    purchaseOrderId: string,
    input: UpdatePurchaseOrderInput
  ) => {
    if (
      !mongoose.isValidObjectId(
        businessId
      )
    ) {
      throw new Error(
        "Invalid business ID"
      );
    }

    if (
      !mongoose.isValidObjectId(
        purchaseOrderId
      )
    ) {
      throw new Error(
        "Invalid purchase order ID"
      );
    }

    const existingOrder =
      await PurchaseOrder.findOne({
        _id: purchaseOrderId,
        businessId,
      });

    if (!existingOrder) {
      throw new Error(
        "Purchase order not found"
      );
    }

    if (
      existingOrder.status !== "DRAFT"
    ) {
      throw new Error(
        "Only draft purchase orders can be updated"
      );
    }

    const purchaseOrder =
      await PurchaseOrder.findOneAndUpdate(
        {
          _id: purchaseOrderId,
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

    if (!purchaseOrder) {
      throw new Error(
        "Purchase order not found"
      );
    }

    return populatePurchaseOrder(
      purchaseOrder
    );
  };

export const deletePurchaseOrder =
  async (
    businessId: string,
    purchaseOrderId: string
  ) => {
    if (
      !mongoose.isValidObjectId(
        businessId
      )
    ) {
      throw new Error(
        "Invalid business ID"
      );
    }

    if (
      !mongoose.isValidObjectId(
        purchaseOrderId
      )
    ) {
      throw new Error(
        "Invalid purchase order ID"
      );
    }

    const existingOrder =
      await PurchaseOrder.findOne({
        _id: purchaseOrderId,
        businessId,
      });

    if (!existingOrder) {
      throw new Error(
        "Purchase order not found"
      );
    }

    if (
      existingOrder.status !== "DRAFT"
    ) {
      throw new Error(
        "Only draft purchase orders can be deleted"
      );
    }

    await PurchaseOrder.deleteOne({
      _id: purchaseOrderId,
      businessId,
    });
  };

export const markPurchaseOrderOrdered =
  async (
    businessId: string,
    purchaseOrderId: string
  ) => {
    if (
      !mongoose.isValidObjectId(
        businessId
      )
    ) {
      throw new Error(
        "Invalid business ID"
      );
    }

    if (
      !mongoose.isValidObjectId(
        purchaseOrderId
      )
    ) {
      throw new Error(
        "Invalid purchase order ID"
      );
    }

    const purchaseOrder =
      await PurchaseOrder.findOne({
        _id: purchaseOrderId,
        businessId,
      });

    if (!purchaseOrder) {
      throw new Error(
        "Purchase order not found"
      );
    }

    if (
      purchaseOrder.status !== "DRAFT"
    ) {
      throw new Error(
        "Only draft purchase orders can be marked as ordered"
      );
    }

    purchaseOrder.status = "ORDERED";
    purchaseOrder.orderedAt = new Date();

    await purchaseOrder.save();

    return populatePurchaseOrder(
      purchaseOrder
    );
  };

export const receivePurchaseOrder =
  async (
    businessId: string,
    purchaseOrderId: string,
    createdBy: string
  ) => {
    if (
      !mongoose.isValidObjectId(
        businessId
      )
    ) {
      throw new Error(
        "Invalid business ID"
      );
    }

    if (
      !mongoose.isValidObjectId(
        purchaseOrderId
      )
    ) {
      throw new Error(
        "Invalid purchase order ID"
      );
    }

    if (
      !mongoose.isValidObjectId(
        createdBy
      )
    ) {
      throw new Error(
        "Invalid user ID"
      );
    }

    const purchaseOrder =
      await PurchaseOrder.findOne({
        _id: purchaseOrderId,
        businessId,
      });

    if (!purchaseOrder) {
      throw new Error(
        "Purchase order not found"
      );
    }

    if (
      purchaseOrder.status === "RECEIVED"
    ) {
      throw new Error(
        "Purchase order already received"
      );
    }

    if (
      purchaseOrder.status === "CANCELLED"
    ) {
      throw new Error(
        "Cancelled purchase order cannot be received"
      );
    }

    if (
      purchaseOrder.status !== "ORDERED"
    ) {
      throw new Error(
        "Only ordered purchase orders can be received"
      );
    }

    for (const item of purchaseOrder.items) {
      const product = await Product.findOne({
        _id: item.productId,
        businessId,
      });

      if (!product) {
        throw new Error(
          `Product ${item.productId} not found`
        );
      }

      const previousStock =
        product.stock;

      const newStock =
        previousStock + item.quantity;

      product.stock = newStock;

      await product.save();

      await InventoryMovement.create({
        businessId,
        productId: product._id,
        type: "STOCK_IN",
        quantity: item.quantity,
        previousStock,
        newStock,
        reason:
          `Received purchase order ${purchaseOrder.orderNumber}`,
        createdBy:
          new mongoose.Types.ObjectId(
            createdBy
          ),
      });
    }

    purchaseOrder.status = "RECEIVED";
    purchaseOrder.receivedAt = new Date();

    await purchaseOrder.save();

    return populatePurchaseOrder(
      purchaseOrder
    );
  };