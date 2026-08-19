import mongoose from "mongoose";

import { Customer } from "./customer.model.js";
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from "./customer.types.js";

export const createCustomer = async (
  businessId: string,
  input: CreateCustomerInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const customer = await Customer.create({
    businessId,
    name: input.name,
    email: input.email,
    phone: input.phone,
    address: input.address,
    company: input.company,
    notes: input.notes,
    tags: input.tags ?? [],
  });

  return customer;
};

export const getCustomers = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  return Customer.find({
    businessId,
  }).sort({
    createdAt: -1,
  });
};

export const getCustomerById = async (
  businessId: string,
  customerId: string
) => {
  console.log("Customer lookup:");
  console.log("businessId:", businessId);
  console.log("customerId:", customerId);

  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(customerId)) {
    throw new Error(`Invalid customer ID: ${customerId}`);
  }

  const customer = await Customer.findOne({
    _id: customerId,
    businessId,
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

export const updateCustomer = async (
  businessId: string,
  customerId: string,
  input: UpdateCustomerInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(customerId)) {
    throw new Error("Invalid customer ID");
  }

  const customer = await Customer.findOneAndUpdate(
    {
      _id: customerId,
      businessId,
    },
    {
      $set: input,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

export const deleteCustomer = async (
  businessId: string,
  customerId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(customerId)) {
    throw new Error("Invalid customer ID");
  }

  const customer = await Customer.findOneAndDelete({
    _id: customerId,
    businessId,
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};