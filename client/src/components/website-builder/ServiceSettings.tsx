import { useState } from "react";

export default function ServiceSettings() {
  const [services, setServices] =
    useState([
      "Consultation",
      "Installation",
      "Repair & Support",
    ]);

  const [newService, setNewService] =
    useState("");

  const addService = () => {
    if (!newService.trim()) return;

    setServices([
      ...services,
      newService.trim(),
    ]);

    setNewService("");
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
        Services
      </h2>

      <p
        style={{
          color: "#64748b",
        }}
      >
        Configure the services
        displayed on your website.
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          value={newService}
          onChange={(event) =>
            setNewService(
              event.target.value
            )
          }
          placeholder="Service name"
          style={{
            flex: 1,
            padding: "11px",
            border:
              "1px solid #cbd5e1",
            borderRadius: "8px",
          }}
        />

        <button
          type="button"
          onClick={addService}
          style={{
            border: "none",
            background: "#2563eb",
            color: "#fff",
            padding:
              "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gap: "10px",
        }}
      >
        {services.map(
          (service) => (
            <div
              key={service}
              style={{
                padding:
                  "15px",
                border:
                  "1px solid #e2e8f0",
                borderRadius:
                  "9px",
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <strong>
                {service}
              </strong>

              <button
                type="button"
                onClick={() =>
                  setServices(
                    services.filter(
                      (item) =>
                        item !==
                        service
                    )
                  )
                }
                style={{
                  border: "none",
                  background:
                    "transparent",
                  color:
                    "#dc2626",
                  cursor:
                    "pointer",
                }}
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}