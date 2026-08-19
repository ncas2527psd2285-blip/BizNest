import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  getExpensesReportController,
  getInventoryReportController,
  getReportSummaryController,
  getSalesReportController,
} from "./report.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.get(
  "/summary",
  getReportSummaryController
);

router.get(
  "/sales",
  getSalesReportController
);

router.get(
  "/expenses",
  getExpensesReportController
);

router.get(
  "/inventory",
  getInventoryReportController
);

export default router;