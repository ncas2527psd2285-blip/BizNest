import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createSupplier,
  deleteSupplier,
  getSupplierById,
  getSuppliers,
  updateSupplier,
} from "./supplier.service.js";

export const createSupplierController = async (
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

  const supplier = await createSupplier(
    req.user.businessId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Supplier created successfully",
    data: supplier,
  });
};

export const getSuppliersController = async (
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

  const suppliers = await getSuppliers(
    req.user.businessId
  );

  res.status(200).json({
    success: true,
    data: suppliers,
  });
};

export const getSupplierController = async (
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

  const supplier = await getSupplierById(
    req.user.businessId,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    data: supplier,
  });
};

export const updateSupplierController = async (
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

  const supplier = await updateSupplier(
    req.user.businessId,
    String(req.params.id),
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Supplier updated successfully",
    data: supplier,
  });
};

export const deleteSupplierController = async (
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

  await deleteSupplier(
    req.user.businessId,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    message: "Supplier deleted successfully",
  });
};