import mongoose, {
  Document,
  Schema,
} from "mongoose";

import type {
  WebsiteSection,
  WebsiteTemplate,
  WebsiteTheme,
} from "./website.types.js";

export interface WebsiteDocument
  extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  template: WebsiteTemplate;
  theme: WebsiteTheme;
  sections: WebsiteSection[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const websiteSectionSchema =
  new Schema<WebsiteSection>(
    {
      id: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        required: true,
      },

      title: String,

      subtitle: String,

      content: String,

      imageUrl: String,

      enabled: {
        type: Boolean,
        default: true,
      },

      order: {
        type: Number,
        default: 0,
      },
    },
    {
      _id: false,
    }
  );

const websiteSchema =
  new Schema<WebsiteDocument>(
    {
      businessId: {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: true,
        index: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      tagline: {
        type: String,
        trim: true,
      },

      description: {
        type: String,
        trim: true,
      },

      template: {
        type: String,
        default: "modern-business",
      },

      theme: {
        primaryColor: String,
        secondaryColor: String,
        accentColor: String,
        backgroundColor: String,
        textColor: String,
        fontFamily: String,
        borderRadius: String,
        style: String,
      },

      sections: {
        type: [websiteSectionSchema],
        default: [],
      },

      isPublished: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

websiteSchema.index(
  {
    businessId: 1,
    slug: 1,
  },
  {
    unique: true,
  }
);

export const Website =
  mongoose.model<WebsiteDocument>(
    "Website",
    websiteSchema
  );