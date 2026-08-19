import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "./customer.service.js";

export const createCustomerController = async (
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

  const customer = await createCustomer(
    req.user.businessId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Customer created successfully",
    data: customer,
  });
};

export const getCustomersController = async (
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

  const customers = await getCustomers(
    req.user.businessId
  );

  res.status(200).json({
    success: true,
    data: customers,
  });
};

export const getCustomerController = async (
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

  const customerId = String(req.params.id);

  console.log("URL customer ID:", customerId);

  const customer = await getCustomerById(
    req.user.businessId,
    customerId
  );

  res.status(200).json({
    success: true,
    data: customer,
  });
};

export const updateCustomerController = async (
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

  const customer = await updateCustomer(
    req.user.businessId,
    String(req.params.id),
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: customer,
  });
};

export const deleteCustomerController = async (
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

  await deleteCustomer(
    req.user.businessId,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    message: "Customer deleted successfully",
  });
};