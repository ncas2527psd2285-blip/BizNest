import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryController,
  getCategoryProductsController,
  updateCategoryController,
} from "./category.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post(
  "/",
  createCategoryController
);

router.get(
  "/",
  getCategoriesController
);

// IMPORTANT:
// This must come before "/:id"
router.get(
  "/:id/products",
  getCategoryProductsController
);

router.get(
  "/:id",
  getCategoryController
);

router.patch(
  "/:id",
  updateCategoryController
);

router.delete(
  "/:id",
  deleteCategoryController
);

export default router;