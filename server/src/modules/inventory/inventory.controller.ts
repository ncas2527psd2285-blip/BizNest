import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  getInventorySummary,
  getProductMovements,
  stockIn,
  stockOut,
} from "./inventory.service.js";
export const stockInController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const result = await stockIn(
    req.user.businessId,
    req.user.userId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Stock added successfully",
    data: result,
  });
};

export const stockOutController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const result = await stockOut(
    req.user.businessId,
    req.user.userId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Stock removed successfully",
    data: result,
  });
};

export const getProductMovementsController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const movements = await getProductMovements(
    req.user.businessId,
    String(req.params.productId)
  );

  res.status(200).json({
    success: true,
    data: movements,
  });
};

export const getInventorySummaryController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const summary = await getInventorySummary(
    req.user.businessId
  );

  res.status(200).json({
    success: true,
    data: summary,
  });
};