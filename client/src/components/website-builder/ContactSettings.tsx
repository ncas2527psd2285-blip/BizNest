import type {
  ContactDetails,
} from "./WebsiteBuilderPage";

type Props = {
  value: ContactDetails;
  onChange: (
    value: ContactDetails
  ) => void;
};

export default function ContactSettings({
  value,
  onChange,
}: Props) {
  const fields: [
    keyof ContactDetails,
    string
  ][] = [
    ["email", "Email"],
    ["phone", "Phone"],
    ["whatsapp", "WhatsApp"],
    ["address", "Address"],
    ["city", "City"],
    ["state", "State"],
    ["country", "Country"],
    ["mapUrl", "Google Maps URL"],
    ["instagram", "Instagram"],
    ["facebook", "Facebook"],
    ["linkedin", "LinkedIn"],
    ["youtube", "YouTube"],
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
        Contact & Social Media
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {fields.map(
          ([key, label]) => (
            <div key={key}>
              <label
                style={{
                  display:
                    "block",
                  fontWeight: 600,
                  marginBottom:
                    "6px",
                }}
              >
                {label}
              </label>

              <input
                value={value[key]}
                onChange={(
                  event
                ) =>
                  onChange({
                    ...value,
                    [key]:
                      event.target
                        .value,
                  })
                }
                style={{
                  width: "100%",
                  boxSizing:
                    "border-box",
                  padding:
                    "10px 12px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius:
                    "8px",
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}