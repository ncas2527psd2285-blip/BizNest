import type {
  WebsiteSettings,
} from "./WebsiteBuilderPage";

type Props = {
  value: WebsiteSettings;
  onChange: (
    value: WebsiteSettings
  ) => void;
};

export default function ProductSettings({
  value,
  onChange,
}: Props) {
  const options: [
    keyof WebsiteSettings,
    string,
    string
  ][] = [
    [
      "showProducts",
      "Show Products",
      "Display BizNest products on the website.",
    ],
    [
      "showPrices",
      "Show Prices",
      "Display product prices.",
    ],
    [
      "showStock",
      "Show Stock",
      "Display product stock status.",
    ],
    [
      "showContactForm",
      "Contact Form",
      "Allow website visitors to contact the business.",
    ],
  ];

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
        Products & Website
      </h2>

      <p
        style={{
          color: "#64748b",
        }}
      >
        Configure how your BizNest
        business data appears on
        your website.
      </p>

      {options.map(
        ([key, label, description]) => (
          <label
            key={key}
            style={{
              display: "flex",
              gap: "12px",
              padding:
                "16px 0",
              borderBottom:
                "1px solid #f1f5f9",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={
                value[key] as boolean
              }
              onChange={(event) =>
                onChange({
                  ...value,
                  [key]:
                    event.target
                      .checked,
                })
              }
            />

            <span>
              <strong>
                {label}
              </strong>

              <small
                style={{
                  display: "block",
                  color: "#64748b",
                  marginTop:
                    "3px",
                }}
              >
                {description}
              </small>
            </span>
          </label>
        )
      )}
    </div>
  );
}