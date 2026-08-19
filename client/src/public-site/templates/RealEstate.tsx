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

export default function RealEstate({
  website,
  theme,
  sections,
}: Props) {
  const about = sections.find(
    (s) => s.id === "about" && s.enabled
  );

  const products = sections.find(
    (s) => s.id === "products" && s.enabled
  );

  const services = sections.find(
    (s) => s.id === "services" && s.enabled
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

  const properties = [
    {
      type: "Modern Residence",
      location: "Chennai",
      price: "₹85 Lakh",
      size: "1,850 sq.ft",
    },
    {
      type: "Premium Apartment",
      location: "Avadi",
      price: "₹62 Lakh",
      size: "1,420 sq.ft",
    },
    {
      type: "Luxury Villa",
      location: "Chennai",
      price: "₹1.45 Cr",
      size: "2,850 sq.ft",
    },
    {
      type: "Commercial Space",
      location: "Ambattur",
      price: "₹95 Lakh",
      size: "2,100 sq.ft",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f5f0",
        color: "#20211f",
        fontFamily: theme.fontFamily,
      }}
    >
      {/* HEADER */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(247,245,240,0.96)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #ddd8cd",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "80px",
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
              padding: 0,
              background: "transparent",
              color: "#20211f",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <strong
              style={{
                display: "block",
                fontFamily: "Georgia, serif",
                fontSize: "21px",
                fontWeight: 500,
              }}
            >
              {website.name}
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "3px",
                color: "#817b70",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Properties & Real Estate
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
                color: "#69655d",
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
                  color: "#69655d",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                About
              </button>
            )}

            {products && (
              <button
                type="button"
                onClick={() => scrollTo("properties")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#69655d",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Properties
              </button>
            )}

            {services && (
              <button
                type="button"
                onClick={() => scrollTo("services")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#69655d",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Services
              </button>
            )}

            {contact && (
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#69655d",
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
              borderRadius: "4px",
              background: theme.primaryColor,
              color: "#ffffff",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Find a Property
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "680px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#eee9df 0%,#ddd5c7 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,rgba(25,27,24,0.72),rgba(25,27,24,0.1))",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            right: "-220px",
            top: "-220px",
            borderRadius: "50%",
            background: theme.primaryColor,
            opacity: 0.08,
          }}
        />

        <div
          className="modern-container"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            padding: "105px 0",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              color: "#ffffff",
            }}
          >
            <span
              style={{
                display: "inline-block",
                marginBottom: "20px",
                color: "#d9bd87",
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Exceptional Properties
            </span>

            <h1
              style={{
                margin: 0,
                fontFamily: "Georgia, serif",
                fontSize: "clamp(48px,6.5vw,82px)",
                lineHeight: 0.98,
                fontWeight: 400,
                letterSpacing: "-0.04em",
              }}
            >
              {website.tagline ||
                `Find a place you'll be proud to call home.`}
            </h1>

            <p
              style={{
                maxWidth: "650px",
                margin: "27px 0 0",
                color: "rgba(255,255,255,0.78)",
                fontSize: "18px",
                lineHeight: 1.8,
              }}
            >
              {website.description ||
                `${website.name} helps you discover exceptional properties with professional guidance from search to closing.`}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "33px",
              }}
            >
              {products && (
                <button
                  type="button"
                  onClick={() => scrollTo("properties")}
                  style={{
                    padding: "14px 23px",
                    borderRadius: "4px",
                    background: theme.primaryColor,
                    color: "#ffffff",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  Explore Properties
                </button>
              )}

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: "14px 23px",
                  borderRadius: "4px",
                  background: "#ffffff",
                  color: "#20211f",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Talk to an Advisor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}

      <section
        style={{
          background: "#20211f",
          color: "#ffffff",
          padding: "35px 0",
        }}
      >
        <div
          className="modern-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "25px",
            textAlign: "center",
          }}
        >
          {[
            ["150+", "Properties"],
            ["12+", "Years Experience"],
            ["98%", "Happy Clients"],
            ["24/7", "Support"],
          ].map(([number, label]) => (
            <div key={label}>
              <strong
                style={{
                  display: "block",
                  color: "#d9bd87",
                  fontFamily: "Georgia, serif",
                  fontSize: "27px",
                  fontWeight: 400,
                }}
              >
                {number}
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "#a9a69d",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}

      {about && (
        <section
          id="about"
          style={{
            padding: "110px 0",
            background: "#ffffff",
          }}
        >
          <div
            className="modern-container"
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.2fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                minHeight: "390px",
                padding: "35px",
                display: "flex",
                alignItems: "flex-end",
                background:
                  "linear-gradient(145deg,#e6dccb,#bcae97)",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#705d42",
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Our Approach
                </span>

                <h2
                  style={{
                    margin: "12px 0 0",
                    color: "#292820",
                    fontFamily: "Georgia, serif",
                    fontSize: "42px",
                    fontWeight: 400,
                    lineHeight: 1.05,
                  }}
                >
                  Property decisions
                  made simpler.
                </h2>
              </div>
            </div>

            <div>
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                About {website.name}
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  color: "#20211f",
                  fontFamily: "Georgia, serif",
                  fontSize: "44px",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                {about.title &&
                about.title !== "About"
                  ? about.title
                  : "A better way to find property."}
              </h2>

              <p
                style={{
                  margin: "23px 0 0",
                  color: "#6c6b64",
                  fontSize: "17px",
                  lineHeight: 1.9,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} provides professional property guidance with a focus on transparency, quality and long-term relationships.`}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap: "12px",
                  marginTop: "32px",
                }}
              >
                {[
                  ["01", "Trusted"],
                  ["02", "Transparent"],
                  ["03", "Experienced"],
                ].map(([number, title]) => (
                  <div
                    key={title}
                    style={{
                      padding: "18px",
                      background: "#f7f5f0",
                      border: "1px solid #e3dfd5",
                    }}
                  >
                    <span
                      style={{
                        color: theme.primaryColor,
                        fontSize: "10px",
                        fontWeight: 900,
                      }}
                    >
                      {number}
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "13px",
                        color: "#33332e",
                        fontSize: "13px",
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

      {/* PROPERTIES */}

      {products && (
        <section
          id="properties"
          style={{
            padding: "110px 0",
            background: "#f7f5f0",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "30px",
                marginBottom: "55px",
              }}
            >
              <div>
                <span
                  style={{
                    color: theme.primaryColor,
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Featured Properties
                </span>

                <h2
                  style={{
                    margin: "13px 0 0",
                    color: "#20211f",
                    fontFamily: "Georgia, serif",
                    fontSize: "48px",
                    fontWeight: 400,
                  }}
                >
                  {products.title &&
                  products.title !== "Products"
                    ? products.title
                    : "Find your next address"}
                </h2>
              </div>

              <p
                style={{
                  maxWidth: "390px",
                  margin: 0,
                  color: "#77766e",
                  lineHeight: 1.7,
                }}
              >
                Explore a selection of properties
                chosen for quality, location and
                long-term value.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,1fr)",
                gap: "20px",
              }}
            >
              {properties.map(
                (property, index) => (
                  <article
                    key={property.type}
                    style={{
                      overflow: "hidden",
                      background: "#ffffff",
                      border: "1px solid #dfdcd4",
                    }}
                  >
                    <div
                      style={{
                        height: "240px",
                        position: "relative",
                        background:
                          index % 2 === 0
                            ? "linear-gradient(145deg,#d9d2c5,#afa390)"
                            : "linear-gradient(145deg,#d5d8d3,#9ca69b)",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "25px",
                          top: "25px",
                          padding: "7px 10px",
                          background:
                            "rgba(255,255,255,0.9)",
                          color: "#4b4a43",
                          fontSize: "9px",
                          fontWeight: 900,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        For Sale
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          right: "25px",
                          bottom: "22px",
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          background:
                            "rgba(255,255,255,0.18)",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        padding: "25px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          gap: "15px",
                          alignItems: "start",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              color: "#918d84",
                              fontSize: "9px",
                              fontWeight: 900,
                              letterSpacing: "0.12em",
                              textTransform:
                                "uppercase",
                            }}
                          >
                            {property.location}
                          </span>

                          <h3
                            style={{
                              margin:
                                "8px 0 0",
                              color: "#292820",
                              fontFamily:
                                "Georgia, serif",
                              fontSize: "23px",
                              fontWeight: 400,
                            }}
                          >
                            {property.type}
                          </h3>
                        </div>

                        <strong
                          style={{
                            color:
                              theme.primaryColor,
                            fontSize: "15px",
                          }}
                        >
                          {property.price}
                        </strong>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          gap: "15px",
                          marginTop: "20px",
                          paddingTop: "17px",
                          borderTop:
                            "1px solid #e7e4dc",
                        }}
                      >
                        <span
                          style={{
                            color: "#747269",
                            fontSize: "12px",
                          }}
                        >
                          {property.size}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            scrollTo("contact")
                          }
                          style={{
                            padding: 0,
                            background:
                              "transparent",
                            color:
                              theme.primaryColor,
                            fontWeight: 900,
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Enquire →
                        </button>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}

      {services && (
        <section
          id="services"
          style={{
            padding: "110px 0",
            background: "#ffffff",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                maxWidth: "700px",
                marginBottom: "50px",
              }}
            >
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Our Services
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  color: "#20211f",
                  fontFamily: "Georgia, serif",
                  fontSize: "47px",
                  fontWeight: 400,
                }}
              >
                {services.title &&
                services.title !== "Services"
                  ? services.title
                  : "Everything you need"}
              </h2>

              <p
                style={{
                  margin: "15px 0 0",
                  color: "#77766e",
                  lineHeight: 1.8,
                }}
              >
                {services.subtitle ||
                  "Professional support throughout your property journey."}
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
                  "Buying",
                  "Find the right property based on your budget, lifestyle and goals.",
                ],
                [
                  "Selling",
                  "Present your property professionally and connect with qualified buyers.",
                ],
                [
                  "Investment",
                  "Identify opportunities with strong potential and informed guidance.",
                ],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  style={{
                    minHeight: "250px",
                    padding: "30px",
                    background: "#f7f5f0",
                    border: "1px solid #e1ded5",
                  }}
                >
                  <span
                    style={{
                      color: theme.primaryColor,
                      fontSize: "11px",
                      fontWeight: 900,
                    }}
                  >
                    0{index + 1}
                  </span>

                  <h3
                    style={{
                      margin: "30px 0 10px",
                      color: "#292820",
                      fontFamily: "Georgia, serif",
                      fontSize: "23px",
                      fontWeight: 400,
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#77766e",
                      lineHeight: 1.75,
                      fontSize: "13px",
                    }}
                  >
                    {text}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      scrollTo("contact")
                    }
                    style={{
                      marginTop: "20px",
                      padding: 0,
                      background: "transparent",
                      color: theme.primaryColor,
                      fontWeight: 900,
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Learn More →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}

      <section
        style={{
          padding: "90px 0",
          background: "#20211f",
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
                color: "#d9bd87",
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Your Next Move
            </span>

            <h2
              style={{
                margin: "13px 0 0",
                fontFamily: "Georgia, serif",
                fontSize: "42px",
                fontWeight: 400,
              }}
            >
              Let's find the right
              property for you.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "15px 25px",
              borderRadius: "4px",
              background: theme.primaryColor,
              color: "#ffffff",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Talk to an Expert →
          </button>
        </div>
      </section>

      {/* CONTACT */}

      {contact && (
        <section
          id="contact"
          style={{
            padding: "110px 0",
            background: "#f7f5f0",
          }}
        >
          <div
            className="modern-container"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 0.85fr",
              gap: "70px",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Contact
              </span>

              <h2
                style={{
                  margin: "14px 0",
                  color: "#20211f",
                  fontFamily: "Georgia, serif",
                  fontSize: "48px",
                  fontWeight: 400,
                  lineHeight: 1.05,
                }}
              >
                Tell us what
                you're looking for.
              </h2>

              <p
                style={{
                  maxWidth: "570px",
                  margin: 0,
                  color: "#77766e",
                  lineHeight: 1.8,
                }}
              >
                {contact.content ||
                  `Contact ${website.name} and our property specialists will help you take the next step.`}
              </p>
            </div>

            <div
              style={{
                padding: "30px",
                background: "#ffffff",
                border: "1px solid #dedbd2",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#292820",
                  fontFamily: "Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 400,
                }}
              >
                Property Enquiry
              </h3>

              <p
                style={{
                  margin: "8px 0 22px",
                  color: "#858279",
                  fontSize: "12px",
                }}
              >
                Start a conversation with our
                property team.
              </p>

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    `mailto:?subject=${encodeURIComponent(
                      `Property enquiry - ${website.name}`
                    )}&body=${encodeURIComponent(
                      `Hello ${website.name}, I would like to enquire about a property.`
                    )}`)
                }
                style={{
                  width: "100%",
                  minHeight: "48px",
                  borderRadius: "4px",
                  background: theme.primaryColor,
                  color: "#ffffff",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer
        style={{
          padding: "48px 0 22px",
          background: "#20211f",
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
                  fontFamily: "Georgia, serif",
                  fontSize: "19px",
                  fontWeight: 400,
                }}
              >
                {website.name}
              </strong>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#8b8a82",
                  fontSize: "11px",
                }}
              >
                {website.tagline ||
                  "Exceptional properties. Professional guidance."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("home")}
              style={{
                padding: 0,
                background: "transparent",
                color: "#d9bd87",
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
              color: "#5e5e58",
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