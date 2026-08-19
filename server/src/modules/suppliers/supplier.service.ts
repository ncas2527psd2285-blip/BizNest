import mongoose from "mongoose";

import { Supplier } from "./supplier.model.js";
import {
  CreateSupplierInput,
  UpdateSupplierInput,
} from "./supplier.types.js";

export const createSupplier = async (
  businessId: string,
  input: CreateSupplierInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  const name = input.name.trim();

  if (!name) {
    throw new Error("Supplier name is required");
  }

  const supplier = await Supplier.create({
    businessId,
    name,
    email: input.email?.trim().toLowerCase(),
    phone: input.phone?.trim(),
    address: input.address?.trim(),
    company: input.company?.trim(),
    notes: input.notes?.trim(),
    tags: input.tags ?? [],
  });

  return supplier;
};

export const getSuppliers = async (
  businessId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  return Supplier.find({
    businessId,
  }).sort({
    createdAt: -1,
  });
};

export const getSupplierById = async (
  businessId: string,
  supplierId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(supplierId)) {
    throw new Error("Invalid supplier ID");
  }

  const supplier = await Supplier.findOne({
    _id: supplierId,
    businessId,
  });

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  return supplier;
};

export const updateSupplier = async (
  businessId: string,
  supplierId: string,
  input: UpdateSupplierInput
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(supplierId)) {
    throw new Error("Invalid supplier ID");
  }

  const updateData = {
    ...input,
    ...(input.name !== undefined
      ? {
          name: input.name.trim(),
        }
      : {}),
    ...(input.email !== undefined
      ? {
          email: input.email
            .trim()
            .toLowerCase(),
        }
      : {}),
    ...(input.phone !== undefined
      ? {
          phone: input.phone.trim(),
        }
      : {}),
    ...(input.address !== undefined
      ? {
          address: input.address.trim(),
        }
      : {}),
    ...(input.company !== undefined
      ? {
          company: input.company.trim(),
        }
      : {}),
    ...(input.notes !== undefined
      ? {
          notes: input.notes.trim(),
        }
      : {}),
  };

  if (
    updateData.name !== undefined &&
    !updateData.name
  ) {
    throw new Error(
      "Supplier name cannot be empty"
    );
  }

  const supplier =
    await Supplier.findOneAndUpdate(
      {
        _id: supplierId,
        businessId,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  return supplier;
};

export const deleteSupplier = async (
  businessId: string,
  supplierId: string
) => {
  if (!mongoose.isValidObjectId(businessId)) {
    throw new Error("Invalid business ID");
  }

  if (!mongoose.isValidObjectId(supplierId)) {
    throw new Error("Invalid supplier ID");
  }

  const supplier =
    await Supplier.findOneAndDelete({
      _id: supplierId,
      businessId,
    });

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  return supplier;
};