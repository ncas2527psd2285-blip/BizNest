import { Router } from "express";

import {
  getPublishedWebsiteController,
} from "./public-website.controller.js";

const router = Router();

/*
 * IMPORTANT:
 * This route is public.
 *
 * Do NOT add:
 *
 * authenticate
 * requireTenant
 *
 * because visitors don't have
 * BizNest login credentials.
 */

router.get(
  "/:slug",
  getPublishedWebsiteController
);

export default router;