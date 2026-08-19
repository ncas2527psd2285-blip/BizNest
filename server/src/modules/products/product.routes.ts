import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  updateProductController,
} from "./product.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post("/", createProductController);

router.get("/", getProductsController);

router.get("/:id", getProductController);

router.patch("/:id", updateProductController);

router.delete("/:id", deleteProductController);

export default router;