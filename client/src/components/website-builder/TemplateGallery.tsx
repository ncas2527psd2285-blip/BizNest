import type {
  WebsiteTemplate,
} from "./WebsiteBuilderPage";

type Props = {
  value: WebsiteTemplate;
  onChange: (
    value: WebsiteTemplate
  ) => void;
};

const templates = [
  [
    "modern-business",
    "Modern Business",
    "🏢",
    "Clean professional business website.",
  ],
  [
    "corporate-pro",
    "Corporate Pro",
    "💼",
    "Enterprise corporate website.",
  ],
  [
    "luxury-store",
    "Luxury Store",
    "💎",
    "Premium ecommerce design.",
  ],
  [
    "restaurant",
    "Restaurant",
    "🍽️",
    "Restaurant and food business.",
  ],
  [
    "portfolio",
    "Portfolio",
    "🎨",
    "Personal and professional portfolio.",
  ],
  [
    "creative-agency",
    "Creative Agency",
    "🚀",
    "Bold creative agency website.",
  ],
  [
    "medical",
    "Medical",
    "🏥",
    "Clinic and healthcare website.",
  ],
  [
    "real-estate",
    "Real Estate",
    "🏠",
    "Property and real estate website.",
  ],
  [
    "technology",
    "Technology",
    "⚡",
    "Technology company website.",
  ],
  [
    "minimal-shop",
    "Minimal Shop",
    "🛒",
    "Minimal ecommerce website.",
  ],
] as const;

export default function TemplateGallery({
  value,
  onChange,
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        border:
          "1px solid #e2e8f0",
        borderRadius: "14px",
      }}
    >
      <h2>
        Choose Website Template
      </h2>

      <p
        style={{
          color: "#64748b",
        }}
      >
        Choose a complete website
        design. Each template has a
        different structure.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: "18px",
          marginTop: "22px",
        }}
      >
        {templates.map(
          (template) => {
            const [
              id,
              name,
              icon,
              description,
            ] = template;

            const selected =
              value === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() =>
                  onChange(
                    id as WebsiteTemplate
                  )
                }
                style={{
                  textAlign: "left",
                  padding: "18px",
                  border: selected
                    ? "2px solid #2563eb"
                    : "1px solid #e2e8f0",
                  borderRadius: "14px",
                  background: selected
                    ? "#eff6ff"
                    : "#fff",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    height: "130px",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    background:
                      selected
                        ? "linear-gradient(135deg,#2563eb,#7c3aed)"
                        : "linear-gradient(135deg,#e2e8f0,#f8fafc)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "48px",
                  }}
                >
                  {icon}
                </div>

                <strong
                  style={{
                    fontSize: "17px",
                  }}
                >
                  {name}
                </strong>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </p>

                {selected && (
                  <span
                    style={{
                      color: "#2563eb",
                      fontWeight: 700,
                    }}
                  >
                    ✓ Selected
                  </span>
                )}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}