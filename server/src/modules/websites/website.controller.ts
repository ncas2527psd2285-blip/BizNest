import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createWebsite,
  deleteWebsite,
  getWebsiteById,
  getWebsites,
  publishWebsite,
  unpublishWebsite,
  updateWebsite,
} from "./website.service.js";

export const createWebsiteController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    console.log(
      "CREATE WEBSITE BODY:",
      req.body
    );

    if (
      !req.body ||
      typeof req.body !== "object"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Website request body is required",
      });
      return;
    }

    const website =
      await createWebsite(
        req.user.businessId,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Website created successfully",
      data: website,
    });
  };

export const getWebsitesController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const websites =
      await getWebsites(
        req.user.businessId
      );

    res.status(200).json({
      success: true,
      data: websites,
    });
  };

export const getWebsiteController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const website =
      await getWebsiteById(
        req.user.businessId,
        String(req.params.id)
      );

    res.status(200).json({
      success: true,
      data: website,
    });
  };

export const updateWebsiteController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const website =
      await updateWebsite(
        req.user.businessId,
        String(req.params.id),
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Website updated successfully",
      data: website,
    });
  };

export const deleteWebsiteController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    await deleteWebsite(
      req.user.businessId,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message:
        "Website deleted successfully",
    });
  };

export const publishWebsiteController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const website =
      await publishWebsite(
        req.user.businessId,
        String(req.params.id)
      );

    res.status(200).json({
      success: true,
      message:
        "Website published successfully",
      data: website,
    });
  };

export const unpublishWebsiteController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
      return;
    }

    const website =
      await unpublishWebsite(
        req.user.businessId,
        String(req.params.id)
      );

    res.status(200).json({
      success: true,
      message:
        "Website unpublished successfully",
      data: website,
    });
  };