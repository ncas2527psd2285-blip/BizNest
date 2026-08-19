import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import { getDashboard } from "./dashboard.service.js";

export const getDashboardController =
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

    const dashboard = await getDashboard(
      req.user.businessId
    );

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  };