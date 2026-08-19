import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  getExpensesReport,
  getInventoryReport,
  getReportSummary,
  getSalesReport,
} from "./report.service.js";

const getDateQuery = (
  req: AuthenticatedRequest
) => {
  const startDate =
    typeof req.query.startDate ===
    "string"
      ? req.query.startDate
      : undefined;

  const endDate =
    typeof req.query.endDate ===
    "string"
      ? req.query.endDate
      : undefined;

  return {
    startDate,
    endDate,
  };
};

export const getReportSummaryController =
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

    const {
      startDate,
      endDate,
    } = getDateQuery(req);

    const report =
      await getReportSummary(
        req.user.businessId,
        startDate,
        endDate
      );

    res.status(200).json({
      success: true,
      data: report,
    });
  };

export const getSalesReportController =
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

    const {
      startDate,
      endDate,
    } = getDateQuery(req);

    const report =
      await getSalesReport(
        req.user.businessId,
        startDate,
        endDate
      );

    res.status(200).json({
      success: true,
      data: report,
    });
  };

export const getExpensesReportController =
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

    const {
      startDate,
      endDate,
    } = getDateQuery(req);

    const report =
      await getExpensesReport(
        req.user.businessId,
        startDate,
        endDate
      );

    res.status(200).json({
      success: true,
      data: report,
    });
  };

export const getInventoryReportController =
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

    const report =
      await getInventoryReport(
        req.user.businessId
      );

    res.status(200).json({
      success: true,
      data: report,
    });
  };