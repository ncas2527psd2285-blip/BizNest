import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  createPurchaseOrderController,
  deletePurchaseOrderController,
  getPurchaseOrderController,
  getPurchaseOrdersController,
  receivePurchaseOrderController,
  updatePurchaseOrderController,
} from "./purchase-order.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post(
  "/",
  createPurchaseOrderController
);

router.post(
  "/:id/receive",
  receivePurchaseOrderController
);

router.get(
  "/",
  getPurchaseOrdersController
);

router.get(
  "/:id",
  getPurchaseOrderController
);

router.patch(
  "/:id",
  updatePurchaseOrderController
);

router.delete(
  "/:id",
  deletePurchaseOrderController
);

export default router;