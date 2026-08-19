import mongoose from "mongoose";

import { Expense } from "../expenses/expense.model.js";
import { Product } from "../products/product.model.js";
import { PurchaseOrder } from "../purchase-orders/purchase-order.model.js";
import { Sale } from "../sales/sale.model.js";

export const getNotifications = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const [
    lowStockProducts,
    outOfStockProducts,
    pendingExpenses,
    draftSales,
    draftPurchaseOrders,
  ] = await Promise.all([
    Product.find({
      businessId,
      status: "ACTIVE",
      stock: {
        $gt: 0,
      },
      $expr: {
        $lte: [
          "$stock",
          "$lowStockThreshold",
        ],
      },
    })
      .select(
        "name sku stock lowStockThreshold price"
      )
      .sort({
        stock: 1,
      }),

    Product.find({
      businessId,
      status: "ACTIVE",
      stock: 0,
    })
      .select(
        "name sku stock lowStockThreshold price"
      )
      .sort({
        name: 1,
      }),

    Expense.find({
      businessId,
      status: "PENDING",
    })
      .select(
        "title category amount expenseDate status"
      )
      .sort({
        expenseDate: 1,
      }),

    Sale.find({
      businessId,
      status: "DRAFT",
    })
      .populate(
        "customerId",
        "name email phone company"
      )
      .select(
        "invoiceNumber customerId subtotal status createdAt"
      )
      .sort({
        createdAt: -1,
      }),

    PurchaseOrder.find({
      businessId,
      status: "DRAFT",
    })
      .populate(
        "supplierId",
        "name company email phone"
      )
      .select(
        "orderNumber supplierId subtotal status createdAt"
      )
      .sort({
        createdAt: -1,
      }),
  ]);

  const notifications = [
    ...outOfStockProducts.map(
      (product) => ({
        type: "OUT_OF_STOCK",
        priority: "HIGH",
        title: "Product out of stock",
        message: `${product.name} (${product.sku}) is out of stock`,
        data: {
          productId: product._id,
          sku: product.sku,
          stock: product.stock,
        },
      })
    ),

    ...lowStockProducts.map(
      (product) => ({
        type: "LOW_STOCK",
        priority: "MEDIUM",
        title: "Low stock",
        message: `${product.name} (${product.sku}) is low on stock`,
        data: {
          productId: product._id,
          sku: product.sku,
          stock: product.stock,
          lowStockThreshold:
            product.lowStockThreshold,
        },
      })
    ),

    ...pendingExpenses.map(
      (expense) => ({
        type: "PENDING_EXPENSE",
        priority: "MEDIUM",
        title: "Pending expense",
        message: `${expense.title} requires payment`,
        data: {
          expenseId: expense._id,
          amount: expense.amount,
          category: expense.category,
          expenseDate:
            expense.expenseDate,
        },
      })
    ),

    ...draftSales.map(
      (sale) => ({
        type: "DRAFT_SALE",
        priority: "LOW",
        title: "Draft sale",
        message: `${sale.invoiceNumber} is still a draft`,
        data: {
          saleId: sale._id,
          invoiceNumber:
            sale.invoiceNumber,
          customerId:
            sale.customerId,
          subtotal: sale.subtotal,
        },
      })
    ),

    ...draftPurchaseOrders.map(
      (purchaseOrder) => ({
        type: "DRAFT_PURCHASE_ORDER",
        priority: "LOW",
        title: "Draft purchase order",
        message: `${purchaseOrder.orderNumber} is still a draft`,
        data: {
          purchaseOrderId:
            purchaseOrder._id,
          orderNumber:
            purchaseOrder.orderNumber,
          supplierId:
            purchaseOrder.supplierId,
          subtotal:
            purchaseOrder.subtotal,
        },
      })
    ),
  ];

  const priorityOrder: Record<
    string,
    number
  > = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  };

  notifications.sort(
    (a, b) =>
      priorityOrder[a.priority] -
      priorityOrder[b.priority]
  );

  return {
    summary: {
      total: notifications.length,

      outOfStock:
        outOfStockProducts.length,

      lowStock:
        lowStockProducts.length,

      pendingExpenses:
        pendingExpenses.length,

      draftSales:
        draftSales.length,

      draftPurchaseOrders:
        draftPurchaseOrders.length,
    },

    notifications,
  };
};