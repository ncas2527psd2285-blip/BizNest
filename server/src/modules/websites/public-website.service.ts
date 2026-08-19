import { Website } from "./website.model.js";

export const getPublishedWebsiteBySlug =
  async (slug: string) => {
    const normalizedSlug = slug
      .trim()
      .toLowerCase();

    if (!normalizedSlug) {
      throw new Error(
        "Website slug is required"
      );
    }

    const website =
      await Website.findOne({
        slug: normalizedSlug,
        isPublished: true,
      }).lean();

    if (!website) {
      throw new Error(
        "Published website not found"
      );
    }

    return website;
  };