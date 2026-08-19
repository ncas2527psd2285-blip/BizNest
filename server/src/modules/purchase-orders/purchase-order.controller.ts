import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createPurchaseOrder,
  deletePurchaseOrder,
  getPurchaseOrderById,
  getPurchaseOrders,
  markPurchaseOrderOrdered,
  receivePurchaseOrder,
  updatePurchaseOrder,
} from "./purchase-order.service.js";

export const createPurchaseOrderController =
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

    const purchaseOrder =
      await createPurchaseOrder(
        req.user.businessId,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Purchase order created successfully",
      data: purchaseOrder,
    });
  };

export const getPurchaseOrdersController =
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

    const purchaseOrders =
      await getPurchaseOrders(
        req.user.businessId
      );

    res.status(200).json({
      success: true,
      data: purchaseOrders,
    });
  };

export const getPurchaseOrderController =
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

    const purchaseOrder =
      await getPurchaseOrderById(
        req.user.businessId,
        String(req.params.id)
      );

    res.status(200).json({
      success: true,
      data: purchaseOrder,
    });
  };

export const updatePurchaseOrderController =
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

    const purchaseOrder =
      await updatePurchaseOrder(
        req.user.businessId,
        String(req.params.id),
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Purchase order updated successfully",
      data: purchaseOrder,
    });
  };

export const markPurchaseOrderOrderedController =
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

    const purchaseOrder =
      await markPurchaseOrderOrdered(
        req.user.businessId,
        String(req.params.id)
      );

    res.status(200).json({
      success: true,
      message:
        "Purchase order marked as ordered",
      data: purchaseOrder,
    });
  };

export const receivePurchaseOrderController =
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

    const purchaseOrder =
      await receivePurchaseOrder(
        req.user.businessId,
        String(req.params.id),
        req.user.userId
      );

    res.status(200).json({
      success: true,
      message:
        "Purchase order received successfully",
      data: purchaseOrder,
    });
  };
export const deletePurchaseOrderController =
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

    await deletePurchaseOrder(
      req.user.businessId,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message:
        "Purchase order deleted successfully",
    });
  };