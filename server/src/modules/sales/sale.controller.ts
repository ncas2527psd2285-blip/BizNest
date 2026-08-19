import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  cancelSale,
  completeSale,
  createSale,
  getSaleById,
  getSales,
  updateSale,
} from "./sale.service.js";

export const createSaleController =
  async (
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

    const sale = await createSale(
      req.user.businessId,
      req.user.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Sale created successfully",
      data: sale,
    });
  };

export const getSalesController =
  async (
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

    const sales = await getSales(
      req.user.businessId
    );

    res.status(200).json({
      success: true,
      data: sales,
    });
  };

export const getSaleController =
  async (
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

    const sale = await getSaleById(
      req.user.businessId,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: sale,
    });
  };

export const updateSaleController =
  async (
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

    const sale = await updateSale(
      req.user.businessId,
      String(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Sale updated successfully",
      data: sale,
    });
  };

export const completeSaleController =
  async (
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

    const sale = await completeSale(
      req.user.businessId,
      String(req.params.id),
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Sale completed successfully",
      data: sale,
    });
  };

export const cancelSaleController =
  async (
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

    const sale = await cancelSale(
      req.user.businessId,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "Sale cancelled successfully",
      data: sale,
    });
  };