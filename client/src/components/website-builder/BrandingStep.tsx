import type {
  WebsiteTheme,
} from "./WebsiteBuilderPage";

type Props = {
  value: WebsiteTheme;
  onChange: (
    value: WebsiteTheme
  ) => void;
};

export default function BrandingStep({
  value,
  onChange,
}: Props) {
  const update = (
    key: keyof WebsiteTheme,
    newValue: string
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  const colors = [
    [
      "primaryColor",
      "Primary Color",
    ],
    [
      "secondaryColor",
      "Secondary Color",
    ],
    [
      "accentColor",
      "Accent Color",
    ],
    [
      "backgroundColor",
      "Background",
    ],
    [
      "textColor",
      "Text Color",
    ],
  ] as const;

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
        Brand & Design
      </h2>

      {colors.map(
        ([key, label]) => (
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
                marginBottom: "7px",
              }}
            >
              {label}
            </label>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <input
                type="color"
                value={
                  value[key]
                }
                onChange={(event) =>
                  update(
                    key,
                    event.target.value
                  )
                }
              />

              <input
                value={
                  value[key]
                }
                onChange={(event) =>
                  update(
                    key,
                    event.target.value
                  )
                }
                style={{
                  flex: 1,
                  padding:
                    "10px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius:
                    "8px",
                }}
              />
            </div>
          </div>
        )
      )}

      <div
        style={{
          marginTop: "18px",
        }}
      >
        <label
          style={{
            display: "block",
            fontWeight: 600,
            marginBottom: "7px",
          }}
        >
          Font
        </label>

        <select
          value={value.fontFamily}
          onChange={(event) =>
            update(
              "fontFamily",
              event.target.value
            )
          }
          style={{
            width: "100%",
            padding: "11px",
            border:
              "1px solid #cbd5e1",
            borderRadius: "8px",
          }}
        >
          <option>
            Inter
          </option>
          <option>
            Arial
          </option>
          <option>
            Georgia
          </option>
          <option>
            Roboto
          </option>
        </select>
      </div>

      <div
        style={{
          marginTop: "18px",
        }}
      >
        <label
          style={{
            display: "block",
            fontWeight: 600,
            marginBottom: "7px",
          }}
        >
          Border Radius
        </label>

        <select
          value={
            value.borderRadius
          }
          onChange={(event) =>
            update(
              "borderRadius",
              event.target.value
            )
          }
          style={{
            width: "100%",
            padding: "11px",
            border:
              "1px solid #cbd5e1",
            borderRadius: "8px",
          }}
        >
          <option value="0px">
            Square
          </option>
          <option value="8px">
            Slight
          </option>
          <option value="12px">
            Modern
          </option>
          <option value="20px">
            Rounded
          </option>
          <option value="999px">
            Pill
          </option>
        </select>
      </div>
    </div>
  );
}