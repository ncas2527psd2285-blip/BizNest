import type {
  BusinessHours,
} from "./WebsiteBuilderPage";

type Props = {
  value: BusinessHours;
  onChange: (
    value: BusinessHours
  ) => void;
};

const days: [
  keyof BusinessHours,
  string
][] = [
  ["monday", "Monday"],
  ["tuesday", "Tuesday"],
  ["wednesday", "Wednesday"],
  ["thursday", "Thursday"],
  ["friday", "Friday"],
  ["saturday", "Saturday"],
  ["sunday", "Sunday"],
];

export default function BusinessHoursStep({
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
        Business Hours
      </h2>

      <p
        style={{
          color: "#64748b",
        }}
      >
        Set the opening hours displayed
        on your website.
      </p>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gap: "12px",
        }}
      >
        {days.map(
          ([key, label]) => (
            <div
              key={key}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "150px 1fr",
                gap: "12px",
                alignItems:
                  "center",
              }}
            >
              <strong>
                {label}
              </strong>

              <input
                value={value[key]}
                onChange={(event) =>
                  onChange({
                    ...value,
                    [key]:
                      event.target
                        .value,
                  })
                }
                placeholder="09:00 - 18:00"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}