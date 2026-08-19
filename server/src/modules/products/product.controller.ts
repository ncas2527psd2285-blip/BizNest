import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./product.service.js";

export const createProductController = async (
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

  const product = await createProduct(
    req.user.businessId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

export const getProductsController = async (
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

  const pageValue = Number(req.query.page);
  const limitValue = Number(req.query.limit);

  const page =
    Number.isInteger(pageValue) && pageValue > 0
      ? pageValue
      : 1;

  const limit =
    Number.isInteger(limitValue) &&
    limitValue > 0 &&
    limitValue <= 100
      ? limitValue
      : 10;

  const search =
    typeof req.query.search === "string"
      ? req.query.search.trim()
      : undefined;

  const categoryId =
    typeof req.query.categoryId === "string"
      ? req.query.categoryId.trim()
      : undefined;

  const status =
    req.query.status === "ACTIVE" ||
    req.query.status === "INACTIVE"
      ? req.query.status
      : undefined;

  const result = await getProducts(
    req.user.businessId,
    {
      search,
      categoryId,
      status,
      page,
      limit,
    }
  );

  res.status(200).json({
    success: true,
    data: result,
  });
};
export const getProductController = async (
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

  const product = await getProductById(
    req.user.businessId,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    data: product,
  });
};

export const updateProductController = async (
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

  const product = await updateProduct(
    req.user.businessId,
    String(req.params.id),
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

export const deleteProductController = async (
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

  await deleteProduct(
    req.user.businessId,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};