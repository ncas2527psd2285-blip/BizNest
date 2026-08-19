import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  getNotifications,
} from "./notification.service.js";

export const getNotificationsController =
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

    const notifications =
      await getNotifications(
        req.user.businessId
      );

    res.status(200).json({
      success: true,
      data: notifications,
    });
  };