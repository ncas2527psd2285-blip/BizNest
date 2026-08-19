import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireTenant } from "../../middleware/tenant.middleware.js";

import {
  createCustomerController,
  deleteCustomerController,
  getCustomerController,
  getCustomersController,
  updateCustomerController,
} from "./customer.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.post("/", createCustomerController);

router.get("/", getCustomersController);

router.get("/:id", getCustomerController);

router.patch("/:id", updateCustomerController);

router.delete("/:id", deleteCustomerController);

export default router;