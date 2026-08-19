import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "./expense.service.js";

export const createExpenseController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const expense =
      await createExpense(
        req.user.businessId,
        req.user.userId,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Expense created successfully",
      data: expense,
    });
  };

export const getExpensesController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const expenses =
      await getExpenses(
        req.user.businessId
      );

    res.status(200).json({
      success: true,
      data: expenses,
    });
  };

export const getExpenseController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const expense =
      await getExpenseById(
        req.user.businessId,
        String(req.params.id)
      );

    res.status(200).json({
      success: true,
      data: expense,
    });
  };

export const updateExpenseController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const expense =
      await updateExpense(
        req.user.businessId,
        String(req.params.id),
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Expense updated successfully",
      data: expense,
    });
  };

export const deleteExpenseController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    await deleteExpense(
      req.user.businessId,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message:
        "Expense deleted successfully",
    });
  };