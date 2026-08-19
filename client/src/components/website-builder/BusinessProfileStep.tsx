import type {
  BusinessProfile,
} from "./WebsiteBuilderPage";

type Props = {
  value: BusinessProfile;
  onChange: (
    value: BusinessProfile
  ) => void;
};

export default function BusinessProfileStep({
  value,
  onChange,
}: Props) {
  const update = (
    key: keyof BusinessProfile,
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
      <h2>Business Profile</h2>

      <p
        style={{
          color: "#64748b",
        }}
      >
        Tell BizNest about your
        business.
      </p>

      {[
        ["name", "Business Name"],
        ["type", "Business Type"],
        ["tagline", "Tagline"],
        [
          "foundedYear",
          "Founded Year",
        ],
        [
          "logoUrl",
          "Logo URL",
        ],
        [
          "coverImageUrl",
          "Cover Image URL",
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
              marginBottom: "7px",
              fontWeight: 600,
            }}
          >
            {label}
          </label>

          <input
            value={
              value[
                key as keyof BusinessProfile
              ]
            }
            onChange={(event) =>
              update(
                key as keyof BusinessProfile,
                event.target.value
              )
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "11px 13px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "8px",
            }}
          />
        </div>
      ))}

      <div
        style={{
          marginTop: "18px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "7px",
            fontWeight: 600,
          }}
        >
          Business Description
        </label>

        <textarea
          rows={7}
          value={value.description}
          onChange={(event) =>
            update(
              "description",
              event.target.value
            )
          }
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "11px 13px",
            border:
              "1px solid #cbd5e1",
            borderRadius: "8px",
            resize: "vertical",
          }}
        />
      </div>
    </div>
  );
}