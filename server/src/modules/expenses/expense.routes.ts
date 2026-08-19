import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  createExpenseController,
  deleteExpenseController,
  getExpenseController,
  getExpensesController,
  updateExpenseController,
} from "./expense.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post(
  "/",
  createExpenseController
);

router.get(
  "/",
  getExpensesController
);

router.get(
  "/:id",
  getExpenseController
);

router.patch(
  "/:id",
  updateExpenseController
);

router.delete(
  "/:id",
  deleteExpenseController
);

export default router;