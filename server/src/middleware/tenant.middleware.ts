import type { NextFunction, Response } from "express";

import type { AuthenticatedRequest } from "./auth.middleware.js";

export const requireTenant = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user?.businessId) {
    res.status(403).json({
      success: false,
      message: "Business context is required",
    });
    return;
  }

  next();
};