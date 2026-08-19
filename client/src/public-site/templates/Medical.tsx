import type { WebsiteTheme } from "../PublicWebsite";

type WebsiteSection = {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  enabled: boolean;
  order: number;
};

type WebsiteData = {
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  template: string;
  isPublished: boolean;
};

type Props = {
  website: WebsiteData;
  theme: Required<WebsiteTheme>;
  sections: WebsiteSection[];
};

export default function Medical({
  website,
  theme,
  sections,
}: Props) {
  const about = sections.find(
    (s) => s.id === "about" && s.enabled
  );

  const services = sections.find(
    (s) => s.id === "services" && s.enabled
  );

  const products = sections.find(
    (s) => s.id === "products" && s.enabled
  );

  const contact = sections.find(
    (s) => s.id === "contact" && s.enabled
  );

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#123047",
        fontFamily: theme.fontFamily,
      }}
    >
      {/* TOP INFORMATION BAR */}

      <div
        style={{
          background: "#eef8f8",
          borderBottom: "1px solid #d9eeee",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            color: "#54727c",
            fontSize: "11px",
          }}
        >
          <span>
            Professional care. Trusted expertise.
          </span>

          <span>
            {website.name}
          </span>
        </div>
      </div>

      {/* HEADER */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(15px)",
          borderBottom: "1px solid #e4eeee",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "82px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "25px",
          }}
        >
          <button
            type="button"
            onClick={() => scrollTo("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              padding: 0,
              background: "transparent",
              color: "#123047",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span
              style={{
                width: "42px",
                height: "42px",
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                background: theme.primaryColor,
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: 900,
              }}
            >
              +
            </span>

            <span>
              <strong
                style={{
                  display: "block",
                  fontSize: "17px",
                }}
              >
                {website.name}
              </strong>

              <small
                style={{
                  display: "block",
                  marginTop: "2px",
                  color: "#78909a",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Health & Care
              </small>
            </span>
          </button>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <button
              type="button"
              onClick={() => scrollTo("home")}
              style={{
                padding: 0,
                background: "transparent",
                color: "#57717c",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Home
            </button>

            {about && (
              <button
                type="button"
                onClick={() => scrollTo("about")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#57717c",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                About
              </button>
            )}

            {services && (
              <button
                type="button"
                onClick={() => scrollTo("services")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#57717c",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Services
              </button>
            )}

            {products && (
              <button
                type="button"
                onClick={() => scrollTo("products")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#57717c",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Facilities
              </button>
            )}

            {contact && (
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#57717c",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Contact
              </button>
            )}
          </nav>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "12px 19px",
              borderRadius: "8px",
              background: theme.primaryColor,
              color: "#ffffff",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Book Appointment
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#f5fbfb 0%,#e8f5f5 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            right: "-180px",
            top: "-180px",
            borderRadius: "50%",
            background: theme.primaryColor,
            opacity: 0.06,
          }}
        />

        <div
          className="modern-container"
          style={{
            minHeight: "650px",
            display: "grid",
            gridTemplateColumns: "1fr 0.85fr",
            gap: "75px",
            alignItems: "center",
            padding: "90px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "7px 12px",
                borderRadius: "999px",
                background: "#ffffff",
                color: theme.primaryColor,
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: theme.primaryColor,
                }}
              />

              Caring for you
            </div>

            <h1
              style={{
                maxWidth: "750px",
                margin: "24px 0 0",
                color: "#123047",
                fontSize: "clamp(45px,5.5vw,70px)",
                lineHeight: 1.04,
                letterSpacing: "-0.05em",
              }}
            >
              {website.tagline ||
                `Better care starts with ${website.name}`}
            </h1>

            <p
              style={{
                maxWidth: "650px",
                margin: "25px 0 0",
                color: "#607d87",
                fontSize: "18px",
                lineHeight: 1.8,
              }}
            >
              {website.description ||
                "Professional, compassionate and dependable care delivered with modern expertise and a patient-first approach."}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "32px",
              }}
            >
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: "14px 23px",
                  borderRadius: "8px",
                  background: theme.primaryColor,
                  color: "#ffffff",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Book an Appointment
              </button>

              {services && (
                <button
                  type="button"
                  onClick={() => scrollTo("services")}
                  style={{
                    padding: "14px 23px",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#123047",
                    border: "1px solid #cce1e1",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Explore Services
                </button>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "25px",
                flexWrap: "wrap",
                marginTop: "38px",
                color: "#607d87",
                fontSize: "12px",
              }}
            >
              <span>✓ Experienced team</span>
              <span>✓ Patient focused</span>
              <span>✓ Modern facilities</span>
            </div>
          </div>

          <div>
            <div
              style={{
                position: "relative",
                minHeight: "470px",
                overflow: "hidden",
                borderRadius: "22px",
                background:
                  "linear-gradient(145deg,#d8eeee,#a9d6d8)",
                boxShadow:
                  "0 25px 65px rgba(20,100,110,0.12)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "290px",
                  height: "290px",
                  borderRadius: "50%",
                  left: "50%",
                  top: "75px",
                  transform: "translateX(-50%)",
                  background:
                    "radial-gradient(circle,#ffffff 0%,#d8eeee 60%,#9fcacc 100%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "150px",
                  transform: "translateX(-50%)",
                  width: "110px",
                  height: "110px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  background: "#ffffff",
                  color: theme.primaryColor,
                  fontSize: "45px",
                  fontWeight: 300,
                  boxShadow:
                    "0 15px 40px rgba(0,0,0,0.1)",
                }}
              >
                +
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  bottom: "35px",
                  textAlign: "center",
                  padding: "0 25px",
                }}
              >
                <span
                  style={{
                    color: "#47727b",
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Trusted Care
                </span>

                <h2
                  style={{
                    margin: "9px 0 4px",
                    color: "#123047",
                    fontSize: "29px",
                  }}
                >
                  {website.name}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#57717c",
                    fontSize: "12px",
                  }}
                >
                  Your health matters to us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}

      <section
        style={{
          padding: "35px 0",
          background: "#123047",
          color: "#ffffff",
        }}
      >
        <div
          className="modern-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "30px",
            textAlign: "center",
          }}
        >
          <div>
            <strong
              style={{
                display: "block",
                fontSize: "19px",
              }}
            >
              Patient First
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "5px",
                color: "#a9c1cc",
                fontSize: "11px",
              }}
            >
              Care designed around you
            </span>
          </div>

          <div>
            <strong
              style={{
                display: "block",
                fontSize: "19px",
              }}
            >
              Professional
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "5px",
                color: "#a9c1cc",
                fontSize: "11px",
              }}
            >
              Experienced healthcare
            </span>
          </div>

          <div>
            <strong
              style={{
                display: "block",
                fontSize: "19px",
              }}
            >
              Compassionate
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "5px",
                color: "#a9c1cc",
                fontSize: "11px",
              }}
            >
              Human-centered service
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      {about && (
        <section
          id="about"
          style={{
            padding: "105px 0",
            background: "#ffffff",
          }}
        >
          <div
            className="modern-container"
            style={{
              display: "grid",
              gridTemplateColumns: "0.75fr 1.25fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                About Us
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  color: "#123047",
                  fontSize: "43px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                }}
              >
                {about.title &&
                about.title !== "About"
                  ? about.title
                  : "Care you can trust."}
              </h2>
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: "#607d87",
                  fontSize: "18px",
                  lineHeight: 1.9,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} is committed to delivering dependable care through expertise, technology and genuine compassion.`}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap: "15px",
                  marginTop: "35px",
                }}
              >
                {[
                  ["01", "Expertise"],
                  ["02", "Safety"],
                  ["03", "Care"],
                ].map(([number, title]) => (
                  <div
                    key={number}
                    style={{
                      padding: "20px",
                      background: "#f3fafa",
                      border: "1px solid #deeeee",
                      borderRadius: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: theme.primaryColor,
                        fontSize: "11px",
                        fontWeight: 900,
                      }}
                    >
                      {number}
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "14px",
                        color: "#123047",
                        fontSize: "15px",
                      }}
                    >
                      {title}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}

      {services && (
        <section
          id="services"
          style={{
            padding: "105px 0",
            background: "#f4fafa",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                maxWidth: "700px",
                margin: "0 auto 50px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Healthcare Services
              </span>

              <h2
                style={{
                  margin: "13px 0 0",
                  color: "#123047",
                  fontSize: "45px",
                  lineHeight: 1.1,
                }}
              >
                {services.title &&
                services.title !== "Services"
                  ? services.title
                  : "How we can help"}
              </h2>

              <p
                style={{
                  margin: "13px 0 0",
                  color: "#607d87",
                  lineHeight: 1.8,
                }}
              >
                {services.subtitle ||
                  "Professional services designed around your health and wellbeing."}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3,1fr)",
                gap: "18px",
              }}
            >
              {[
                [
                  "Primary Care",
                  "Comprehensive care for everyday health needs and ongoing wellbeing.",
                ],
                [
                  "Specialist Care",
                  "Focused expertise and support for specific healthcare requirements.",
                ],
                [
                  "Preventive Care",
                  "Proactive guidance to help you maintain better long-term health.",
                ],
                [
                  "Diagnostics",
                  "Modern diagnostic support to help inform better healthcare decisions.",
                ],
                [
                  "Wellness",
                  "Personalized support for healthier habits and improved quality of life.",
                ],
                [
                  "Follow-up Care",
                  "Ongoing support and guidance throughout your healthcare journey.",
                ],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  style={{
                    minHeight: "235px",
                    padding: "28px",
                    background: "#ffffff",
                    border: "1px solid #dceced",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "10px",
                      background: `${theme.primaryColor}12`,
                      color: theme.primaryColor,
                      fontWeight: 900,
                    }}
                  >
                    {index + 1}
                  </div>

                  <h3
                    style={{
                      margin: "22px 0 9px",
                      color: "#123047",
                      fontSize: "19px",
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#66808a",
                      fontSize: "13px",
                      lineHeight: 1.75,
                    }}
                  >
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FACILITIES */}

      {products && (
        <section
          id="products"
          style={{
            padding: "105px 0",
            background: "#ffffff",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "0.8fr 1.2fr",
                gap: "75px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  minHeight: "400px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(145deg,#d9efef,#b8dfe1)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "30px",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "#47727b",
                      fontSize: "10px",
                      fontWeight: 900,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Our Facilities
                  </span>

                  <h2
                    style={{
                      margin: "12px 0 0",
                      color: "#123047",
                      fontSize: "40px",
                      lineHeight: 1.1,
                    }}
                  >
                    {products.title &&
                    products.title !== "Products"
                      ? products.title
                      : "Modern facilities"}
                  </h2>
                </div>
              </div>

              <div>
                <span
                  style={{
                    color: theme.primaryColor,
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Patient Experience
                </span>

                <h2
                  style={{
                    margin: "13px 0 0",
                    color: "#123047",
                    fontSize: "43px",
                    lineHeight: 1.1,
                  }}
                >
                  Designed for comfort
                  and confidence.
                </h2>

                <p
                  style={{
                    margin: "20px 0 0",
                    color: "#607d87",
                    lineHeight: 1.85,
                  }}
                >
                  We combine a welcoming
                  environment, modern systems
                  and professional processes
                  to make every visit as
                  comfortable as possible.
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: "13px",
                    marginTop: "25px",
                  }}
                >
                  {[
                    "Comfortable environment",
                    "Modern equipment",
                    "Professional support",
                    "Patient-focused process",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#42636e",
                        fontSize: "14px",
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          display: "grid",
                          placeItems: "center",
                          borderRadius: "50%",
                          background: `${theme.primaryColor}15`,
                          color: theme.primaryColor,
                          fontSize: "11px",
                          fontWeight: 900,
                        }}
                      >
                        ✓
                      </span>

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}

      <section
        style={{
          padding: "80px 0",
          background: theme.primaryColor,
          color: "#ffffff",
        }}
      >
        <div
          className="modern-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.75,
              }}
            >
              Need an Appointment?
            </span>

            <h2
              style={{
                margin: "11px 0 0",
                fontSize: "35px",
                lineHeight: 1.1,
              }}
            >
              Your health is worth
              prioritizing.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "14px 23px",
              borderRadius: "8px",
              background: "#ffffff",
              color: theme.primaryColor,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Book Appointment →
          </button>
        </div>
      </section>

      {/* CONTACT */}

      {contact && (
        <section
          id="contact"
          style={{
            padding: "105px 0",
            background: "#f4fafa",
          }}
        >
          <div
            className="modern-container"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 0.9fr",
              gap: "65px",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Contact
              </span>

              <h2
                style={{
                  margin: "14px 0",
                  color: "#123047",
                  fontSize: "45px",
                  lineHeight: 1.08,
                }}
              >
                We're here to
                help.
              </h2>

              <p
                style={{
                  maxWidth: "550px",
                  margin: 0,
                  color: "#607d87",
                  lineHeight: 1.8,
                }}
              >
                {contact.content ||
                  `Contact ${website.name} for appointments, enquiries and more information.`}
              </p>
            </div>

            <div
              style={{
                padding: "30px",
                background: "#ffffff",
                border: "1px solid #dceced",
                borderRadius: "14px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px",
                  color: "#123047",
                  fontSize: "22px",
                }}
              >
                Request an Appointment
              </h3>

              <p
                style={{
                  margin: "0 0 20px",
                  color: "#78909a",
                  fontSize: "13px",
                }}
              >
                Contact us and our team will
                assist you.
              </p>

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    `mailto:?subject=${encodeURIComponent(
                      `Appointment request - ${website.name}`
                    )}&body=${encodeURIComponent(
                      `Hello ${website.name}, I would like to request an appointment.`
                    )}`)
                }
                style={{
                  width: "100%",
                  minHeight: "48px",
                  borderRadius: "8px",
                  background: theme.primaryColor,
                  color: "#ffffff",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Send Appointment Request
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer
        style={{
          padding: "45px 0 22px",
          background: "#123047",
          color: "#ffffff",
        }}
      >
        <div className="modern-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "25px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong
                style={{
                  fontSize: "17px",
                }}
              >
                {website.name}
              </strong>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#8da8b3",
                  fontSize: "12px",
                }}
              >
                {website.tagline ||
                  "Professional care with a human touch."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("home")}
              style={{
                padding: 0,
                background: "transparent",
                color: "#8ed5d5",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Back to top ↑
            </button>
          </div>

          <div
            style={{
              marginTop: "35px",
              paddingTop: "20px",
              borderTop:
                "1px solid rgba(255,255,255,0.1)",
              color: "#66808c",
              fontSize: "11px",
            }}
          >
            © {new Date().getFullYear()}{" "}
            {website.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}