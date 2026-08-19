import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  getInventorySummaryController,
  getProductMovementsController,
  stockInController,
  stockOutController,
} from "./inventory.controller.js";
const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post("/stock-in", stockInController);

router.post("/stock-out", stockOutController);

router.get(
  "/products/:productId/movements",
  getProductMovementsController
);

router.get(
  "/summary",
  getInventorySummaryController
);

export default router;