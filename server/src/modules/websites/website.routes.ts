import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  createWebsiteController,
  deleteWebsiteController,
  getWebsiteController,
  getWebsitesController,
  publishWebsiteController,
  unpublishWebsiteController,
  updateWebsiteController,
} from "./website.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post(
  "/",
  createWebsiteController
);

router.get(
  "/",
  getWebsitesController
);

router.get(
  "/:id",
  getWebsiteController
);

router.patch(
  "/:id",
  updateWebsiteController
);

router.delete(
  "/:id",
  deleteWebsiteController
);

router.post(
  "/:id/publish",
  publishWebsiteController
);

router.post(
  "/:id/unpublish",
  unpublishWebsiteController
);

export default router;