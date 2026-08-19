export type WebsiteTemplate =
  | "modern-business"
  | "corporate-pro"
  | "luxury-store"
  | "restaurant"
  | "portfolio"
  | "creative-agency"
  | "medical"
  | "real-estate"
  | "technology"
  | "minimal-shop";

export type WebsiteSectionType =
  | "hero"
  | "about"
  | "products"
  | "services"
  | "features"
  | "testimonials"
  | "gallery"
  | "contact"
  | "faq"
  | "cta";

export type WebsiteTheme = {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  borderRadius?: string;
  style?:
    | "modern"
    | "professional"
    | "minimal"
    | "creative";
};

export type WebsiteSection = {
  id: string;
  type: WebsiteSectionType;
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  enabled: boolean;
  order: number;
};

export type CreateWebsiteInput = {
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  template?: WebsiteTemplate;
  theme?: WebsiteTheme;
  sections?: WebsiteSection[];
  isPublished?: boolean;
};

export type UpdateWebsiteInput = {
  name?: string;
  slug?: string;
  tagline?: string;
  description?: string;
  template?: WebsiteTemplate;
  theme?: WebsiteTheme;
  sections?: WebsiteSection[];
  isPublished?: boolean;
};