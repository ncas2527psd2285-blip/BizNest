import { useEffect, useState } from "react";

import BusinessProfileStep from "./BusinessProfileStep";
import TemplateGallery from "./TemplateGallery";
import BrandingStep from "./BrandingStep";
import PageManager from "./PageManager";
import ProductSettings from "./ProductSettings";
import ServiceSettings from "./ServiceSettings";
import ContactSettings from "./ContactSettings";
import BusinessHoursStep from "./BusinessHoursStep";
import SeoSettings from "./SeoSettings";
import WebsitePreview from "./WebsitePreview";
import AIGenerator from "./AIGenerator";
import { API_URL } from "../../config";

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

export type WebsiteTheme = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
};

export type WebsitePage = {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  order: number;
};

export type BusinessProfile = {
  name: string;
  type: string;
  tagline: string;
  description: string;
  foundedYear: string;
  logoUrl: string;
  coverImageUrl: string;
};

export type ContactDetails = {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  country: string;
  mapUrl: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
};

export type BusinessHours = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

export type SeoSettings = {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  favicon: string;
};

export type WebsiteSettings = {
  showProducts: boolean;
  showServices: boolean;
  showPrices: boolean;
  showStock: boolean;
  showContactForm: boolean;
  stickyHeader: boolean;
  mobileMenu: boolean;
};

type WebsiteApiResponse = {
  success?: boolean;
  message?: string;
  data?: WebsiteApiData | WebsiteApiData[];
};

type WebsiteApiData = {
  _id?: string;
  name?: string;
  slug?: string;
  tagline?: string;
  description?: string;
  template?: WebsiteTemplate;
  theme?: Partial<WebsiteTheme>;
  sections?: unknown[];
  isPublished?: boolean;
};

type Props = {
  token: string;
};


const DEFAULT_THEME: WebsiteTheme = {
  primaryColor: "#2563eb",
  secondaryColor: "#1e40af",
  accentColor: "#f59e0b",
  backgroundColor: "#ffffff",
  textColor: "#111827",
  fontFamily: "Inter",
  borderRadius: "12px",
};

const DEFAULT_PROFILE: BusinessProfile = {
  name: "",
  type: "",
  tagline: "",
  description: "",
  foundedYear: "",
  logoUrl: "",
  coverImageUrl: "",
};

const DEFAULT_CONTACT: ContactDetails = {
  email: "",
  phone: "",
  whatsapp: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  mapUrl: "",
  instagram: "",
  facebook: "",
  linkedin: "",
  youtube: "",
};

const DEFAULT_HOURS: BusinessHours = {
  monday: "09:00 - 18:00",
  tuesday: "09:00 - 18:00",
  wednesday: "09:00 - 18:00",
  thursday: "09:00 - 18:00",
  friday: "09:00 - 18:00",
  saturday: "10:00 - 16:00",
  sunday: "Closed",
};

const DEFAULT_SEO: SeoSettings = {
  title: "",
  description: "",
  keywords: "",
  ogImage: "",
  favicon: "",
};

const DEFAULT_SETTINGS: WebsiteSettings = {
  showProducts: true,
  showServices: true,
  showPrices: true,
  showStock: false,
  showContactForm: true,
  stickyHeader: true,
  mobileMenu: true,
};

const DEFAULT_PAGES: WebsitePage[] = [
  {
    id: "home",
    name: "Home",
    slug: "/",
    enabled: true,
    order: 0,
  },
  {
    id: "about",
    name: "About",
    slug: "/about",
    enabled: true,
    order: 1,
  },
  {
    id: "products",
    name: "Products",
    slug: "/products",
    enabled: true,
    order: 2,
  },
  {
    id: "services",
    name: "Services",
    slug: "/services",
    enabled: true,
    order: 3,
  },
  {
    id: "contact",
    name: "Contact",
    slug: "/contact",
    enabled: true,
    order: 4,
  },
];

