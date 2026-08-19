import mongoose from "mongoose";

import { Customer } from "../customers/customer.model.js";
import { Expense } from "../expenses/expense.model.js";
import { Product } from "../products/product.model.js";
import { PurchaseOrder } from "../purchase-orders/purchase-order.model.js";
import { Sale } from "../sales/sale.model.js";
import { Supplier } from "../suppliers/supplier.model.js";

export const getDashboard = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const [
    totalCustomers,
    totalProducts,
    totalSuppliers,
    totalSales,
    completedSales,
    draftSales,
    totalPurchaseOrders,
    lowStockProducts,
    recentSales,
    recentPurchaseOrders,
    totalExpenses,
    paidExpenses,
    pendingExpenses,
    cancelledExpenses,
  ] = await Promise.all([
    Customer.countDocuments({
      businessId,
    }),

    Product.countDocuments({
      businessId,
    }),

    Supplier.countDocuments({
      businessId,
    }),

    Sale.countDocuments({
      businessId,
    }),

    Sale.find({
      businessId,
      status: "COMPLETED",
    }),

    Sale.countDocuments({
      businessId,
      status: "DRAFT",
    }),

    PurchaseOrder.countDocuments({
      businessId,
    }),

    Product.find({
      businessId,
      status: "ACTIVE",
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
      })
      .limit(10),

    Sale.find({
      businessId,
    })
      .populate(
        "customerId",
        "name email phone company"
      )
      .sort({
        createdAt: -1,
      })
      .limit(10),

    PurchaseOrder.find({
      businessId,
    })
      .populate(
        "supplierId",
        "name company email phone"
      )
      .sort({
        createdAt: -1,
      })
      .limit(10),

    Expense.countDocuments({
      businessId,
    }),

    Expense.find({
      businessId,
      status: "PAID",
    }),

    Expense.countDocuments({
      businessId,
      status: "PENDING",
    }),

    Expense.countDocuments({
      businessId,
      status: "CANCELLED",
    }),
  ]);

  const totalRevenue =
    completedSales.reduce(
      (total, sale) =>
        total + sale.subtotal,
      0
    );

  const totalExpenseAmount =
    paidExpenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  const netProfit =
    totalRevenue - totalExpenseAmount;

  return {
    summary: {
      totalCustomers,
      totalProducts,
      totalSuppliers,

      totalSales,
      completedSales:
        completedSales.length,
      draftSales,

      totalPurchaseOrders,

      totalRevenue,

      totalExpenses,
      paidExpenses:
        paidExpenses.length,
      pendingExpenses,
      cancelledExpenses,

      totalExpenseAmount,

      netProfit,
    },

    lowStockProducts,

    recentSales,

    recentPurchaseOrders,
  };
};