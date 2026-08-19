import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  createSupplierController,
  deleteSupplierController,
  getSupplierController,
  getSuppliersController,
  updateSupplierController,
} from "./supplier.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post(
  "/",
  createSupplierController
);

router.get(
  "/",
  getSuppliersController
);

router.get(
  "/:id",
  getSupplierController
);

router.patch(
  "/:id",
  updateSupplierController
);

router.delete(
  "/:id",
  deleteSupplierController
);

export default router;