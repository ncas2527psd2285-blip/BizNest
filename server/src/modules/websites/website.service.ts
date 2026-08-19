import mongoose from "mongoose";

import {
  CreateWebsiteInput,
  UpdateWebsiteInput,
} from "./website.types.js";

import { Website } from "./website.model.js";

const validateBusinessId = (
  businessId: string
) => {
  if (
    !mongoose.isValidObjectId(
      businessId
    )
  ) {
    throw new Error(
      "Invalid business ID"
    );
  }
};

const validateWebsiteId = (
  websiteId: string
) => {
  if (
    !mongoose.isValidObjectId(
      websiteId
    )
  ) {
    throw new Error(
      "Invalid website ID"
    );
  }
};

const normalizeSlug = (
  slug: string
) => {
  return slug
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9-]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      "");
};

export const createWebsite = async (
  businessId: string,
  input: CreateWebsiteInput
) => {
  validateBusinessId(businessId);

  if (!input) {
    throw new Error(
      "Website data is required"
    );
  }

  if (
    typeof input.name !== "string"
  ) {
    throw new Error(
      "Website name is required"
    );
  }

  if (
    typeof input.slug !== "string"
  ) {
    throw new Error(
      "Website slug is required"
    );
  }

  const name =
    input.name.trim();

  if (!name) {
    throw new Error(
      "Website name is required"
    );
  }

  const slug =
    normalizeSlug(input.slug);

  if (!slug) {
    throw new Error(
      "Website slug is required"
    );
  }

  const existing =
    await Website.findOne({
      businessId,
      slug,
    });

  if (existing) {
    throw new Error(
      "Website with this slug already exists"
    );
  }

  return Website.create({
    businessId,
    name,
    slug,
    tagline:
      input.tagline,
    description:
      input.description,
    template:
      input.template ||
      "modern-business",
    theme:
      input.theme || {},
    sections:
      input.sections || [],
    isPublished:
      input.isPublished ?? false,
  });
};

export const getWebsites =
  async (
    businessId: string
  ) => {
    validateBusinessId(
      businessId
    );

    return Website.find({
      businessId,
    }).sort({
      createdAt: -1,
    });
  };

export const getWebsiteById =
  async (
    businessId: string,
    websiteId: string
  ) => {
    validateBusinessId(
      businessId
    );

    validateWebsiteId(
      websiteId
    );

    const website =
      await Website.findOne({
        _id: websiteId,
        businessId,
      });

    if (!website) {
      throw new Error(
        "Website not found"
      );
    }

    return website;
  };

export const updateWebsite =
  async (
    businessId: string,
    websiteId: string,
    input: UpdateWebsiteInput
  ) => {
    validateBusinessId(
      businessId
    );

    validateWebsiteId(
      websiteId
    );

    const updateData: Record<
      string,
      unknown
    > = {
      ...input,
    };

    if (input.name !== undefined) {
      const name =
        input.name.trim();

      if (!name) {
        throw new Error(
          "Website name cannot be empty"
        );
      }

      updateData.name =
        name;
    }

    if (input.slug !== undefined) {
      const slug =
        normalizeSlug(
          input.slug
        );

      if (!slug) {
        throw new Error(
          "Website slug cannot be empty"
        );
      }

      const existing =
        await Website.findOne({
          businessId,
          slug,
          _id: {
            $ne: websiteId,
          },
        });

      if (existing) {
        throw new Error(
          "Website with this slug already exists"
        );
      }

      updateData.slug =
        slug;
    }

    const website =
      await Website.findOneAndUpdate(
        {
          _id: websiteId,
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

    if (!website) {
      throw new Error(
        "Website not found"
      );
    }

    return website;
  };

export const deleteWebsite =
  async (
    businessId: string,
    websiteId: string
  ) => {
    validateBusinessId(
      businessId
    );

    validateWebsiteId(
      websiteId
    );

    const website =
      await Website.findOneAndDelete(
        {
          _id: websiteId,
          businessId,
        }
      );

    if (!website) {
      throw new Error(
        "Website not found"
      );
    }

    return website;
  };

export const publishWebsite =
  async (
    businessId: string,
    websiteId: string
  ) => {
    validateBusinessId(
      businessId
    );

    validateWebsiteId(
      websiteId
    );

    const website =
      await Website.findOneAndUpdate(
        {
          _id: websiteId,
          businessId,
        },
        {
          $set: {
            isPublished: true,
          },
        },
        {
          new: true,
        }
      );

    if (!website) {
      throw new Error(
        "Website not found"
      );
    }

    return website;
  };

export const unpublishWebsite =
  async (
    businessId: string,
    websiteId: string
  ) => {
    validateBusinessId(
      businessId
    );

    validateWebsiteId(
      websiteId
    );

    const website =
      await Website.findOneAndUpdate(
        {
          _id: websiteId,
          businessId,
        },
        {
          $set: {
            isPublished: false,
          },
        },
        {
          new: true,
        }
      );

    if (!website) {
      throw new Error(
        "Website not found"
      );
    }

    return website;
  };