import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  cancelSaleController,
  completeSaleController,
  createSaleController,
  getSaleController,
  getSalesController,
  updateSaleController,
} from "./sale.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post(
  "/",
  createSaleController
);

router.get(
  "/",
  getSalesController
);

router.post(
  "/:id/complete",
  completeSaleController
);

router.post(
  "/:id/cancel",
  cancelSaleController
);

router.get(
  "/:id",
  getSaleController
);

router.patch(
  "/:id",
  updateSaleController
);

export default router;