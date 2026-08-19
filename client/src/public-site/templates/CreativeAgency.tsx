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

export default function CreativeAgency({
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

  const projects = [
    "Brand Identity",
    "Digital Experience",
    "Creative Campaign",
    "Visual Strategy",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f0",
        color: "#111111",
        fontFamily: theme.fontFamily,
      }}
    >
      {/* HEADER */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(245,245,240,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #d9d9d2",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          <button
            type="button"
            onClick={() => scrollTo("home")}
            style={{
              padding: 0,
              background: "transparent",
              color: "#111111",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <strong
              style={{
                fontSize: "18px",
                letterSpacing: "-0.03em",
              }}
            >
              {website.name}
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "2px",
                color: "#777777",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Creative Studio
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
                color: "#555555",
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
                  color: "#555555",
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
                  color: "#555555",
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
                onClick={() => scrollTo("projects")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#555555",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Work
              </button>
            )}

            {contact && (
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#555555",
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
              padding: "11px 17px",
              background: "#111111",
              color: "#ffffff",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Start Project
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "680px",
          display: "flex",
          alignItems: "center",
          background: "#f5f5f0",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            right: "-160px",
            top: "-160px",
            borderRadius: "50%",
            background: theme.primaryColor,
            opacity: 0.08,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "230px",
            height: "230px",
            left: "-100px",
            bottom: "-90px",
            borderRadius: "50%",
            background: theme.accentColor,
            opacity: 0.12,
          }}
        />

        <div
          className="modern-container"
          style={{
            position: "relative",
            zIndex: 1,
            padding: "100px 0",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: theme.primaryColor,
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "35px",
                  height: "2px",
                  background: theme.primaryColor,
                }}
              />

              Independent Creative Studio
            </div>

            <h1
              style={{
                margin: "28px 0 0",
                maxWidth: "1050px",
                fontSize:
                  "clamp(55px,9vw,125px)",
                lineHeight: 0.86,
                letterSpacing: "-0.075em",
                fontWeight: 900,
              }}
            >
              {website.tagline ||
                `Ideas that make ${website.name} impossible to ignore.`}
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 0.65fr",
                gap: "60px",
                marginTop: "45px",
                alignItems: "end",
              }}
            >
              <p
                style={{
                  maxWidth: "680px",
                  margin: 0,
                  color: "#666666",
                  fontSize: "18px",
                  lineHeight: 1.8,
                }}
              >
                {website.description ||
                  "We create distinctive brands, digital experiences and creative solutions that connect businesses with their audience."}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => scrollTo("projects")}
                  style={{
                    padding: "14px 22px",
                    background: theme.primaryColor,
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  Explore Work
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  style={{
                    padding: "14px 22px",
                    background: "#ffffff",
                    color: "#111111",
                    border:
                      "1px solid #cfcfc8",
                    borderRadius: "8px",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </div>

          {/* MARQUEE-STYLE TEXT */}

          <div
            style={{
              marginTop: "85px",
              overflow: "hidden",
              borderTop: "1px solid #d5d5ce",
              borderBottom: "1px solid #d5d5ce",
              padding: "18px 0",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                display: "inline-block",
                color: "#777777",
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              BRANDING&nbsp;&nbsp; • &nbsp;&nbsp;
              DESIGN&nbsp;&nbsp; • &nbsp;&nbsp;
              DIGITAL&nbsp;&nbsp; • &nbsp;&nbsp;
              STRATEGY&nbsp;&nbsp; • &nbsp;&nbsp;
              EXPERIENCE&nbsp;&nbsp; • &nbsp;&nbsp;
              BRANDING&nbsp;&nbsp; • &nbsp;&nbsp;
              DESIGN&nbsp;&nbsp; • &nbsp;&nbsp;
              DIGITAL
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      {about && (
        <section
          id="about"
          style={{
            padding: "110px 0",
            background: "#111111",
            color: "#ffffff",
          }}
        >
          <div
            className="modern-container"
            style={{
              display: "grid",
              gridTemplateColumns:
                "0.7fr 1.3fr",
              gap: "90px",
            }}
          >
            <div>
              <span
                style={{
                  color: theme.accentColor,
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Who We Are
              </span>

              <h2
                style={{
                  margin: "18px 0 0",
                  fontSize: "48px",
                  lineHeight: 1.05,
                  letterSpacing: "-0.045em",
                }}
              >
                {about.title &&
                about.title !== "About"
                  ? about.title
                  : "We think differently."}
              </h2>
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: "#b4b4b4",
                  fontSize: "21px",
                  lineHeight: 1.85,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} is a creative team focused on building memorable brands, experiences and solutions that move businesses forward.`}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap: "12px",
                  marginTop: "45px",
                }}
              >
                {[
                  ["01", "Curious"],
                  ["02", "Bold"],
                  ["03", "Human"],
                ].map(([number, title]) => (
                  <div
                    key={number}
                    style={{
                      padding: "22px",
                      background: "#191919",
                      border:
                        "1px solid #292929",
                    }}
                  >
                    <span
                      style={{
                        color: theme.accentColor,
                        fontSize: "11px",
                        fontWeight: 900,
                      }}
                    >
                      {number}
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "18px",
                        fontSize: "16px",
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
            padding: "110px 0",
            background: "#ffffff",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "flex-end",
                gap: "30px",
                marginBottom: "55px",
              }}
            >
              <div>
                <span
                  style={{
                    color: theme.primaryColor,
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  What We Do
                </span>

                <h2
                  style={{
                    margin: "15px 0 0",
                    fontSize: "52px",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {services.title &&
                  services.title !== "Services"
                    ? services.title
                    : "Creative services"}
                </h2>
              </div>

              <p
                style={{
                  maxWidth: "400px",
                  margin: 0,
                  color: "#707070",
                  lineHeight: 1.7,
                }}
              >
                {services.subtitle ||
                  "From strategy to execution, we create work that has a clear purpose."}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,1fr)",
                gap: "15px",
              }}
            >
              {[
                [
                  "Brand Strategy",
                  "Positioning, identity direction and ideas that give your brand a clear voice.",
                ],
                [
                  "Visual Identity",
                  "Distinctive visual systems that make your business recognizable.",
                ],
                [
                  "Digital Design",
                  "Modern digital experiences designed around your audience.",
                ],
                [
                  "Creative Campaigns",
                  "Campaign concepts designed to attract attention and create action.",
                ],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  style={{
                    padding: "35px",
                    minHeight: "245px",
                    background:
                      index % 2 === 0
                        ? "#f5f5f0"
                        : "#eeeeea",
                    borderRadius: "4px",
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
                      margin:
                        "30px 0 10px",
                      fontSize: "24px",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      maxWidth: "470px",
                      margin: 0,
                      color: "#666666",
                      lineHeight: 1.75,
                    }}
                  >
                    {text}
                  </p>

                  <button
                    type="button"
                    onClick={() => scrollTo("contact")}
                    style={{
                      marginTop: "20px",
                      padding: 0,
                      background: "transparent",
                      color: theme.primaryColor,
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Discuss this →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS */}

      {products && (
        <section
          id="projects"
          style={{
            padding: "110px 0",
            background: "#f5f5f0",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                marginBottom: "50px",
              }}
            >
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Selected Projects
              </span>

              <h2
                style={{
                  margin: "15px 0 0",
                  maxWidth: "800px",
                  fontSize: "clamp(45px,6vw,75px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.06em",
                }}
              >
                {products.title &&
                products.title !== "Products"
                  ? products.title
                  : "Work we're proud of."}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,1fr)",
                gap: "20px",
              }}
            >
              {projects.map((project, index) => (
                <article
                  key={project}
                  style={{
                    position: "relative",
                    minHeight:
                      index === 0 ||
                      index === 3
                        ? "460px"
                        : "350px",
                    overflow: "hidden",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:
                      "flex-end",
                    background:
                      index % 2 === 0
                        ? "#deded8"
                        : "#d6d6cf",
                    borderRadius:
                      index % 2 === 0
                        ? "80px 5px 5px 5px"
                        : "5px 80px 5px 5px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "280px",
                      height: "280px",
                      borderRadius: "50%",
                      top: "-90px",
                      right: "-80px",
                      background:
                        theme.primaryColor,
                      opacity: 0.12,
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <span
                      style={{
                        color: theme.primaryColor,
                        fontSize: "11px",
                        fontWeight: 900,
                        letterSpacing:
                          "0.12em",
                      }}
                    >
                      PROJECT 0{index + 1}
                    </span>

                    <h3
                      style={{
                        margin:
                          "12px 0 8px",
                        fontSize: "32px",
                        letterSpacing:
                          "-0.035em",
                      }}
                    >
                      {project}
                    </h3>

                    <p
                      style={{
                        maxWidth: "500px",
                        margin: 0,
                        color: "#555555",
                        lineHeight: 1.7,
                      }}
                    >
                      A creative project
                      developed with a
                      strong visual direction,
                      clear strategy and
                      memorable execution.
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
                      }}
                    >
                      View / Enquire →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BIG STATEMENT */}

      <section
        style={{
          padding: "100px 0",
          background: "#111111",
          color: "#ffffff",
        }}
      >
        <div
          className="modern-container"
          style={{
            maxWidth: "1000px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#888888",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Our Philosophy
          </p>

          <h2
            style={{
              margin: "25px 0 0",
              fontSize:
                "clamp(40px,6vw,78px)",
              lineHeight: 1.02,
              letterSpacing: "-0.06em",
            }}
          >
            Good design gets
            attention.
            <br />
            Great design gets
            remembered.
          </h2>
        </div>
      </section>

      {/* CTA */}

      <section
        style={{
          padding: "95px 0",
          background: theme.primaryColor,
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
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.75,
              }}
            >
              Let's Create
            </span>

            <h2
              style={{
                margin: "12px 0 0",
                fontSize: "45px",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              Have a bold idea?
            </h2>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "15px 25px",
              borderRadius: "9px",
              background: "#ffffff",
              color: theme.primaryColor,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Start a Conversation →
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
                color: theme.primaryColor,
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
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
                letterSpacing: "-0.06em",
              }}
            >
              Let's make
              something
              unforgettable.
            </h2>

            <p
              style={{
                maxWidth: "650px",
                margin: "25px auto 0",
                color: "#6b6b6b",
                lineHeight: 1.8,
              }}
            >
              {contact.content ||
                `Tell ${website.name} about your business, project or creative challenge.`}
            </p>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  `mailto:?subject=${encodeURIComponent(
                    `Creative project enquiry - ${website.name}`
                  )}&body=${encodeURIComponent(
                    `Hello ${website.name}, I would like to discuss a creative project with you.`
                  )}`)
              }
              style={{
                marginTop: "30px",
                padding: "15px 27px",
                borderRadius: "9px",
                background: "#111111",
                color: "#ffffff",
                fontWeight: 900,
                cursor: "pointer",
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
          background: "#111111",
          color: "#ffffff",
        }}
      >
        <div className="modern-container">
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
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
                  color: "#666666",
                  fontSize: "12px",
                }}
              >
                {website.tagline ||
                  "Ideas. Design. Impact."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("home")}
              style={{
                padding: 0,
                background: "transparent",
                color: theme.primaryColor,
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
                "1px solid rgba(255,255,255,0.08)",
              color: "#4b4b4b",
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