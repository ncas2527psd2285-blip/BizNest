import type { Request, Response } from "express";

import {
  getPublishedWebsiteBySlug,
} from "./public-website.service.js";

export const getPublishedWebsiteController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const slug = String(
        req.params.slug
      );

      const website =
        await getPublishedWebsiteBySlug(
          slug
        );

      res.status(200).json({
        success: true,
        data: website,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Website not found";

      if (
        message ===
        "Published website not found"
      ) {
        res.status(404).json({
          success: false,
          message,
        });

        return;
      }

      res.status(400).json({
        success: false,
        message,
      });
    }
  };