export default function WebsiteBuilderPage({
  token,
}: Props) {
  const [activeStep, setActiveStep] =
    useState("business");

  const [template, setTemplate] =
    useState<WebsiteTemplate>(
      "modern-business"
    );

  const [profile, setProfile] =
    useState<BusinessProfile>(
      DEFAULT_PROFILE
    );

  const [theme, setTheme] =
    useState<WebsiteTheme>(
      DEFAULT_THEME
    );

  const [pages, setPages] =
    useState<WebsitePage[]>(
      DEFAULT_PAGES
    );

  const [contact, setContact] =
    useState<ContactDetails>(
      DEFAULT_CONTACT
    );

  const [hours, setHours] =
    useState<BusinessHours>(
      DEFAULT_HOURS
    );

  const [seo, setSeo] =
    useState<SeoSettings>(
      DEFAULT_SEO
    );

  const [settings, setSettings] =
    useState<WebsiteSettings>(
      DEFAULT_SETTINGS
    );

  const [websiteId, setWebsiteId] =
    useState<string | null>(null);

  const [saving, setSaving] =
    useState(false);

  const [loadingWebsite, setLoadingWebsite] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState<
      "success" | "error" | "info"
    >("info");

  const [isPublished, setIsPublished] =
    useState(false);

  const [websiteUrl, setWebsiteUrl] =
    useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | Website URL
  |--------------------------------------------------------------------------
  */

 const getWebsiteUrl = (
  slug: string
): string => {
  const cleanSlug = slug
    .trim()
    .toLowerCase();

  if (!cleanSlug) {
    return "";
  }

  const configuredBaseUrl =
    (
      import.meta.env
        .VITE_PUBLIC_WEBSITE_URL as
        | string
        | undefined
    )?.trim();

  if (configuredBaseUrl) {
    return `${configuredBaseUrl.replace(
      /\/$/,
      ""
    )}/sites/${cleanSlug}`;
  }

  return `${window.location.origin}/sites/${cleanSlug}`;
};

  const updateWebsiteUrl = (
    slug?: string
  ) => {
    if (!slug) {
      setWebsiteUrl(null);
      return;
    }

    const url = getWebsiteUrl(slug);

    setWebsiteUrl(
      url || null
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Copy Website URL
  |--------------------------------------------------------------------------
  */

  const copyWebsiteUrl = async () => {
    if (!websiteUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        websiteUrl
      );

      setMessage(
        "Website URL copied to clipboard."
      );

      setMessageType("success");
    } catch {
      setMessage(
        "Could not copy the URL. Please select it manually."
      );

      setMessageType("error");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Open Website
  |--------------------------------------------------------------------------
  */

  const openWebsite = () => {
    if (!websiteUrl) {
      return;
    }

    window.open(
      websiteUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const steps = [
    {
      id: "business",
      label: "Business",
      icon: "🏢",
    },
    {
      id: "template",
      label: "Templates",
      icon: "🎨",
    },
    {
      id: "branding",
      label: "Branding",
      icon: "✨",
    },
    {
      id: "pages",
      label: "Pages",
      icon: "📄",
    },
    {
      id: "products",
      label: "Products",
      icon: "🛍️",
    },
    {
      id: "services",
      label: "Services",
      icon: "🧰",
    },
    {
      id: "contact",
      label: "Contact",
      icon: "📞",
    },
    {
      id: "hours",
      label: "Hours",
      icon: "🕒",
    },
    {
      id: "seo",
      label: "SEO",
      icon: "🔎",
    },
    {
      id: "ai",
      label: "AI Generator",
      icon: "✨",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | Load Existing Website
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    const loadWebsite =
      async () => {
        setLoadingWebsite(true);

        try {
          const response =
            await fetch(API_URL, {
              method: "GET",
              headers: {
                Authorization:
                  `Bearer ${token}`,
                Accept:
                  "application/json",
              },
            });

          const result =
            (await response.json()
              .catch(
                () => null
              )) as
              | WebsiteApiResponse
              | null;

          if (!response.ok) {
            throw new Error(
              result?.message ||
                `Failed to load website (${response.status})`
            );
          }

          const websites =
            Array.isArray(
              result?.data
            )
              ? result.data
              : result?.data
                ? [result.data]
                : [];

          if (cancelled) {
            return;
          }

          if (
            websites.length === 0
          ) {
            setWebsiteId(null);
            setIsPublished(false);
            setWebsiteUrl(null);

            setMessage(
              "No website created yet. Start building your website."
            );

            setMessageType("info");

            return;
          }

          const website =
            websites[0];

          if (website._id) {
            setWebsiteId(
              String(
                website._id
              )
            );
          }

          setIsPublished(
            Boolean(
              website.isPublished
            )
          );

          /*
           * Generate public URL
           */
          updateWebsiteUrl(
            website.slug
          );

          setProfile(
            (current) => ({
              ...current,

              name:
                website.name ??
                current.name,

              tagline:
                website.tagline ??
                current.tagline,

              description:
                website.description ??
                current.description,
            })
          );

          if (website.template) {
            setTemplate(
              website.template
            );
          }

          if (website.theme) {
            setTheme(
              (current) => ({
                ...current,
                ...website.theme,
              })
            );
          }

          setMessage(
            "Website loaded successfully."
          );

          setMessageType(
            "success"
          );
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "Website loading error:",
            error
          );

          setMessage(
            error instanceof Error
              ? error.message
              : "Could not load website."
          );

          setMessageType(
            "error"
          );
        } finally {
          if (!cancelled) {
            setLoadingWebsite(
              false
            );
          }
        }
      };

    if (token) {
      void loadWebsite();
    } else {
      setLoadingWebsite(
        false
      );

      setMessage(
        "Authentication token is missing."
      );

      setMessageType(
        "error"
      );
    }

    return () => {
      cancelled = true;
    };
  }, [token]);

  /*
  |--------------------------------------------------------------------------
  | Local Storage Backup
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "biznest-website-builder"
      );

    if (!saved) {
      return;
    }

    try {
      const data =
        JSON.parse(saved) as {
          template?: WebsiteTemplate;
          profile?: Partial<BusinessProfile>;
          theme?: Partial<WebsiteTheme>;
          pages?: WebsitePage[];
          contact?: Partial<ContactDetails>;
          hours?: Partial<BusinessHours>;
          seo?: Partial<SeoSettings>;
          settings?: Partial<WebsiteSettings>;
        };

      if (
        data.template &&
        !websiteId
      ) {
        setTemplate(
          data.template
        );
      }

      if (
        data.profile &&
        !websiteId
      ) {
        setProfile(
          (current) => ({
            ...current,
            ...data.profile,
          })
        );
      }

      if (
        data.theme &&
        !websiteId
      ) {
        setTheme(
          (current) => ({
            ...current,
            ...data.theme,
          })
        );
      }

      if (
        data.pages &&
        !websiteId
      ) {
        setPages(data.pages);
      }

      if (
        data.contact &&
        !websiteId
      ) {
        setContact(
          (current) => ({
            ...current,
            ...data.contact,
          })
        );
      }

      if (
        data.hours &&
        !websiteId
      ) {
        setHours(
          (current) => ({
            ...current,
            ...data.hours,
          })
        );
      }

      if (
        data.seo &&
        !websiteId
      ) {
        setSeo(
          (current) => ({
            ...current,
            ...data.seo,
          })
        );
      }

      if (
        data.settings &&
        !websiteId
      ) {
        setSettings(
          (current) => ({
            ...current,
            ...data.settings,
          })
        );
      }
    } catch {
      localStorage.removeItem(
        "biznest-website-builder"
      );
    }
  }, [websiteId]);

  /*
  |--------------------------------------------------------------------------
  | Build Sections
  |--------------------------------------------------------------------------
  */

  const buildSections =
    () => {
      const sections =
        pages
          .filter(
            (page) =>
              page.enabled
          )
          .sort(
            (a, b) =>
              a.order - b.order
          )
          .map(
            (
              page,
              index
            ) => ({
              id: page.id,

              type:
                page.id === "home"
                  ? "hero"
                  : page.id === "about"
                    ? "about"
                    : page.id ===
                        "products"
                      ? "products"
                      : page.id ===
                          "services"
                        ? "services"
                        : page.id ===
                            "contact"
                          ? "contact"
                          : "cta",

              title:
                page.name,

              subtitle:
                profile.tagline,

              content:
                page.id === "home"
                  ? profile.description
                  : page.id ===
                      "contact"
                    ? JSON.stringify(
                        contact
                      )
                    : page.id ===
                        "services"
                      ? JSON.stringify({
                          settings,
                          hours,
                        })
                      : "",

              imageUrl:
                page.id === "home"
                  ? profile.coverImageUrl
                  : undefined,

              enabled: true,

              order: index,
            })
          );

      return sections;
    };

  /*
  |--------------------------------------------------------------------------
  | Save Website
  |--------------------------------------------------------------------------
  */

  const saveWebsite =
    async () => {
      if (!token) {
        setMessage(
          "Authentication token is missing."
        );

        setMessageType(
          "error"
        );

        return;
      }

      const businessName =
        profile.name.trim();

      if (!businessName) {
        setMessage(
          "Please enter your business name first."
        );

        setMessageType(
          "error"
        );

        setActiveStep(
          "business"
        );

        return;
      }

      setSaving(true);
      setMessage("");

      const slug =
        businessName
          .toLowerCase()
          .trim()
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-|-$/g,
            ""
          ) ||
        `website-${Date.now()}`;

      const payload = {
        name: businessName,

        slug,

        tagline:
          profile.tagline.trim(),

        description:
          profile.description.trim(),

        template,

        theme,

        sections:
          buildSections(),

        isPublished,
      };

      try {
        const url = websiteId
          ? `${API_URL}/${websiteId}`
          : API_URL;

        const method = websiteId
          ? "PATCH"
          : "POST";

        const response =
          await fetch(url, {
            method,

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          });

        const result =
          (await response.json()
            .catch(
              () => null
            )) as
            | WebsiteApiResponse
            | null;

        if (!response.ok) {
          throw new Error(
            result?.message ||
              `Failed to save website (${response.status})`
          );
        }

        const website =
          !Array.isArray(
            result?.data
          )
            ? result?.data
            : result.data[0];

        if (website?._id) {
          setWebsiteId(
            String(
              website._id
            )
          );
        }

        /*
         * IMPORTANT:
         * Use the slug returned by the backend.
         */
        const savedSlug =
          website?.slug ||
          slug;

        updateWebsiteUrl(
          savedSlug
        );

        if (
          typeof website?.isPublished ===
          "boolean"
        ) {
          setIsPublished(
            website.isPublished
          );
        }

        localStorage.setItem(
          "biznest-website-builder",
          JSON.stringify({
            template,
            profile,
            theme,
            pages,
            contact,
            hours,
            seo,
            settings,
          })
        );

        setMessage(
          websiteId
            ? "Website updated successfully."
            : "Website created successfully."
        );

        setMessageType(
          "success"
        );
      } catch (error) {
        console.error(
          "Website save error:",
          error
        );

        localStorage.setItem(
          "biznest-website-builder",
          JSON.stringify({
            template,
            profile,
            theme,
            pages,
            contact,
            hours,
            seo,
            settings,
          })
        );

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to save website."
        );

        setMessageType(
          "error"
        );
      } finally {
        setSaving(false);
      }
    };

  /*
  |--------------------------------------------------------------------------
  | Publish Website
  |--------------------------------------------------------------------------
  */

  const publishWebsite =
    async () => {
      if (!websiteId) {
        setMessage(
          "Save the website first before publishing."
        );

        setMessageType(
          "error"
        );

        return;
      }

      if (!token) {
        setMessage(
          "Authentication token is missing."
        );

        setMessageType(
          "error"
        );

        return;
      }

      setSaving(true);
      setMessage("");

      try {
        /*
         * Save first so the latest
         * builder content is stored.
         */
        await saveWebsite();

        const response =
          await fetch(
            `${API_URL}/${websiteId}/publish`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                Accept:
                  "application/json",
              },
            }
          );

        const result =
          (await response.json()
            .catch(
              () => null
            )) as
            | WebsiteApiResponse
            | null;

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to publish website."
          );
        }

        setIsPublished(true);

        /*
         * Use returned slug when available.
         */
        const publishedWebsite =
          !Array.isArray(
            result?.data
          )
            ? result?.data
            : result?.data?.[0];

        if (
          publishedWebsite?.slug
        ) {
          updateWebsiteUrl(
            publishedWebsite.slug
          );
        } else if (
          websiteUrl === null
        ) {
          const fallbackSlug =
            profile.name
              .toLowerCase()
              .trim()
              .replace(
                /[^a-z0-9]+/g,
                "-"
              )
              .replace(
                /^-|-$/g,
                "");

          updateWebsiteUrl(
            fallbackSlug
          );
        }

        setMessage(
          "Website published successfully."
        );

        setMessageType(
          "success"
        );
      } catch (error) {
        console.error(
          "Publish error:",
          error
        );

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to publish website."
        );

        setMessageType(
          "error"
        );
      } finally {
        setSaving(false);
      }
    };

  /*
  |--------------------------------------------------------------------------
  | Unpublish Website
  |--------------------------------------------------------------------------
  */

  const unpublishWebsite =
    async () => {
      if (!websiteId) {
        return;
      }

      if (!token) {
        setMessage(
          "Authentication token is missing."
        );

        setMessageType(
          "error"
        );

        return;
      }

      setSaving(true);
      setMessage("");

      try {
        const response =
          await fetch(
            `${API_URL}/${websiteId}/unpublish`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                Accept:
                  "application/json",
              },
            }
          );

        const result =
          (await response.json()
            .catch(
              () => null
            )) as
            | WebsiteApiResponse
            | null;

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to unpublish website."
          );
        }

        setIsPublished(
          false
        );

        setMessage(
          "Website unpublished successfully."
        );

        setMessageType(
          "success"
        );
      } catch (error) {
        console.error(
          "Unpublish error:",
          error
        );

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to unpublish website."
        );

        setMessageType(
          "error"
        );
      } finally {
        setSaving(false);
      }
    };

  const messageBackground =
    messageType === "success"
      ? "#ecfdf5"
      : messageType === "error"
        ? "#fef2f2"
        : "#eff6ff";

  const messageBorder =
    messageType === "success"
      ? "#a7f3d0"
      : messageType === "error"
        ? "#fecaca"
        : "#bfdbfe";

  const messageColor =
    messageType === "success"
      ? "#047857"
      : messageType === "error"
        ? "#b91c1c"
        : "#1d4ed8";

  return (
    <div
      style={{
        padding: "24px",
        background: "#f8fafc",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Website Builder
          </h1>

          <p
            style={{
              margin:
                "6px 0 0",
              color: "#64748b",
            }}
          >
            Build a professional
            website for your
            business.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {isPublished && (
            <span
              style={{
                padding:
                  "8px 12px",
                borderRadius:
                  "999px",
                background:
                  "#dcfce7",
                color:
                  "#15803d",
                fontSize:
                  "13px",
                fontWeight: 700,
              }}
            >
              ● Published
            </span>
          )}

          {!isPublished &&
            websiteId && (
              <span
                style={{
                  padding:
                    "8px 12px",
                  borderRadius:
                    "999px",
                  background:
                    "#fef3c7",
                  color:
                    "#92400e",
                  fontSize:
                    "13px",
                  fontWeight: 700,
                }}
              >
                Draft
              </span>
            )}

          <button
            type="button"
            onClick={() =>
              setActiveStep(
                "ai"
              )
            }
            style={{
              border:
                "1px solid #c7d2fe",
              background:
                "#eef2ff",
              color:
                "#4338ca",
              padding:
                "11px 18px",
              borderRadius:
                "9px",
              fontWeight: 700,
              cursor:
                "pointer",
            }}
          >
            ✨ AI Generate
          </button>

          {websiteId &&
            isPublished && (
              <button
                type="button"
                onClick={
                  unpublishWebsite
                }
                disabled={saving}
                style={{
                  border:
                    "1px solid #cbd5e1",
                  background:
                    "#fff",
                  color:
                    "#475569",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "9px",
                  fontWeight: 700,
                  cursor:
                    "pointer",
                  opacity:
                    saving
                      ? 0.6
                      : 1,
                }}
              >
                Unpublish
              </button>
            )}

          {websiteId &&
            !isPublished && (
              <button
                type="button"
                onClick={
                  publishWebsite
                }
                disabled={saving}
                style={{
                  border:
                    "none",
                  background:
                    "#059669",
                  color:
                    "#fff",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "9px",
                  fontWeight: 700,
                  cursor:
                    "pointer",
                  opacity:
                    saving
                      ? 0.6
                      : 1,
                }}
              >
                Publish
              </button>
            )}

          <button
            type="button"
            onClick={
              saveWebsite
            }
            disabled={
              saving ||
              loadingWebsite
            }
            style={{
              border: "none",
              background:
                theme.primaryColor,
              color: "#fff",
              padding:
                "11px 20px",
              borderRadius:
                "9px",
              fontWeight: 700,
              cursor:
                "pointer",
              opacity:
                saving ||
                loadingWebsite
                  ? 0.6
                  : 1,
            }}
          >
            {saving
              ? "Saving..."
              : "Save Website"}
          </button>
        </div>
      </div>

      {/*
      |--------------------------------------------------------------------------
      | Website URL Card
      |--------------------------------------------------------------------------
      */}

      {websiteUrl && (
        <div
          style={{
            marginBottom:
              "20px",
            padding: "20px",
            background:
              "linear-gradient(135deg,#eff6ff,#f5f3ff)",
            border:
              "1px solid #c7d2fe",
            borderRadius:
              "14px",
            boxShadow:
              "0 4px 14px rgba(15,23,42,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "flex-start",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize:
                    "18px",
                  fontWeight:
                    800,
                  color:
                    "#0f172a",
                }}
              >
                🌐 Your Website{" "}
                {isPublished
                  ? "is Live"
                  : "is Ready"}
              </div>

              <div
                style={{
                  marginTop:
                    "6px",
                  color:
                    "#64748b",
                  fontSize:
                    "13px",
                }}
              >
                Share this URL
                with your
                customers.
              </div>
            </div>

            <span
              style={{
                padding:
                  "6px 10px",
                borderRadius:
                  "999px",
                background:
                  isPublished
                    ? "#dcfce7"
                    : "#fef3c7",
                color:
                  isPublished
                    ? "#15803d"
                    : "#92400e",
                fontSize:
                  "12px",
                fontWeight:
                  700,
              }}
            >
              {isPublished
                ? "● LIVE"
                : "● DRAFT"}
            </span>
          </div>

          <div
            style={{
              marginTop:
                "15px",
              display: "flex",
              gap: "10px",
              alignItems:
                "center",
              flexWrap: "wrap",
            }}
          >
            <input
              readOnly
              value={
                websiteUrl
              }
              onFocus={(
                event
              ) =>
                event.target.select()
              }
              style={{
                flex: 1,
                minWidth:
                  "280px",
                padding:
                  "12px 14px",
                border:
                  "1px solid #cbd5e1",
                borderRadius:
                  "9px",
                background:
                  "#fff",
                color:
                  "#334155",
                fontSize:
                  "14px",
                outline:
                  "none",
              }}
            />

            <button
              type="button"
              onClick={
                copyWebsiteUrl
              }
              style={{
                border:
                  "none",
                background:
                  theme.primaryColor,
                color: "#fff",
                padding:
                  "12px 18px",
                borderRadius:
                  "9px",
                fontWeight:
                  700,
                cursor:
                  "pointer",
                whiteSpace:
                  "nowrap",
              }}
            >
              📋 Copy URL
            </button>

            <button
              type="button"
              onClick={
                openWebsite
              }
              disabled={
                !isPublished
              }
              title={
                !isPublished
                  ? "Publish the website first"
                  : "Open public website"
              }
              style={{
                border:
                  "1px solid #cbd5e1",
                background:
                  isPublished
                    ? "#fff"
                    : "#f8fafc",
                color:
                  isPublished
                    ? "#334155"
                    : "#94a3b8",
                padding:
                  "12px 18px",
                borderRadius:
                  "9px",
                fontWeight:
                  700,
                cursor:
                  isPublished
                    ? "pointer"
                    : "not-allowed",
                whiteSpace:
                  "nowrap",
              }}
            >
              🌐 Open Website
            </button>
          </div>

          {!isPublished && (
            <div
              style={{
                marginTop:
                  "12px",
                fontSize:
                  "13px",
                color:
                  "#92400e",
              }}
            >
              ⚠️ This is your
              website URL. Publish
              the website before
              customers can access
              it.
            </div>
          )}

          {isPublished && (
            <div
              style={{
                marginTop:
                  "12px",
                fontSize:
                  "13px",
                color:
                  "#047857",
              }}
            >
              ✓ Your website is
              published and ready
              to share.
            </div>
          )}
        </div>
      )}

      {message && (
        <div
          style={{
            marginBottom:
              "18px",
            padding:
              "12px 16px",
            background:
              messageBackground,
            border:
              `1px solid ${messageBorder}`,
            color:
              messageColor,
            borderRadius:
              "10px",
          }}
        >
          {message}
        </div>
      )}

      {loadingWebsite && (
        <div
          style={{
            marginBottom:
              "18px",
            padding:
              "12px 16px",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
            borderRadius:
              "10px",
            color:
              "#64748b",
          }}
        >
          Loading your
          website...
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "220px minmax(0, 1fr)",
          gap: "20px",
          alignItems:
            "start",
        }}
      >
        <aside
          style={{
            background: "#fff",
            border:
              "1px solid #e2e8f0",
            borderRadius:
              "14px",
            padding: "10px",
            position:
              "sticky",
            top: "20px",
          }}
        >
          {steps.map(
            (step) => {
              const active =
                activeStep ===
                step.id;

              return (
                <button
                  key={
                    step.id
                  }
                  type="button"
                  onClick={() =>
                    setActiveStep(
                      step.id
                    )
                  }
                  style={{
                    width:
                      "100%",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "10px",
                    border:
                      "none",
                    background:
                      active
                        ? "#eff6ff"
                        : "transparent",
                    color:
                      active
                        ? theme.primaryColor
                        : "#475569",
                    padding:
                      "12px 13px",
                    borderRadius:
                      "9px",
                    marginBottom:
                      "3px",
                    cursor:
                      "pointer",
                    textAlign:
                      "left",
                    fontWeight:
                      active
                        ? 700
                        : 500,
                  }}
                >
                  <span>
                    {
                      step.icon
                    }
                  </span>

                  <span>
                    {
                      step.label
                    }
                  </span>
                </button>
              );
            }
          )}
        </aside>

        <main>
          {activeStep ===
            "business" && (
            <BusinessProfileStep
              value={profile}
              onChange={
                setProfile
              }
            />
          )}

          {activeStep ===
            "template" && (
            <TemplateGallery
              value={
                template
              }
              onChange={
                setTemplate
              }
            />
          )}

          {activeStep ===
            "branding" && (
            <BrandingStep
              value={theme}
              onChange={
                setTheme
              }
            />
          )}

          {activeStep ===
            "pages" && (
            <PageManager
              pages={pages}
              onChange={
                setPages
              }
            />
          )}

          {activeStep ===
            "products" && (
            <ProductSettings
              value={settings}
              onChange={
                setSettings
              }
            />
          )}

          {activeStep ===
            "services" && (
            <ServiceSettings />
          )}

          {activeStep ===
            "contact" && (
            <ContactSettings
              value={contact}
              onChange={
                setContact
              }
            />
          )}

          {activeStep ===
            "hours" && (
            <BusinessHoursStep
              value={hours}
              onChange={
                setHours
              }
            />
          )}

          {activeStep ===
            "seo" && (
            <SeoSettings
              value={seo}
              onChange={
                setSeo
              }
            />
          )}

          {activeStep ===
            "ai" && (
            <AIGenerator
              profile={profile}
              template={template}
              onGenerate={(
                result
              ) => {
                setProfile(
                  (current) => ({
                    ...current,
                    ...result,
                  })
                );

                setMessage(
                  "AI content generated."
                );

                setMessageType(
                  "success"
                );
              }}
            />
          )}

          <div
            style={{
              marginTop:
                "20px",
              background:
                "#fff",
              border:
                "1px solid #e2e8f0",
              borderRadius:
                "14px",
              padding:
                "18px",
            }}
          >
            <WebsitePreview
              profile={
                profile
              }
              template={
                template
              }
              theme={
                theme
              }
              pages={
                pages
              }
              settings={
                settings
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
}