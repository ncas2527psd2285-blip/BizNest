import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  getNotificationsController,
} from "./notification.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.get(
  "/",
  getNotificationsController
);

export default router;