import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getCategoryProducts,
  updateCategory,
} from "./category.service.js";

export const createCategoryController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const category = await createCategory(
    req.user.businessId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

export const getCategoriesController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const categories = await getCategories(
    req.user.businessId
  );

  res.status(200).json({
    success: true,
    data: categories,
  });
};

export const getCategoryController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const category = await getCategoryById(
    req.user.businessId,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    data: category,
  });
};

export const getCategoryProductsController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const products = await getCategoryProducts(
    req.user.businessId,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    data: products,
  });
};

export const updateCategoryController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const category = await updateCategory(
    req.user.businessId,
    String(req.params.id),
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
};

export const deleteCategoryController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  await deleteCategory(
    req.user.businessId,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
};