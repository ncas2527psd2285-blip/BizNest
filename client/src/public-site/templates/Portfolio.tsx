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

export default function Portfolio({
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
    {
      number: "01",
      title: "Featured Project",
      description:
        "A carefully crafted project focused on quality, creativity and meaningful results.",
    },
    {
      number: "02",
      title: "Creative Work",
      description:
        "A thoughtful solution designed around a clear idea and strong visual identity.",
    },
    {
      number: "03",
      title: "Signature Project",
      description:
        "A distinctive project combining strategy, execution and attention to detail.",
    },
    {
      number: "04",
      title: "Selected Work",
      description:
        "A practical and polished experience created to meet real-world requirements.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "#f8fafc",
        fontFamily: theme.fontFamily,
      }}
    >
      {/* HEADER */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(11,11,15,0.88)",
          backdropFilter: "blur(18px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "76px",
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
              color: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "36px",
                height: "36px",
                display: "grid",
                placeItems: "center",
                borderRadius: "10px",
                background: theme.primaryColor,
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
                fontSize: "16px",
              }}
            >
              {website.name}
            </strong>
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
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "13px",
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
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                About
              </button>
            )}

            {products && (
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Work
              </button>
            )}

            {services && (
              <button
                type="button"
                onClick={() => scrollTo("services")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "13px",
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
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "13px",
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
              padding: "10px 16px",
              borderRadius: "999px",
              background: theme.primaryColor,
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Let's Talk
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "calc(100vh - 76px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 80% 20%, rgba(37,99,235,0.15), transparent 32%), #0b0b0f",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            right: "-220px",
            bottom: "-200px",
            borderRadius: "50%",
            background: theme.primaryColor,
            opacity: 0.08,
            filter: "blur(20px)",
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
              maxWidth: "950px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: theme.primaryColor,
                fontSize: "12px",
                fontWeight: 900,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "34px",
                  height: "1px",
                  background: theme.primaryColor,
                }}
              />

              Portfolio / Creative Profile
            </div>

            <h1
              style={{
                margin: "25px 0 0",
                maxWidth: "950px",
                fontSize:
                  "clamp(52px,8vw,110px)",
                lineHeight: 0.94,
                letterSpacing: "-0.065em",
                fontWeight: 800,
              }}
            >
              {website.tagline ||
                `Creative work by ${website.name}`}
            </h1>

            <p
              style={{
                maxWidth: "700px",
                margin: "32px 0 0",
                color: "#94a3b8",
                fontSize: "19px",
                lineHeight: 1.8,
              }}
            >
              {website.description ||
                "A collection of thoughtful work, creative ideas and practical solutions built with purpose."}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "35px",
              }}
            >
              {products && (
                <button
                  type="button"
                  onClick={() => scrollTo("projects")}
                  style={{
                    padding: "14px 23px",
                    borderRadius: "9px",
                    background: theme.primaryColor,
                    color: "#ffffff",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  View My Work
                </button>
              )}

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: "14px 23px",
                  borderRadius: "9px",
                  background: "transparent",
                  color: "#ffffff",
                  border:
                    "1px solid rgba(255,255,255,0.2)",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Start a Project →
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3,1fr)",
              gap: "12px",
              maxWidth: "800px",
              marginTop: "90px",
            }}
          >
            {[
              ["01", "Creative"],
              ["02", "Strategic"],
              ["03", "Reliable"],
            ].map(([number, label]) => (
              <div
                key={number}
                style={{
                  padding: "20px",
                  borderTop:
                    "1px solid rgba(255,255,255,0.15)",
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
                    marginTop: "7px",
                    fontSize: "14px",
                  }}
                >
                  {label}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}

      {about && (
        <section
          id="about"
          style={{
            padding: "110px 0",
            background: "#111116",
          }}
        >
          <div
            className="modern-container"
            style={{
              display: "grid",
              gridTemplateColumns:
                "0.7fr 1.3fr",
              gap: "90px",
              alignItems: "start",
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
                About
              </span>

              <h2
                style={{
                  margin: "15px 0 0",
                  fontSize: "44px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                }}
              >
                {about.title &&
                about.title !== "About"
                  ? about.title
                  : "A little about us"}
              </h2>
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: "#a1a1aa",
                  fontSize: "20px",
                  lineHeight: 1.9,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} combines creativity, strategy and execution to build work that creates a meaningful impact.`}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap: "15px",
                  marginTop: "40px",
                }}
              >
                {[
                  ["01", "Ideas"],
                  ["02", "Execution"],
                  ["03", "Impact"],
                ].map(([number, title]) => (
                  <div
                    key={number}
                    style={{
                      padding: "22px",
                      background: "#18181d",
                      border:
                        "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span
                      style={{
                        color: theme.primaryColor,
                        fontSize: "11px",
                      }}
                    >
                      {number}
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "18px",
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

      {/* PROJECTS */}

      {products && (
        <section
          id="projects"
          style={{
            padding: "110px 0",
            background: "#f8fafc",
            color: "#0f172a",
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
                  Selected Work
                </span>

                <h2
                  style={{
                    margin: "13px 0 0",
                    fontSize: "50px",
                    lineHeight: 1,
                    letterSpacing: "-0.045em",
                  }}
                >
                  {products.title &&
                  products.title !== "Products"
                    ? products.title
                    : "Featured projects"}
                </h2>
              </div>

              <p
                style={{
                  maxWidth: "380px",
                  margin: 0,
                  color: "#64748b",
                  lineHeight: 1.7,
                }}
              >
                A selection of work representing
                our approach, creativity and
                attention to detail.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,1fr)",
                gap: "22px",
              }}
            >
              {projects.map((project, index) => (
                <article
                  key={project.number}
                  style={{
                    minHeight:
                      index % 2 === 0
                        ? "410px"
                        : "350px",
                    position: "relative",
                    overflow: "hidden",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:
                      "flex-end",
                    background:
                      index % 2 === 0
                        ? "#e2e8f0"
                        : "#dbeafe",
                    borderRadius: "16px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "210px",
                      height: "210px",
                      top: "-70px",
                      right: "-50px",
                      borderRadius: "50%",
                      background:
                        theme.primaryColor,
                      opacity: 0.1,
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
                        fontSize: "12px",
                        fontWeight: 900,
                      }}
                    >
                      PROJECT {project.number}
                    </span>

                    <h3
                      style={{
                        margin:
                          "12px 0 8px",
                        fontSize: "28px",
                        letterSpacing:
                          "-0.025em",
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        maxWidth: "470px",
                        margin: 0,
                        color: "#475569",
                        lineHeight: 1.7,
                      }}
                    >
                      {project.description}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        scrollTo("contact")
                      }
                      style={{
                        marginTop: "22px",
                        padding: 0,
                        background: "transparent",
                        color: theme.primaryColor,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      Discuss a similar project →
                    </button>
                  </div>
                </article>
              ))}
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
            background: "#0b0b0f",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                maxWidth: "700px",
                marginBottom: "55px",
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
                Capabilities
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  fontSize: "50px",
                  lineHeight: 1.05,
                  letterSpacing: "-0.045em",
                }}
              >
                {services.title &&
                services.title !== "Services"
                  ? services.title
                  : "What we can do"}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3,1fr)",
                gap: "1px",
                background:
                  "rgba(255,255,255,0.1)",
              }}
            >
              {[
                [
                  "Strategy",
                  "Turn ideas into clear, practical plans with a strong direction.",
                ],
                [
                  "Design",
                  "Create experiences that look distinctive and feel intuitive.",
                ],
                [
                  "Execution",
                  "Transform concepts into polished and dependable results.",
                ],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  style={{
                    minHeight: "280px",
                    padding: "32px",
                    background: "#111116",
                  }}
                >
                  <span
                    style={{
                      color: theme.primaryColor,
                      fontSize: "12px",
                      fontWeight: 900,
                    }}
                  >
                    0{index + 1}
                  </span>

                  <h3
                    style={{
                      margin:
                        "35px 0 12px",
                      fontSize: "23px",
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#a1a1aa",
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

      {/* CTA */}

      <section
        style={{
          padding: "100px 0",
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
              Have an idea?
            </span>

            <h2
              style={{
                margin: "12px 0 0",
                fontSize: "42px",
                lineHeight: 1.1,
              }}
            >
              Let's make it real.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "15px 25px",
              borderRadius: "10px",
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
            background: "#111116",
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
                fontSize: "52px",
                lineHeight: 1.05,
                letterSpacing: "-0.045em",
              }}
            >
              Let's build something
              meaningful.
            </h2>

            <p
              style={{
                maxWidth: "650px",
                margin: "0 auto",
                color: "#a1a1aa",
                lineHeight: 1.8,
              }}
            >
              {contact.content ||
                `Tell ${website.name} about your project, requirement or idea.`}
            </p>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  `mailto:?subject=${encodeURIComponent(
                    `Project enquiry - ${website.name}`
                  )}&body=${encodeURIComponent(
                    `Hello ${website.name}, I would like to discuss a project with you.`
                  )}`)
              }
              style={{
                marginTop: "30px",
                padding: "14px 25px",
                borderRadius: "9px",
                background: theme.primaryColor,
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
          padding: "45px 0 22px",
          background: "#07070a",
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
                  color: "#52525b",
                  fontSize: "12px",
                }}
              >
                {website.tagline ||
                  "Creative work with purpose."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("home")}
              style={{
                padding: 0,
                background: "transparent",
                color: theme.primaryColor,
                cursor: "pointer",
                fontWeight: 700,
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
                "1px solid rgba(255,255,255,0.07)",
              color: "#3f3f46",
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