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

export default function Technology({
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

  const capabilities = [
    [
      "01",
      "Cloud & Infrastructure",
      "Scalable infrastructure and dependable systems built for modern businesses.",
    ],
    [
      "02",
      "Software Development",
      "Custom digital products designed around real business requirements.",
    ],
    [
      "03",
      "AI & Automation",
      "Intelligent workflows that reduce repetitive work and improve efficiency.",
    ],
    [
      "04",
      "Data & Analytics",
      "Turn business data into useful insights for better decisions.",
    ],
  ];

  const solutions = [
    "Business Platforms",
    "Cloud Solutions",
    "AI Automation",
    "Data Systems",
    "Web Applications",
    "Digital Transformation",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05070a",
        color: "#f4f7fb",
        fontFamily: theme.fontFamily,
      }}
    >
      {/* HEADER */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(5,7,10,0.9)",
          backdropFilter: "blur(18px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "78px",
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
              display: "flex",
              alignItems: "center",
              gap: "11px",
              background: "transparent",
              color: "#ffffff",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                display: "grid",
                placeItems: "center",
                borderRadius: "10px",
                background: theme.primaryColor,
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 900,
                boxShadow:
                  `0 0 25px ${theme.primaryColor}55`,
              }}
            >
              {website.name
                .charAt(0)
                .toUpperCase()}
            </span>

            <span>
              <strong
                style={{
                  display: "block",
                  fontSize: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {website.name}
              </strong>

              <small
                style={{
                  display: "block",
                  marginTop: "2px",
                  color: "#687486",
                  fontSize: "8px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Technology
              </small>
            </span>
          </button>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <button
              type="button"
              onClick={() => scrollTo("home")}
              style={{
                padding: 0,
                background: "transparent",
                color: "#8995a6",
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
                  color: "#8995a6",
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
                  color: "#8995a6",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Solutions
              </button>
            )}

            {products && (
              <button
                type="button"
                onClick={() => scrollTo("products")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#8995a6",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Products
              </button>
            )}

            {contact && (
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#8995a6",
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
              padding: "10px 17px",
              borderRadius: "8px",
              background: theme.primaryColor,
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 900,
              cursor: "pointer",
              boxShadow:
                `0 0 22px ${theme.primaryColor}35`,
            }}
          >
            Talk to Us
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "720px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 78% 20%, rgba(37,99,235,0.2), transparent 28%), radial-gradient(circle at 15% 80%, rgba(14,165,233,0.08), transparent 25%), #05070a",
        }}
      >
        {/* GRID */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.22,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
            maskImage:
              "linear-gradient(to bottom, black, transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "480px",
            height: "480px",
            right: "-180px",
            top: "-130px",
            borderRadius: "50%",
            border:
              `1px solid ${theme.primaryColor}35`,
            boxShadow:
              `0 0 100px ${theme.primaryColor}15`,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            right: "-90px",
            top: "-40px",
            borderRadius: "50%",
            border:
              `1px solid ${theme.primaryColor}25`,
          }}
        />

        <div
          className="modern-container"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            padding: "110px 0",
          }}
        >
          <div
            style={{
              maxWidth: "950px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "7px 11px",
                borderRadius: "999px",
                border:
                  `1px solid ${theme.primaryColor}35`,
                background:
                  `${theme.primaryColor}0d`,
                color: theme.primaryColor,
                fontSize: "9px",
                fontWeight: 900,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background:
                    theme.primaryColor,
                  boxShadow:
                    `0 0 10px ${theme.primaryColor}`,
                }}
              />

              Technology • Innovation • Future
            </div>

            <h1
              style={{
                margin: "27px 0 0",
                maxWidth: "950px",
                fontSize:
                  "clamp(52px,7.5vw,100px)",
                lineHeight: 0.93,
                letterSpacing: "-0.065em",
                fontWeight: 800,
              }}
            >
              {website.tagline ||
                `Build what's next with ${website.name}.`}
            </h1>

            <p
              style={{
                maxWidth: "700px",
                margin: "30px 0 0",
                color: "#8e99a9",
                fontSize: "18px",
                lineHeight: 1.8,
              }}
            >
              {website.description ||
                "We build scalable technology, intelligent automation and digital products that help ambitious businesses move faster."}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "34px",
              }}
            >
              {services && (
                <button
                  type="button"
                  onClick={() =>
                    scrollTo("services")
                  }
                  style={{
                    padding: "14px 23px",
                    borderRadius: "8px",
                    background:
                      theme.primaryColor,
                    color: "#ffffff",
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow:
                      `0 0 30px ${theme.primaryColor}35`,
                  }}
                >
                  Explore Solutions
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  scrollTo("contact")
                }
                style={{
                  padding: "14px 23px",
                  borderRadius: "8px",
                  background: "transparent",
                  color: "#ffffff",
                  border:
                    "1px solid rgba(255,255,255,0.15)",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Start a Project →
              </button>
            </div>
          </div>

          {/* TERMINAL CARD */}

          <div
            style={{
              maxWidth: "900px",
              marginTop: "85px",
              overflow: "hidden",
              borderRadius: "13px",
              border:
                "1px solid rgba(255,255,255,0.1)",
              background: "#090c11",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.45)",
            }}
          >
            <div
              style={{
                minHeight: "42px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "0 15px",
                borderBottom:
                  "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {[1, 2, 3].map((item) => (
                <span
                  key={item}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background:
                      "rgba(255,255,255,0.2)",
                  }}
                />
              ))}

              <span
                style={{
                  marginLeft: "10px",
                  color: "#566170",
                  fontSize: "10px",
                }}
              >
                {website.name.toLowerCase()}
                /system
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "30px",
                padding: "30px",
              }}
            >
              <div
                style={{
                  color: "#6f7d8e",
                  fontFamily:
                    "monospace",
                  fontSize: "12px",
                  lineHeight: 2,
                }}
              >
                <div>
                  <span
                    style={{
                      color:
                        theme.primaryColor,
                    }}
                  >
                    $
                  </span>{" "}
                  initialize
                  --business
                </div>

                <div>
                  <span
                    style={{
                      color: "#38bdf8",
                    }}
                  >
                    ✓
                  </span>{" "}
                  infrastructure ready
                </div>

                <div>
                  <span
                    style={{
                      color: "#38bdf8",
                    }}
                  >
                    ✓
                  </span>{" "}
                  automation enabled
                </div>

                <div>
                  <span
                    style={{
                      color: "#38bdf8",
                    }}
                  >
                    ✓
                  </span>{" "}
                  systems connected
                </div>
              </div>

              <div
                style={{
                  padding: "18px",
                  borderRadius: "9px",
                  background:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    color: "#566170",
                    fontSize: "9px",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      "0.15em",
                  }}
                >
                  System Status
                </span>

                <strong
                  style={{
                    display: "block",
                    marginTop: "8px",
                    color: "#67e8f9",
                    fontFamily:
                      "monospace",
                    fontSize: "20px",
                  }}
                >
                  ONLINE
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}

      <section
        style={{
          padding: "34px 0",
          background: "#0b0f14",
          borderTop:
            "1px solid rgba(255,255,255,0.06)",
          borderBottom:
            "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="modern-container"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "25px",
          }}
        >
          {[
            ["99.9%", "Reliable Systems"],
            ["24/7", "Digital Availability"],
            ["10x", "Faster Workflows"],
            ["∞", "Scalable Growth"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{
                padding: "8px 0",
                textAlign: "center",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: theme.primaryColor,
                  fontSize: "23px",
                }}
              >
                {value}
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "#697586",
                  fontSize: "10px",
                  letterSpacing:
                    "0.08em",
                  textTransform:
                    "uppercase",
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
            color: "#111827",
          }}
        >
          <div
            className="modern-container"
            style={{
              display: "grid",
              gridTemplateColumns:
                "0.7fr 1.3fr",
              gap: "85px",
              alignItems: "start",
            }}
          >
            <div>
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing:
                    "0.15em",
                  textTransform:
                    "uppercase",
                }}
              >
                About Us
              </span>

              <h2
                style={{
                  margin: "15px 0 0",
                  fontSize: "46px",
                  lineHeight: 1.08,
                  letterSpacing:
                    "-0.045em",
                }}
              >
                {about.title &&
                about.title !== "About"
                  ? about.title
                  : "Technology with a purpose."}
              </h2>
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "19px",
                  lineHeight: 1.9,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} combines technology, strategy and innovation to help businesses solve complex problems and create better digital experiences.`}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap: "14px",
                  marginTop: "40px",
                }}
              >
                {[
                  ["01", "Innovation"],
                  ["02", "Security"],
                  ["03", "Scale"],
                ].map(
                  ([number, title]) => (
                    <div
                      key={title}
                      style={{
                        padding: "23px",
                        background: "#f8fafc",
                        border:
                          "1px solid #e5e7eb",
                        borderRadius:
                          "10px",
                      }}
                    >
                      <span
                        style={{
                          color:
                            theme.primaryColor,
                          fontSize: "10px",
                          fontWeight: 900,
                        }}
                      >
                        {number}
                      </span>

                      <strong
                        style={{
                          display: "block",
                          marginTop: "16px",
                          fontSize:
                            "15px",
                        }}
                      >
                        {title}
                      </strong>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SOLUTIONS */}

      {services && (
        <section
          id="services"
          style={{
            padding: "110px 0",
            background: "#05070a",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                maxWidth: "760px",
                marginBottom: "55px",
              }}
            >
              <span
                style={{
                  color:
                    theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing:
                    "0.15em",
                  textTransform:
                    "uppercase",
                }}
              >
                Capabilities
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  fontSize: "52px",
                  lineHeight: 1.03,
                  letterSpacing:
                    "-0.05em",
                }}
              >
                {services.title &&
                services.title !== "Services"
                  ? services.title
                  : "Technology that moves business forward."}
              </h2>

              <p
                style={{
                  margin: "18px 0 0",
                  color: "#7f8a99",
                  lineHeight: 1.8,
                }}
              >
                {services.subtitle ||
                  "From infrastructure to intelligent automation, we build systems designed for real-world business growth."}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,1fr)",
                gap: "1px",
                background:
                  "rgba(255,255,255,0.09)",
              }}
            >
              {capabilities.map(
                ([number, title, text]) => (
                  <article
                    key={number}
                    style={{
                      minHeight:
                        "270px",
                      padding: "32px",
                      background:
                        "#090c11",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "flex-start",
                      }}
                    >
                      <span
                        style={{
                          color:
                            theme.primaryColor,
                          fontFamily:
                            "monospace",
                          fontSize:
                            "12px",
                          fontWeight: 900,
                        }}
                      >
                        {number}
                      </span>

                      <span
                        style={{
                          color:
                            "#344052",
                          fontSize:
                            "20px",
                        }}
                      >
                        ↗
                      </span>
                    </div>

                    <h3
                      style={{
                        margin:
                          "42px 0 10px",
                        fontSize:
                          "23px",
                      }}
                    >
                      {title}
                    </h3>

                    <p
                      style={{
                        maxWidth:
                          "520px",
                        margin: 0,
                        color:
                          "#7e8999",
                        fontSize:
                          "13px",
                        lineHeight:
                          1.8,
                      }}
                    >
                      {text}
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
            padding: "110px 0",
            background: "#f8fafc",
            color: "#111827",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                maxWidth: "750px",
                marginBottom: "50px",
              }}
            >
              <span
                style={{
                  color:
                    theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing:
                    "0.15em",
                  textTransform:
                    "uppercase",
                }}
              >
                Solutions
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  fontSize: "50px",
                  lineHeight: 1,
                  letterSpacing:
                    "-0.05em",
                }}
              >
                {products.title &&
                products.title !== "Products"
                  ? products.title
                  : "Built for modern business."}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3,1fr)",
                gap: "15px",
              }}
            >
              {solutions.map(
                (solution, index) => (
                  <article
                    key={solution}
                    style={{
                      minHeight:
                        "210px",
                      padding: "27px",
                      display: "flex",
                      flexDirection:
                        "column",
                      justifyContent:
                        "space-between",
                      background:
                        "#ffffff",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius:
                        "11px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                      }}
                    >
                      <span
                        style={{
                          color:
                            theme.primaryColor,
                          fontSize:
                            "10px",
                          fontWeight:
                            900,
                        }}
                      >
                        0{index + 1}
                      </span>

                      <span
                        style={{
                          color:
                            "#94a3b8",
                        }}
                      >
                        →
                      </span>
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize:
                          "18px",
                      }}
                    >
                      {solution}
                    </h3>
                  </article>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ARCHITECTURE STATEMENT */}

      <section
        style={{
          padding: "110px 0",
          background: "#0b0f14",
        }}
      >
        <div
          className="modern-container"
          style={{
            display: "grid",
            gridTemplateColumns:
              "0.35fr 1.65fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          <span
            style={{
              color:
                theme.primaryColor,
              fontFamily: "monospace",
              fontSize: "11px",
            }}
          >
            // PHILOSOPHY
          </span>

          <h2
            style={{
              margin: 0,
              maxWidth: "950px",
              fontSize:
                "clamp(38px,5vw,68px)",
              lineHeight: 1.05,
              letterSpacing:
                "-0.055em",
            }}
          >
            Technology should
            simplify complexity,
            not create more of it.
          </h2>
        </div>
      </section>

      {/* CTA */}

      <section
        style={{
          padding: "85px 0",
          background:
            theme.primaryColor,
          color: "#ffffff",
        }}
      >
        <div
          className="modern-container"
          style={{
            display: "flex",
            justifyContent:
              "space-between",
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
                letterSpacing:
                  "0.15em",
                textTransform:
                  "uppercase",
                opacity: 0.75,
              }}
            >
              Build the Future
            </span>

            <h2
              style={{
                margin: "12px 0 0",
                fontSize: "40px",
                lineHeight: 1.08,
              }}
            >
              Ready to solve a
              bigger problem?
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              scrollTo("contact")
            }
            style={{
              padding: "15px 25px",
              borderRadius: "8px",
              background:
                "#ffffff",
              color:
                theme.primaryColor,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Start a Project →
          </button>
        </div>
      </section>

      {/* CONTACT */}

      {contact && (
        <section
          id="contact"
          style={{
            padding: "110px 0",
            background: "#ffffff",
            color: "#111827",
          }}
        >
          <div
            className="modern-container"
            style={{
              maxWidth: "900px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color:
                  theme.primaryColor,
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing:
                  "0.15em",
                textTransform:
                  "uppercase",
              }}
            >
              Contact
            </span>

            <h2
              style={{
                margin: "15px 0",
                fontSize:
                  "clamp(45px,6vw,72px)",
                lineHeight: 0.98,
                letterSpacing:
                  "-0.06em",
              }}
            >
              Let's build
              something better.
            </h2>

            <p
              style={{
                maxWidth: "650px",
                margin:
                  "25px auto 0",
                color:
                  "#64748b",
                lineHeight: 1.8,
              }}
            >
              {contact.content ||
                `Tell ${website.name} about your business challenge, product idea or technology requirement.`}
            </p>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  `mailto:?subject=${encodeURIComponent(
                    `Technology enquiry - ${website.name}`
                  )}&body=${encodeURIComponent(
                    `Hello ${website.name}, I would like to discuss a technology project with you.`
                  )}`)
              }
              style={{
                marginTop: "30px",
                padding:
                  "15px 27px",
                borderRadius:
                  "8px",
                background:
                  "#111827",
                color:
                  "#ffffff",
                fontWeight: 900,
                cursor:
                  "pointer",
              }}
            >
              Send Project Enquiry
            </button>
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer
        style={{
          padding: "48px 0 22px",
          background: "#05070a",
          color: "#ffffff",
        }}
      >
        <div className="modern-container">
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              gap: "25px",
              flexWrap:
                "wrap",
            }}
          >
            <div>
              <strong
                style={{
                  fontSize:
                    "17px",
                }}
              >
                {website.name}
              </strong>

              <p
                style={{
                  margin:
                    "7px 0 0",
                  color:
                    "#566170",
                  fontSize:
                    "11px",
                }}
              >
                {website.tagline ||
                  "Technology. Innovation. Growth."}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                scrollTo("home")
              }
              style={{
                padding: 0,
                background:
                  "transparent",
                color:
                  theme.primaryColor,
                fontWeight: 800,
                cursor:
                  "pointer",
              }}
            >
              Back to top ↑
            </button>
          </div>

          <div
            style={{
              marginTop: "35px",
              paddingTop:
                "20px",
              borderTop:
                "1px solid rgba(255,255,255,0.08)",
              color:
                "#39424f",
              fontSize:
                "11px",
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