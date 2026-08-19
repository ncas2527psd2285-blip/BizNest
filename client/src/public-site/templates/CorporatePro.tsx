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

export default function CorporatePro({
  website,
  theme,
  sections,
}: Props) {
  const contact = sections.find(
    (section) =>
      section.id === "contact" &&
      section.enabled
  );

  const products = sections.find(
    (section) =>
      section.id === "products" &&
      section.enabled
  );

  const services = sections.find(
    (section) =>
      section.id === "services" &&
      section.enabled
  );

  const about = sections.find(
    (section) =>
      section.id === "about" &&
      section.enabled
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
        fontFamily: theme.fontFamily,
        color: theme.textColor,
        background: "#ffffff",
      }}
    >
      {/* TOP BAR */}

      <div
        style={{
          background: "#0f172a",
          color: "#ffffff",
          fontSize: "12px",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "20px",
          }}
        >
          <span>
            Professional solutions
            you can trust
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
          background:
            "rgba(255,255,255,0.96)",
          backdropFilter:
            "blur(14px)",
          borderBottom:
            "1px solid #e2e8f0",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "82px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "30px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              scrollTo("home")
            }
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: "12px",
              padding: 0,
              background:
                "transparent",
              color: "#0f172a",
              cursor:
                "pointer",
            }}
          >
            <span
              style={{
                width: "42px",
                height: "42px",
                display: "grid",
                placeItems:
                  "center",
                borderRadius: "8px",
                background:
                  theme.primaryColor,
                color: "#ffffff",
                fontWeight: 900,
              }}
            >
              {website.name
                .charAt(0)
                .toUpperCase()}
            </span>

            <strong
              style={{
                fontSize: "18px",
              }}
            >
              {website.name}
            </strong>
          </button>

          <nav
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: "26px",
            }}
          >
            <button
              type="button"
              onClick={() =>
                scrollTo("home")
              }
              style={{
                background:
                  "transparent",
                color: "#475569",
                cursor:
                  "pointer",
                fontWeight: 600,
              }}
            >
              Home
            </button>

            {about && (
              <button
                type="button"
                onClick={() =>
                  scrollTo("about")
                }
                style={{
                  background:
                    "transparent",
                  color:
                    "#475569",
                  cursor:
                    "pointer",
                  fontWeight: 600,
                }}
              >
                Company
              </button>
            )}

            {services && (
              <button
                type="button"
                onClick={() =>
                  scrollTo(
                    "services"
                  )
                }
                style={{
                  background:
                    "transparent",
                  color:
                    "#475569",
                  cursor:
                    "pointer",
                  fontWeight: 600,
                }}
              >
                Services
              </button>
            )}

            {products && (
              <button
                type="button"
                onClick={() =>
                  scrollTo(
                    "products"
                  )
                }
                style={{
                  background:
                    "transparent",
                  color:
                    "#475569",
                  cursor:
                    "pointer",
                  fontWeight: 600,
                }}
              >
                Products
              </button>
            )}

            {contact && (
              <button
                type="button"
                onClick={() =>
                  scrollTo(
                    "contact"
                  )
                }
                style={{
                  background:
                    "transparent",
                  color:
                    "#475569",
                  cursor:
                    "pointer",
                  fontWeight: 600,
                }}
              >
                Contact
              </button>
            )}
          </nav>

          <button
            type="button"
            onClick={() =>
              scrollTo("contact")
            }
            style={{
              padding:
                "12px 18px",
              borderRadius:
                "7px",
              background:
                theme.primaryColor,
              color: "#ffffff",
              fontWeight: 800,
              cursor:
                "pointer",
            }}
          >
            Request Consultation
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          background:
            "#f8fafc",
          borderBottom:
            "1px solid #e2e8f0",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight:
              "620px",
            display: "grid",
            gridTemplateColumns:
              "1fr 0.85fr",
            gap: "80px",
            alignItems:
              "center",
            padding:
              "80px 0",
          }}
        >
          <div>
            <div
              style={{
                display:
                  "inline-flex",
                alignItems:
                  "center",
                gap: "8px",
                marginBottom:
                  "20px",
                color:
                  theme.primaryColor,
                fontSize:
                  "12px",
                fontWeight:
                  900,
                letterSpacing:
                  "0.12em",
                textTransform:
                  "uppercase",
              }}
            >
              <span
                style={{
                  width: "30px",
                  height: "2px",
                  background:
                    theme.primaryColor,
                }}
              />

              Trusted Business
            </div>

            <h1
              style={{
                maxWidth:
                  "760px",
                margin: 0,
                color:
                  "#0f172a",
                fontSize:
                  "clamp(44px,5vw,68px)",
                lineHeight:
                  1.05,
                letterSpacing:
                  "-0.045em",
              }}
            >
              {website.tagline ||
                `Building better solutions with ${website.name}`}
            </h1>

            <p
              style={{
                maxWidth:
                  "650px",
                margin:
                  "24px 0 0",
                color:
                  "#64748b",
                fontSize:
                  "18px",
                lineHeight:
                  1.8,
              }}
            >
              {website.description ||
                "We deliver dependable solutions designed around your business needs."}
            </p>

            <div
              style={{
                display:
                  "flex",
                flexWrap:
                  "wrap",
                gap: "12px",
                marginTop:
                  "32px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  scrollTo(
                    "contact"
                  )
                }
                style={{
                  padding:
                    "14px 23px",
                  borderRadius:
                    "7px",
                  background:
                    theme.primaryColor,
                  color:
                    "#ffffff",
                  fontWeight:
                    800,
                  cursor:
                    "pointer",
                }}
              >
                Start a Conversation
              </button>

              {services && (
                <button
                  type="button"
                  onClick={() =>
                    scrollTo(
                      "services"
                    )
                  }
                  style={{
                    padding:
                      "14px 23px",
                    borderRadius:
                      "7px",
                    border:
                      "1px solid #cbd5e1",
                    background:
                      "#ffffff",
                    color:
                      "#334155",
                    fontWeight:
                      800,
                    cursor:
                      "pointer",
                  }}
                >
                  Our Services
                </button>
              )}
            </div>
          </div>

          <div>
            <div
              style={{
                position:
                  "relative",
                minHeight:
                  "430px",
                padding:
                  "34px",
                overflow:
                  "hidden",
                background:
                  "#0f172a",
                borderRadius:
                  "4px",
                boxShadow:
                  "0 30px 70px rgba(15,23,42,0.16)",
              }}
            >
              <div
                style={{
                  position:
                    "absolute",
                  width:
                    "260px",
                  height:
                    "260px",
                  top:
                    "-100px",
                  right:
                    "-70px",
                  borderRadius:
                    "50%",
                  background:
                    theme.primaryColor,
                  opacity:
                    0.35,
                }}
              />

              <div
                style={{
                  position:
                    "absolute",
                  width:
                    "150px",
                  height:
                    "150px",
                  bottom:
                    "-60px",
                  left:
                    "-40px",
                  borderRadius:
                    "50%",
                  background:
                    theme.accentColor,
                  opacity:
                    0.2,
                }}
              />

              <div
                style={{
                  position:
                    "relative",
                  zIndex: 1,
                  height:
                    "100%",
                  minHeight:
                    "360px",
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  justifyContent:
                    "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      color:
                        "#94a3b8",
                      fontSize:
                        "12px",
                      fontWeight:
                        800,
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        "0.1em",
                    }}
                  >
                    Business Profile
                  </span>

                  <h2
                    style={{
                      margin:
                        "18px 0 0",
                      color:
                        "#ffffff",
                      fontSize:
                        "34px",
                      lineHeight:
                        1.15,
                    }}
                  >
                    {website.name}
                  </h2>
                </div>

                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "repeat(2,1fr)",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      padding:
                        "18px",
                      border:
                        "1px solid rgba(255,255,255,0.1)",
                      background:
                        "rgba(255,255,255,0.05)",
                    }}
                  >
                    <strong
                      style={{
                        display:
                          "block",
                        color:
                          "#ffffff",
                        fontSize:
                          "20px",
                      }}
                    >
                      Quality
                    </strong>

                    <span
                      style={{
                        color:
                          "#94a3b8",
                        fontSize:
                          "12px",
                      }}
                    >
                      Professional
                      standards
                    </span>
                  </div>

                  <div
                    style={{
                      padding:
                        "18px",
                      border:
                        "1px solid rgba(255,255,255,0.1)",
                      background:
                        "rgba(255,255,255,0.05)",
                    }}
                  >
                    <strong
                      style={{
                        display:
                          "block",
                        color:
                          "#ffffff",
                        fontSize:
                          "20px",
                      }}
                    >
                      Trusted
                    </strong>

                    <span
                      style={{
                        color:
                          "#94a3b8",
                        fontSize:
                          "12px",
                      }}
                    >
                      Customer
                      focused
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      {about && (
        <section
          id="about"
          style={{
            padding:
              "100px 0",
            background:
              "#ffffff",
          }}
        >
          <div
            className="modern-container"
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "0.75fr 1.25fr",
              gap: "80px",
            }}
          >
            <div>
              <span
                style={{
                  color:
                    theme.primaryColor,
                  fontSize:
                    "12px",
                  fontWeight:
                    900,
                  letterSpacing:
                    "0.12em",
                }}
              >
                ABOUT THE COMPANY
              </span>

              <h2
                style={{
                  margin:
                    "14px 0 0",
                  color:
                    "#0f172a",
                  fontSize:
                    "42px",
                  lineHeight:
                    1.1,
                }}
              >
                {about.title &&
                about.title !==
                  "About"
                  ? about.title
                  : `About ${website.name}`}
              </h2>
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color:
                    "#475569",
                  fontSize:
                    "18px",
                  lineHeight:
                    1.9,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} is dedicated to providing dependable products and services with a focus on quality, trust and long-term customer relationships.`}
              </p>

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap: "15px",
                  marginTop:
                    "35px",
                }}
              >
                <div>
                  <strong
                    style={{
                      display:
                        "block",
                      color:
                        theme.primaryColor,
                      fontSize:
                        "25px",
                    }}
                  >
                    01
                  </strong>

                  <span
                    style={{
                      color:
                        "#64748b",
                      fontSize:
                        "13px",
                    }}
                  >
                    Quality
                  </span>
                </div>

                <div>
                  <strong
                    style={{
                      display:
                        "block",
                      color:
                        theme.primaryColor,
                      fontSize:
                        "25px",
                    }}
                  >
                    02
                  </strong>

                  <span
                    style={{
                      color:
                        "#64748b",
                      fontSize:
                        "13px",
                    }}
                  >
                    Reliability
                  </span>
                </div>

                <div>
                  <strong
                    style={{
                      display:
                        "block",
                      color:
                        theme.primaryColor,
                      fontSize:
                        "25px",
                    }}
                  >
                    03
                  </strong>

                  <span
                    style={{
                      color:
                        "#64748b",
                      fontSize:
                        "13px",
                    }}
                  >
                    Support
                  </span>
                </div>
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
            padding:
              "100px 0",
            background:
              "#f8fafc",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                maxWidth:
                  "700px",
                margin:
                  "0 auto 50px",
                textAlign:
                  "center",
              }}
            >
              <span
                style={{
                  color:
                    theme.primaryColor,
                  fontSize:
                    "12px",
                  fontWeight:
                    900,
                  letterSpacing:
                    "0.12em",
                }}
              >
                OUR EXPERTISE
              </span>

              <h2
                style={{
                  margin:
                    "12px 0 0",
                  color:
                    "#0f172a",
                  fontSize:
                    "44px",
                  lineHeight:
                    1.1,
                }}
              >
                {services.title &&
                services.title !==
                  "Services"
                  ? services.title
                  : "Professional Services"}
              </h2>

              <p
                style={{
                  margin:
                    "15px 0 0",
                  color:
                    "#64748b",
                }}
              >
                Solutions designed
                around your goals,
                requirements and
                customers.
              </p>
            </div>

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(3,1fr)",
                gap: "20px",
              }}
            >
              {[
                [
                  "01",
                  "Professional Consulting",
                  "Get practical guidance and solutions designed around your business requirements.",
                ],
                [
                  "02",
                  "Custom Solutions",
                  "Flexible solutions built to support your unique goals and workflow.",
                ],
                [
                  "03",
                  "Ongoing Support",
                  "Reliable support that helps you stay confident after every interaction.",
                ],
              ].map(
                (item) => (
                  <article
                    key={
                      item[0]
                    }
                    style={{
                      padding:
                        "32px",
                      minHeight:
                        "270px",
                      background:
                        "#ffffff",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius:
                        "8px",
                      transition:
                        "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    <span
                      style={{
                        color:
                          theme.primaryColor,
                        fontSize:
                          "12px",
                        fontWeight:
                          900,
                      }}
                    >
                      {item[0]}
                    </span>

                    <h3
                      style={{
                        margin:
                          "28px 0 12px",
                        color:
                          "#0f172a",
                        fontSize:
                          "20px",
                      }}
                    >
                      {
                        item[1]
                      }
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color:
                          "#64748b",
                        lineHeight:
                          1.75,
                      }}
                    >
                      {
                        item[2]
                      }
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* PRODUCTS */}

      {products && (
        <section
          id="products"
          style={{
            padding:
              "100px 0",
            background:
              "#ffffff",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "flex-end",
                gap: "30px",
                marginBottom:
                  "45px",
              }}
            >
              <div>
                <span
                  style={{
                    color:
                      theme.primaryColor,
                    fontSize:
                      "12px",
                    fontWeight:
                      900,
                    letterSpacing:
                      "0.12em",
                  }}
                >
                  PRODUCTS
                </span>

                <h2
                  style={{
                    margin:
                      "12px 0 0",
                    color:
                      "#0f172a",
                    fontSize:
                      "44px",
                  }}
                >
                  {products.title &&
                  products.title !==
                    "Products"
                    ? products.title
                    : "Our Products"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  scrollTo(
                    "contact"
                  )
                }
                style={{
                  padding:
                    "12px 18px",
                  background:
                    theme.primaryColor,
                  color:
                    "#ffffff",
                  borderRadius:
                    "7px",
                  fontWeight:
                    800,
                  cursor:
                    "pointer",
                }}
              >
                Enquire Now
              </button>
            </div>

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(3,1fr)",
                gap: "20px",
              }}
            >
              {[
                [
                  "Premium Quality",
                  "Products made with attention to quality and detail.",
                ],
                [
                  "Custom Options",
                  "Flexible options designed around your specific needs.",
                ],
                [
                  "Reliable Value",
                  "A professional experience from enquiry to delivery.",
                ],
              ].map(
                (item) => (
                  <article
                    key={
                      item[0]
                    }
                    style={{
                      padding:
                        "30px",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius:
                        "8px",
                    }}
                  >
                    <div
                      style={{
                        width:
                          "48px",
                        height:
                          "48px",
                        display:
                          "grid",
                        placeItems:
                          "center",
                        marginBottom:
                          "20px",
                        background:
                          `${theme.primaryColor}12`,
                        color:
                          theme.primaryColor,
                        borderRadius:
                          "10px",
                        fontWeight:
                          900,
                      }}
                    >
                      ✓
                    </div>

                    <h3
                      style={{
                        margin:
                          "0 0 10px",
                        color:
                          "#0f172a",
                        fontSize:
                          "20px",
                      }}
                    >
                      {
                        item[0]
                      }
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color:
                          "#64748b",
                        lineHeight:
                          1.7,
                      }}
                    >
                      {
                        item[1]
                      }
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}

      <section
        style={{
          padding:
            "75px 0",
          background:
            theme.primaryColor,
          color: "#ffffff",
        }}
      >
        <div
          className="modern-container"
          style={{
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            gap: "30px",
            flexWrap:
              "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize:
                  "34px",
              }}
            >
              Ready to work with{" "}
              {website.name}?
            </h2>

            <p
              style={{
                margin:
                  "8px 0 0",
                color:
                  "rgba(255,255,255,0.75)",
              }}
            >
              Let's discuss how
              we can help your
              business.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              scrollTo(
                "contact"
              )
            }
            style={{
              padding:
                "14px 22px",
              borderRadius:
                "7px",
              background:
                "#ffffff",
              color:
                theme.primaryColor,
              fontWeight:
                900,
              cursor:
                "pointer",
            }}
          >
            Contact Us →
          </button>
        </div>
      </section>

      {/* CONTACT */}

      {contact && (
        <section
          id="contact"
          style={{
            padding:
              "100px 0",
            background:
              "#0f172a",
            color:
              "#ffffff",
          }}
        >
          <div
            className="modern-container"
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "70px",
              alignItems:
                "center",
            }}
          >
            <div>
              <span
                style={{
                  color:
                    "#94a3b8",
                  fontSize:
                    "12px",
                  fontWeight:
                    900,
                  letterSpacing:
                    "0.12em",
                }}
              >
                CONTACT
              </span>

              <h2
                style={{
                  margin:
                    "14px 0 18px",
                  fontSize:
                    "46px",
                  lineHeight:
                    1.1,
                }}
              >
                Let's talk about
                your requirements.
              </h2>

              <p
                style={{
                  maxWidth:
                    "560px",
                  margin: 0,
                  color:
                    "#94a3b8",
                  lineHeight:
                    1.8,
                }}
              >
                Get in touch with{" "}
                {website.name} for
                more information,
                enquiries and
                professional
                assistance.
              </p>

              <div
                style={{
                  display:
                    "grid",
                  gap: "16px",
                  marginTop:
                    "35px",
                }}
              >
                {contact.content && (
                  <div
                    style={{
                      padding:
                        "18px",
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                      background:
                        "rgba(255,255,255,0.04)",
                      borderRadius:
                        "8px",
                    }}
                  >
                    <strong>
                      Contact Details
                    </strong>

                    <p
                      style={{
                        margin:
                          "8px 0 0",
                        color:
                          "#94a3b8",
                        whiteSpace:
                          "pre-wrap",
                      }}
                    >
                      {contact.content}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                padding:
                  "32px",
                background:
                  "#ffffff",
                borderRadius:
                  "10px",
                color:
                  "#0f172a",
              }}
            >
              <h3
                style={{
                  margin:
                    "0 0 8px",
                  fontSize:
                    "24px",
                }}
              >
                Request a
                Consultation
              </h3>

              <p
                style={{
                  margin:
                    "0 0 22px",
                  color:
                    "#64748b",
                  fontSize:
                    "14px",
                }}
              >
                Send us your
                requirements and
                we'll get back to
                you.
              </p>

              <form
                onSubmit={(
                  event
                ) => {
                  event.preventDefault();

                  window.location.href =
                    `mailto:?subject=${encodeURIComponent(
                      `Business enquiry for ${website.name}`
                    )}&body=${encodeURIComponent(
                      `Hello ${website.name}, I would like to know more about your products and services.`
                    )}`;
                }}
                style={{
                  display:
                    "grid",
                  gap: "12px",
                }}
              >
                <input
                  required
                  placeholder="Full name"
                  style={{
                    padding:
                      "13px 14px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius:
                      "7px",
                    outline:
                      "none",
                  }}
                />

                <input
                  required
                  type="email"
                  placeholder="Email address"
                  style={{
                    padding:
                      "13px 14px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius:
                      "7px",
                    outline:
                      "none",
                  }}
                />

                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your requirement"
                  style={{
                    padding:
                      "13px 14px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius:
                      "7px",
                    outline:
                      "none",
                    resize:
                      "vertical",
                  }}
                />

                <button
                  type="submit"
                  style={{
                    minHeight:
                      "48px",
                    borderRadius:
                      "7px",
                    background:
                      theme.primaryColor,
                    color:
                      "#ffffff",
                    fontWeight:
                      800,
                    cursor:
                      "pointer",
                  }}
                >
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer
        style={{
          background:
            "#020617",
          color:
            "#ffffff",
        }}
      >
        <div
          className="modern-container"
          style={{
            padding:
              "50px 0 25px",
          }}
        >
          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "1.5fr 1fr 1fr",
              gap: "50px",
            }}
          >
            <div>
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width:
                      "38px",
                    height:
                      "38px",
                    display:
                      "grid",
                    placeItems:
                      "center",
                    borderRadius:
                      "8px",
                    background:
                      theme.primaryColor,
                    fontWeight:
                      900,
                  }}
                >
                  {website.name
                    .charAt(
                      0
                    )
                    .toUpperCase()}
                </span>

                <strong>
                  {website.name}
                </strong>
              </div>

              <p
                style={{
                  maxWidth:
                    "430px",
                  margin:
                    "16px 0 0",
                  color:
                    "#64748b",
                  fontSize:
                    "14px",
                  lineHeight:
                    1.8,
                }}
              >
                {website.tagline ||
                  website.description ||
                  "Professional business solutions."}
              </p>
            </div>

            <div>
              <strong>
                Navigation
              </strong>

              <div
                style={{
                  display:
                    "grid",
                  gap: "9px",
                  marginTop:
                    "15px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    scrollTo(
                      "home"
                    )
                  }
                  style={{
                    width:
                      "fit-content",
                    padding: 0,
                    background:
                      "transparent",
                    color:
                      "#64748b",
                    cursor:
                      "pointer",
                  }}
                >
                  Home
                </button>

                {about && (
                  <button
                    type="button"
                    onClick={() =>
                      scrollTo(
                        "about"
                      )
                    }
                    style={{
                      width:
                        "fit-content",
                      padding: 0,
                      background:
                        "transparent",
                      color:
                        "#64748b",
                      cursor:
                        "pointer",
                    }}
                  >
                    About
                  </button>
                )}

                {services && (
                  <button
                    type="button"
                    onClick={() =>
                      scrollTo(
                        "services"
                      )
                    }
                    style={{
                      width:
                        "fit-content",
                      padding: 0,
                      background:
                        "transparent",
                      color:
                        "#64748b",
                      cursor:
                        "pointer",
                    }}
                  >
                    Services
                  </button>
                )}

                {products && (
                  <button
                    type="button"
                    onClick={() =>
                      scrollTo(
                        "products"
                      )
                    }
                    style={{
                      width:
                        "fit-content",
                      padding: 0,
                      background:
                        "transparent",
                      color:
                        "#64748b",
                      cursor:
                        "pointer",
                    }}
                  >
                    Products
                  </button>
                )}

                {contact && (
                  <button
                    type="button"
                    onClick={() =>
                      scrollTo(
                        "contact"
                      )
                    }
                    style={{
                      width:
                        "fit-content",
                      padding: 0,
                      background:
                        "transparent",
                      color:
                        "#64748b",
                      cursor:
                        "pointer",
                    }}
                  >
                    Contact
                  </button>
                )}
              </div>
            </div>

            <div>
              <strong>
                Website
              </strong>

              <p
                style={{
                  margin:
                    "15px 0 0",
                  color:
                    "#64748b",
                  fontSize:
                    "13px",
                  wordBreak:
                    "break-word",
                }}
              >
                biznest
                website platform
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop:
                "45px",
              paddingTop:
                "20px",
              borderTop:
                "1px solid rgba(255,255,255,0.08)",
              color:
                "#475569",
              fontSize:
                "12px",
            }}
          >
            ©{" "}
            {new Date().getFullYear()}{" "}
            {website.name}. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}