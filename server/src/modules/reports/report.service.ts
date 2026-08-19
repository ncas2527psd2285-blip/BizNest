import mongoose from "mongoose";

import { Expense } from "../expenses/expense.model.js";
import { Product } from "../products/product.model.js";
import { PurchaseOrder } from "../purchase-orders/purchase-order.model.js";
import { Sale } from "../sales/sale.model.js";

const getDateRange = (
  startDate?: string,
  endDate?: string
) => {
  const filter: Record<string, Date> = {};

  if (startDate) {
    const start = new Date(startDate);

    if (Number.isNaN(start.getTime())) {
      throw new Error("Invalid start date");
    }

    start.setHours(0, 0, 0, 0);
    filter.$gte = start;
  }

  if (endDate) {
    const end = new Date(endDate);

    if (Number.isNaN(end.getTime())) {
      throw new Error("Invalid end date");
    }

    end.setHours(23, 59, 59, 999);
    filter.$lte = end;
  }

  return filter;
};

export const getReportSummary = async (
  businessId: string,
  startDate?: string,
  endDate?: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const dateFilter = getDateRange(
    startDate,
    endDate
  );

  const saleFilter: Record<string, unknown> = {
    businessId,
    status: "COMPLETED",
  };

  const expenseFilter: Record<string, unknown> = {
    businessId,
    status: "PAID",
  };

  const purchaseOrderFilter: Record<
    string,
    unknown
  > = {
    businessId,
    status: "RECEIVED",
  };

  if (Object.keys(dateFilter).length > 0) {
    saleFilter.completedAt = dateFilter;
    expenseFilter.expenseDate = dateFilter;
    purchaseOrderFilter.receivedAt =
      dateFilter;
  }

  const [
    sales,
    expenses,
    purchaseOrders,
  ] = await Promise.all([
    Sale.find(saleFilter),

    Expense.find(expenseFilter),

    PurchaseOrder.find(
      purchaseOrderFilter
    ),
  ]);

  const revenue = sales.reduce(
    (total, sale) =>
      total + sale.subtotal,
    0
  );

  const expenseAmount =
    expenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  const purchaseAmount =
    purchaseOrders.reduce(
      (total, purchaseOrder) =>
        total + purchaseOrder.subtotal,
      0
    );

  return {
    period: {
      startDate:
        startDate ?? null,
      endDate:
        endDate ?? null,
    },

    sales: {
      count: sales.length,
      revenue,
    },

    expenses: {
      count: expenses.length,
      amount: expenseAmount,
    },

    purchases: {
      count: purchaseOrders.length,
      amount: purchaseAmount,
    },

    financial: {
      grossRevenue: revenue,
      expenses: expenseAmount,
      netProfit:
        revenue - expenseAmount,
      purchaseCost: purchaseAmount,
    },
  };
};

export const getSalesReport = async (
  businessId: string,
  startDate?: string,
  endDate?: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const dateFilter = getDateRange(
    startDate,
    endDate
  );

  const filter: Record<string, unknown> = {
    businessId,
    status: "COMPLETED",
  };

  if (Object.keys(dateFilter).length > 0) {
    filter.completedAt = dateFilter;
  }

  const sales = await Sale.find(filter)
    .populate(
      "customerId",
      "name email phone company"
    )
    .populate(
      "items.productId",
      "name sku"
    )
    .sort({
      completedAt: -1,
    });

  const revenue = sales.reduce(
    (total, sale) =>
      total + sale.subtotal,
    0
  );

  const productSales: Record<
    string,
    {
      productId: string;
      quantity: number;
      revenue: number;
    }
  > = {};

  for (const sale of sales) {
    for (const item of sale.items) {
      const productId =
        item.productId.toString();

      if (!productSales[productId]) {
        productSales[productId] = {
          productId,
          quantity: 0,
          revenue: 0,
        };
      }

      productSales[productId].quantity +=
        item.quantity;

      productSales[productId].revenue +=
        item.total;
    }
  }

  return {
    count: sales.length,
    revenue,
    sales,
    productSummary:
      Object.values(productSales),
  };
};

export const getExpensesReport = async (
  businessId: string,
  startDate?: string,
  endDate?: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const dateFilter = getDateRange(
    startDate,
    endDate
  );

  const filter: Record<string, unknown> = {
    businessId,
    status: "PAID",
  };

  if (Object.keys(dateFilter).length > 0) {
    filter.expenseDate = dateFilter;
  }

  const expenses = await Expense.find(
    filter
  )
    .populate(
      "createdBy",
      "name email role"
    )
    .sort({
      expenseDate: -1,
    });

  const total = expenses.reduce(
    (sum, expense) =>
      sum + expense.amount,
    0
  );

  const categorySummary: Record<
    string,
    number
  > = {};

  for (const expense of expenses) {
    categorySummary[expense.category] =
      (categorySummary[
        expense.category
      ] ?? 0) + expense.amount;
  }

  return {
    count: expenses.length,
    total,
    expenses,
    categorySummary,
  };
};

export const getInventoryReport = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const products = await Product.find({
    businessId,
    status: "ACTIVE",
  })
    .select(
      "name sku categoryId price cost stock lowStockThreshold status"
    )
    .populate(
      "categoryId",
      "name"
    )
    .sort({
      stock: 1,
    });

  const totalProducts =
    products.length;

  const lowStockProducts =
    products.filter(
      (product) =>
        product.stock <=
        product.lowStockThreshold
    );

  const outOfStockProducts =
    products.filter(
      (product) =>
        product.stock === 0
    );

  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      product.stock * product.cost,
    0
  );

  const potentialSalesValue =
    products.reduce(
      (total, product) =>
        total +
        product.stock * product.price,
      0
    );

  return {
    totalProducts,

    inventoryValue,

    potentialSalesValue,

    lowStockCount:
      lowStockProducts.length,

    outOfStockCount:
      outOfStockProducts.length,

    lowStockProducts,

    outOfStockProducts,
  };
};