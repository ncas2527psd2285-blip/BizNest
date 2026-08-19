import { useState } from "react";

import type {
  BusinessProfile,
  WebsiteTemplate,
} from "./WebsiteBuilderPage";

type Props = {
  profile?: BusinessProfile;
  template?: WebsiteTemplate;
  onGenerate: (
    result: Partial<BusinessProfile>
  ) => void;
};

export default function AIGenerator({
  profile,
  template,
  onGenerate,
}: Props) {
  const [prompt, setPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const safeProfile: BusinessProfile =
    profile ?? {
      name: "",
      type: "",
      tagline: "",
      description: "",
      foundedYear: "",
      logoUrl: "",
      coverImageUrl: "",
    };

  const generate = async () => {
    const businessName =
      safeProfile.name?.trim() ||
      "My Business";

    const businessType =
      safeProfile.type?.trim() ||
      "Business";

    const description =
      prompt.trim() ||
      safeProfile.description?.trim() ||
      `${businessName} is a professional ${businessType} business.`;

    setLoading(true);

    try {
      /*
       * Temporary local generation.
       *
       * This does NOT call a real AI API yet.
       * We will connect the real AI backend next.
       */
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            800
          )
      );

      onGenerate({
        name: businessName,

        type: businessType,

        tagline:
          safeProfile.tagline?.trim() ||
          `Professional ${businessType} solutions from ${businessName}`,

        description,

        foundedYear:
          safeProfile.foundedYear ||
          "",

        logoUrl:
          safeProfile.logoUrl ||
          "",

        coverImageUrl:
          safeProfile.coverImageUrl ||
          "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#eef2ff,#faf5ff)",
        padding: "28px",
        border:
          "1px solid #c7d2fe",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          fontSize: "42px",
        }}
      >
        ✨
      </div>

      <h2>
        AI Website Generator
      </h2>

      <p
        style={{
          color: "#475569",
          lineHeight: 1.7,
        }}
      >
        Describe your business and
        BizNest will prepare content
        for your website.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border:
              "1px solid #e0e7ff",
            borderRadius: "9px",
            padding: "12px",
          }}
        >
          <small
            style={{
              color: "#64748b",
            }}
          >
            Business
          </small>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
            }}
          >
            {safeProfile.name ||
              "Not specified"}
          </strong>
        </div>

        <div
          style={{
            background: "#fff",
            border:
              "1px solid #e0e7ff",
            borderRadius: "9px",
            padding: "12px",
          }}
        >
          <small
            style={{
              color: "#64748b",
            }}
          >
            Business Type
          </small>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
            }}
          >
            {safeProfile.type ||
              "Not specified"}
          </strong>
        </div>
      </div>

      <div
        style={{
          padding:
            "12px 14px",
          background: "#fff",
          border:
            "1px solid #e0e7ff",
          borderRadius: "9px",
          marginBottom: "15px",
          fontSize: "13px",
        }}
      >
        Selected template:{" "}
        <strong>
          {template ||
            "modern-business"}
        </strong>
      </div>

      <textarea
        rows={8}
        value={prompt}
        onChange={(event) =>
          setPrompt(
            event.target.value
          )
        }
        placeholder="Example: Kreative Prints is a T-shirt printing business in Chennai. We create customized T-shirts for businesses, college events, birthdays, weddings, sports teams and special occasions."
        style={{
          width: "100%",
          boxSizing:
            "border-box",
          padding: "14px",
          border:
            "1px solid #c7d2fe",
          borderRadius: "10px",
          resize: "vertical",
          fontFamily:
            "inherit",
        }}
      />

      <button
        type="button"
        onClick={generate}
        disabled={loading}
        style={{
          marginTop: "15px",
          border: "none",
          background:
            "linear-gradient(135deg,#4f46e5,#7c3aed)",
          color: "#fff",
          padding:
            "13px 22px",
          borderRadius: "9px",
          fontWeight: 800,
          cursor: loading
            ? "not-allowed"
            : "pointer",
          opacity: loading
            ? 0.7
            : 1,
        }}
      >
        {loading
          ? "Generating..."
          : "✨ Generate Website Content"}
      </button>
    </div>
  );
}