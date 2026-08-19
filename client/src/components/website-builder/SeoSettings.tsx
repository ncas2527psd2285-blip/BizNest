import type {
  SeoSettings as SeoSettingsType,
} from "./WebsiteBuilderPage";

type Props = {
  value: SeoSettingsType;
  onChange: (
    value: SeoSettingsType
  ) => void;
};

export default function SeoSettings({
  value,
  onChange,
}: Props) {
  const update = (
    key: keyof SeoSettingsType,
    newValue: string
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

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
        SEO Settings
      </h2>

      <p
        style={{
          color: "#64748b",
        }}
      >
        Improve how your website
        appears in search engines.
      </p>

      {[
        ["title", "SEO Title"],
        [
          "description",
          "SEO Description",
        ],
        [
          "keywords",
          "SEO Keywords",
        ],
        [
          "ogImage",
          "Open Graph Image",
        ],
        [
          "favicon",
          "Favicon URL",
        ],
      ].map(([key, label]) => (
        <div
          key={key}
          style={{
            marginTop: "18px",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {label}
          </label>

          {key ===
          "description" ? (
            <textarea
              rows={5}
              value={
                value[
                  key as keyof SeoSettingsType
                ]
              }
              onChange={(event) =>
                update(
                  key as keyof SeoSettingsType,
                  event.target.value
                )
              }
              style={{
                width: "100%",
                boxSizing:
                  "border-box",
                padding: "10px",
                border:
                  "1px solid #cbd5e1",
                borderRadius:
                  "8px",
              }}
            />
          ) : (
            <input
              value={
                value[
                  key as keyof SeoSettingsType
                ]
              }
              onChange={(event) =>
                update(
                  key as keyof SeoSettingsType,
                  event.target.value
                )
              }
              style={{
                width: "100%",
                boxSizing:
                  "border-box",
                padding: "10px",
                border:
                  "1px solid #cbd5e1",
                borderRadius:
                  "8px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}