import { useEffect, useMemo, useState } from "react";

import ModernBusiness from "./templates/ModernBusiness";
import CorporatePro from "./templates/CorporatePro";
import LuxuryStore from "./templates/LuxuryStore";
import Restaurant from "./templates/Restaurant";
import Portfolio from "./templates/Portfolio";
import CreativeAgency from "./templates/CreativeAgency";
import Medical from "./templates/Medical";
import RealEstate from "./templates/RealEstate";
import Technology from "./templates/Technology";
import MinimalShop from "./templates/MinimalShop";

import "./public-site.css";

/* =========================================================
   TYPES
========================================================= */

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

export type WebsiteThemeStyle =
  | "modern"
  | "professional"
  | "minimal"
  | "creative";

export type WebsiteTheme = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  style: WebsiteThemeStyle;
};

export type WebsiteSection = {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  enabled: boolean;
  order: number;
};

export type WebsiteData = {
  _id: string;
  businessId: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  template: WebsiteTemplate;
  theme?: Partial<WebsiteTheme>;
  sections?: WebsiteSection[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: WebsiteData;
};

type PublicWebsiteProps = {
  slug?: string;
};

/* =========================================================
   API
========================================================= */

const API_BASE_URL = "http://localhost:5000";

/* =========================================================
   SLUG
========================================================= */

function getSlugFromBrowser(): string {
  const path = window.location.pathname;

  const parts = path
    .split("/")
    .filter(Boolean);

  /*
   * Example:
   *
   * /sites/kreative-prints
   */

  const sitesIndex =
    parts.indexOf("sites");

  if (
    sitesIndex !== -1 &&
    parts[sitesIndex + 1]
  ) {
    return decodeURIComponent(
      parts[sitesIndex + 1]
    );
  }

  /*
   * Also support:
   *
   * /kreative-prints
   */

  if (parts.length > 0) {
    return decodeURIComponent(
      parts[parts.length - 1]
    );
  }

  return "";
}

/* =========================================================
   THEME NORMALIZER
========================================================= */

function normalizeTheme(
  theme?: Partial<WebsiteTheme>
): WebsiteTheme {
  return {
    primaryColor:
      theme?.primaryColor ||
      "#2563eb",

    secondaryColor:
      theme?.secondaryColor ||
      "#1e40af",

    accentColor:
      theme?.accentColor ||
      "#f59e0b",

    backgroundColor:
      theme?.backgroundColor ||
      "#ffffff",

    textColor:
      theme?.textColor ||
      "#111827",

    fontFamily:
      theme?.fontFamily ||
      "Inter",

    borderRadius:
      theme?.borderRadius ||
      "12px",

    /*
     * IMPORTANT:
     * style is REQUIRED here.
     */

    style:
      theme?.style ||
      "modern",
  };
}

/* =========================================================
   PUBLIC WEBSITE
========================================================= */

function PublicWebsite({
  slug,
}: PublicWebsiteProps) {
  const browserSlug =
    getSlugFromBrowser();

  const websiteSlug =
    slug || browserSlug;

  const [website, setWebsite] =
    useState<WebsiteData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =======================================================
     LOAD WEBSITE
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadWebsite =
      async () => {
        if (!websiteSlug) {
          setError(
            "Website slug is missing."
          );

          setLoading(false);

          return;
        }

        setLoading(true);
        setError("");

        try {
          const response =
            await fetch(
              `${API_BASE_URL}/sites/${encodeURIComponent(
                websiteSlug
              )}`,
              {
                method: "GET",
                headers: {
                  Accept:
                    "application/json",
                },
              }
            );

          const result =
            (await response
              .json()
              .catch(
                () => null
              )) as
              | ApiResponse
              | null;

          if (!response.ok) {
            throw new Error(
              result?.message ||
                `Website could not be loaded (${response.status})`
            );
          }

          if (
            !result?.success ||
            !result.data
          ) {
            throw new Error(
              result?.message ||
                "Website data is unavailable."
            );
          }

          if (
            !result.data.isPublished
          ) {
            throw new Error(
              "This website is not published yet."
            );
          }

          if (!cancelled) {
            setWebsite(
              result.data
            );
          }
        } catch (err) {
          if (cancelled) {
            return;
          }

          console.error(
            "Public website error:",
            err
          );

          setWebsite(null);

          setError(
            err instanceof Error
              ? err.message
              : "Unable to load website."
          );
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    void loadWebsite();

    return () => {
      cancelled = true;
    };
  }, [websiteSlug]);

  /* =======================================================
     NORMALIZED THEME
  ======================================================= */

  const theme = useMemo(
    () =>
      normalizeTheme(
        website?.theme
      ),
    [website?.theme]
  );

  /* =======================================================
     SEO
  ======================================================= */

  useEffect(() => {
    if (!website) {
      return;
    }

    document.title =
      website.name;

    const description =
      website.description ||
      website.tagline ||
      `${website.name} website`;

    const existingDescription =
      document.querySelector(
        'meta[name="description"]'
      );

    if (existingDescription) {
      existingDescription.setAttribute(
        "content",
        description
      );
    } else {
      const meta =
        document.createElement(
          "meta"
        );

      meta.name =
        "description";

      meta.content =
        description;

      document.head.appendChild(
        meta
      );
    }

    return () => {
      document.title =
        "BizNest";
    };
  }, [website]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="public-site-loading"
        style={{
          background:
            "#f8fafc",
          color:
            "#0f172a",
        }}
      >
        <div className="public-site-loading-card">
          <div className="public-site-spinner" />

          <h2>
            Loading website...
          </h2>

          <p>
            Please wait while we
            prepare the website.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !website) {
    return (
      <div
        className="public-site-error"
        style={{
          background:
            "#f8fafc",
          color:
            "#0f172a",
        }}
      >
        <div className="public-site-error-card">
          <div className="public-site-error-icon">
            🌐
          </div>

          <h1>
            Website unavailable
          </h1>

          <p>
            {error ||
              "The requested website could not be found."}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     COMMON TEMPLATE PROPS
  ======================================================= */

  const commonProps = {
    website,
    theme,
    sections:
      website.sections || [],
  };

  /* =======================================================
     TEMPLATE RENDERER
  ======================================================= */

  const renderTemplate =
    () => {
      switch (
        website.template
      ) {
        case "corporate-pro":
          return (
            <CorporatePro
              {...commonProps}
            />
          );

        case "luxury-store":
          return (
            <LuxuryStore
              {...commonProps}
            />
          );

        case "restaurant":
          return (
            <Restaurant
              {...commonProps}
            />
          );

        case "portfolio":
          return (
            <Portfolio
              {...commonProps}
            />
          );

        case "creative-agency":
          return (
            <CreativeAgency
              {...commonProps}
            />
          );

        case "medical":
          return (
            <Medical
              {...commonProps}
            />
          );

        case "real-estate":
          return (
            <RealEstate
              {...commonProps}
            />
          );

        case "technology":
          return (
            <Technology
              {...commonProps}
            />
          );

        case "minimal-shop":
          return (
            <MinimalShop
              {...commonProps}
            />
          );

        case "modern-business":
        default:
          return (
            <ModernBusiness
              {...commonProps}
            />
          );
      }
    };

  /* =======================================================
     CSS VARIABLES
  ======================================================= */

  const cssVariables = {
    "--site-primary":
      theme.primaryColor,

    "--site-secondary":
      theme.secondaryColor,

    "--site-accent":
      theme.accentColor,

    "--site-background":
      theme.backgroundColor,

    "--site-text":
      theme.textColor,

    "--site-font":
      theme.fontFamily,

    "--site-radius":
      theme.borderRadius,
  } as React.CSSProperties;

  /* =======================================================
     FINAL WEBSITE
  ======================================================= */

  return (
    <div
      className="public-website"
      style={cssVariables}
    >
      {renderTemplate()}
    </div>
  );
}

export default PublicWebsite;