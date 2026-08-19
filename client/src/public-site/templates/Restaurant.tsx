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

export default function Restaurant({
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fffaf3",
        color: "#29231f",
        fontFamily: theme.fontFamily,
      }}
    >
      {/* HEADER */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255,250,243,0.96)",
          backdropFilter: "blur(15px)",
          borderBottom: "1px solid #eadfd2",
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
              background: "transparent",
              cursor: "pointer",
              color: "#29231f",
              textAlign: "left",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: theme.primaryColor,
              }}
            >
              Welcome to
            </span>

            <strong
              style={{
                display: "block",
                marginTop: "2px",
                fontFamily: "Georgia, serif",
                fontSize: "21px",
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
                background: "transparent",
                cursor: "pointer",
                color: "#655b54",
                fontWeight: 600,
              }}
            >
              Home
            </button>

            {about && (
              <button
                type="button"
                onClick={() => scrollTo("about")}
                style={{
                  background: "transparent",
                  cursor: "pointer",
                  color: "#655b54",
                  fontWeight: 600,
                }}
              >
                About
              </button>
            )}

            {products && (
              <button
                type="button"
                onClick={() => scrollTo("products")}
                style={{
                  background: "transparent",
                  cursor: "pointer",
                  color: "#655b54",
                  fontWeight: 600,
                }}
              >
                Menu
              </button>
            )}

            {services && (
              <button
                type="button"
                onClick={() => scrollTo("services")}
                style={{
                  background: "transparent",
                  cursor: "pointer",
                  color: "#655b54",
                  fontWeight: 600,
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
                  background: "transparent",
                  cursor: "pointer",
                  color: "#655b54",
                  fontWeight: 600,
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
              padding: "11px 19px",
              borderRadius: "999px",
              background: theme.primaryColor,
              color: "#ffffff",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Reserve
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          minHeight: "650px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#fffaf3 0%,#f4e6d4 100%)",
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
            opacity: 0.07,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            left: "-150px",
            bottom: "-120px",
            borderRadius: "50%",
            background: theme.accentColor,
            opacity: 0.08,
          }}
        />

        <div
          className="modern-container"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 0.85fr",
            gap: "75px",
            alignItems: "center",
            padding: "85px 0",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                marginBottom: "18px",
                color: theme.primaryColor,
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Fresh • Local • Delicious
            </span>

            <h1
              style={{
                margin: 0,
                fontFamily: "Georgia, serif",
                fontSize: "clamp(46px,6vw,78px)",
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
              }}
            >
              {website.tagline ||
                `A taste worth remembering at ${website.name}`}
            </h1>

            <p
              style={{
                maxWidth: "600px",
                margin: "25px 0 0",
                color: "#756b62",
                fontSize: "18px",
                lineHeight: 1.85,
              }}
            >
              {website.description ||
                "Delicious food, warm hospitality and memorable experiences made with care."}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              {products && (
                <button
                  type="button"
                  onClick={() => scrollTo("products")}
                  style={{
                    padding: "14px 23px",
                    borderRadius: "999px",
                    background: theme.primaryColor,
                    color: "#ffffff",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  View Menu
                </button>
              )}

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: "14px 23px",
                  borderRadius: "999px",
                  background: "#ffffff",
                  color: "#29231f",
                  border: "1px solid #d8cbbd",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          <div>
            <div
              style={{
                position: "relative",
                minHeight: "470px",
                borderRadius: "180px 180px 25px 25px",
                overflow: "hidden",
                background:
                  "linear-gradient(145deg,#3d2a20,#765238)",
                boxShadow:
                  "0 30px 70px rgba(61,42,32,0.22)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "20px",
                  border:
                    "1px solid rgba(255,255,255,0.25)",
                  borderRadius:
                    "165px 165px 18px 18px",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: "230px",
                  height: "230px",
                  top: "80px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 35% 30%,#fff2c4,#d49b49 35%,#6e3e20 72%)",
                  boxShadow:
                    "0 25px 55px rgba(0,0,0,0.25)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "45px",
                  left: "0",
                  right: "0",
                  textAlign: "center",
                  padding: "0 30px",
                }}
              >
                <span
                  style={{
                    color: "#e7bd76",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Our Kitchen
                </span>

                <h2
                  style={{
                    margin: "10px 0 5px",
                    color: "#ffffff",
                    fontFamily: "Georgia, serif",
                    fontSize: "30px",
                    fontWeight: 400,
                  }}
                >
                  {website.name}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "13px",
                  }}
                >
                  Made fresh with care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE STRIP */}

      <section
        style={{
          padding: "42px 0",
          background: "#29231f",
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
                fontFamily: "Georgia, serif",
                fontSize: "22px",
              }}
            >
              Fresh Ingredients
            </strong>

            <span
              style={{
                color: "#b9aaa0",
                fontSize: "12px",
              }}
            >
              Carefully selected
            </span>
          </div>

          <div>
            <strong
              style={{
                display: "block",
                fontFamily: "Georgia, serif",
                fontSize: "22px",
              }}
            >
              Warm Hospitality
            </strong>

            <span
              style={{
                color: "#b9aaa0",
                fontSize: "12px",
              }}
            >
              Guests come first
            </span>
          </div>

          <div>
            <strong
              style={{
                display: "block",
                fontFamily: "Georgia, serif",
                fontSize: "22px",
              }}
            >
              Made With Love
            </strong>

            <span
              style={{
                color: "#b9aaa0",
                fontSize: "12px",
              }}
            >
              Every dish matters
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
                  "linear-gradient(145deg,#ead6bd,#cba477)",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#6d4528",
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Our Story
                </span>

                <h2
                  style={{
                    margin: "12px 0 0",
                    fontFamily: "Georgia, serif",
                    fontSize: "42px",
                    fontWeight: 400,
                    color: "#38271c",
                  }}
                >
                  Made for
                  memorable moments.
                </h2>
              </div>
            </div>

            <div>
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                About Us
              </span>

              <h2
                style={{
                  margin: "12px 0 0",
                  fontFamily: "Georgia, serif",
                  fontSize: "44px",
                  fontWeight: 400,
                }}
              >
                {about.title &&
                about.title !== "About"
                  ? about.title
                  : `Welcome to ${website.name}`}
              </h2>

              <p
                style={{
                  margin: "22px 0 0",
                  color: "#70675f",
                  fontSize: "17px",
                  lineHeight: 1.9,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} brings together quality ingredients, thoughtful preparation and genuine hospitality to create a memorable experience for every guest.`}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* MENU */}

      {products && (
        <section
          id="products"
          style={{
            padding: "105px 0",
            background: "#fffaf3",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                maxWidth: "680px",
                margin: "0 auto 55px",
                textAlign: "center",
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
                Our Menu
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  fontFamily: "Georgia, serif",
                  fontSize: "48px",
                  fontWeight: 400,
                }}
              >
                {products.title &&
                products.title !== "Products"
                  ? products.title
                  : "Something delicious awaits"}
              </h2>

              <p
                style={{
                  margin: "14px auto 0",
                  color: "#766d65",
                  lineHeight: 1.8,
                }}
              >
                Explore our selection of
                carefully prepared favourites.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "18px",
              }}
            >
              {[
                [
                  "Signature Selection",
                  "A carefully prepared favourite made with quality ingredients.",
                ],
                [
                  "Chef's Special",
                  "A special creation designed to surprise and delight.",
                ],
                [
                  "Classic Favourite",
                  "A timeless choice our guests love coming back for.",
                ],
                [
                  "Custom Choice",
                  "Tell us what you are looking for and we'll help you choose.",
                ],
              ].map(
                ([title, text], index) => (
                  <article
                    key={title}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "95px 1fr",
                      gap: "20px",
                      padding: "22px",
                      background: "#ffffff",
                      border: "1px solid #eadfd2",
                    }}
                  >
                    <div
                      style={{
                        minHeight: "90px",
                        display: "grid",
                        placeItems: "center",
                        background:
                          index % 2 === 0
                            ? "#ead6bd"
                            : "#d7c2a9",
                        color: "#65462e",
                        fontFamily: "Georgia, serif",
                        fontSize: "15px",
                      }}
                    >
                      Dish
                      <br />
                      0{index + 1}
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "15px",
                        }}
                      >
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: "Georgia, serif",
                            fontSize: "21px",
                            fontWeight: 400,
                          }}
                        >
                          {title}
                        </h3>

                        <span
                          style={{
                            color: theme.primaryColor,
                            fontWeight: 800,
                          }}
                        >
                          ★
                        </span>
                      </div>

                      <p
                        style={{
                          margin: "8px 0 0",
                          color: "#756b62",
                          fontSize: "13px",
                          lineHeight: 1.7,
                        }}
                      >
                        {text}
                      </p>
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
            padding: "100px 0",
            background: "#ffffff",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                textAlign: "center",
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
                More Than Food
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  fontFamily: "Georgia, serif",
                  fontSize: "45px",
                  fontWeight: 400,
                }}
              >
                {services.title &&
                services.title !== "Services"
                  ? services.title
                  : "Our Hospitality"}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px",
              }}
            >
              {[
                [
                  "Private Events",
                  "Create memorable celebrations with our team.",
                ],
                [
                  "Takeaway",
                  "Enjoy your favourites wherever you are.",
                ],
                [
                  "Special Requests",
                  "Talk to us about your individual requirements.",
                ],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  style={{
                    padding: "35px",
                    minHeight: "240px",
                    background: "#fffaf3",
                    border: "1px solid #eadfd2",
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
                      margin: "28px 0 10px",
                      fontFamily: "Georgia, serif",
                      fontSize: "22px",
                      fontWeight: 400,
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#756b62",
                      fontSize: "14px",
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
          padding: "85px 0",
          background: theme.primaryColor,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <div
          className="modern-container"
          style={{
            maxWidth: "760px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            Your Table Awaits
          </span>

          <h2
            style={{
              margin: "15px 0",
              fontFamily: "Georgia, serif",
              fontSize: "48px",
              fontWeight: 400,
            }}
          >
            Make your next meal
            memorable.
          </h2>

          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
            }}
          >
            Visit {website.name} for good
            food, warm hospitality and a
            relaxed experience.
          </p>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              marginTop: "28px",
              padding: "14px 25px",
              borderRadius: "999px",
              background: "#ffffff",
              color: theme.primaryColor,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Reserve / Contact
          </button>
        </div>
      </section>

      {/* CONTACT */}

      {contact && (
        <section
          id="contact"
          style={{
            padding: "105px 0",
            background: "#fffaf3",
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
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Contact & Reservations
            </span>

            <h2
              style={{
                margin: "14px 0",
                fontFamily: "Georgia, serif",
                fontSize: "48px",
                fontWeight: 400,
              }}
            >
              We look forward to
              welcoming you.
            </h2>

            <p
              style={{
                maxWidth: "650px",
                margin: "0 auto",
                color: "#756b62",
                lineHeight: 1.8,
              }}
            >
              {contact.content ||
                "Contact us for reservations, enquiries and special requests."}
            </p>

            <div
              style={{
                marginTop: "35px",
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "mailto:?subject=" +
                    encodeURIComponent(
                      `Reservation enquiry - ${website.name}`
                    ))
                }
                style={{
                  padding: "14px 24px",
                  borderRadius: "999px",
                  background: "#29231f",
                  color: "#ffffff",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Send Enquiry
              </button>

              <button
                type="button"
                onClick={() => scrollTo("home")}
                style={{
                  padding: "14px 24px",
                  borderRadius: "999px",
                  background: "#ffffff",
                  color: "#29231f",
                  border: "1px solid #d8cbbd",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer
        style={{
          padding: "48px 0 22px",
          background: "#29231f",
          color: "#ffffff",
        }}
      >
        <div className="modern-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div>
              <strong
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "21px",
                  fontWeight: 400,
                }}
              >
                {website.name}
              </strong>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#a99b91",
                  fontSize: "12px",
                }}
              >
                {website.tagline ||
                  "Good food. Good people. Good memories."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("home")}
              style={{
                padding: 0,
                background: "transparent",
                color: "#d4a15d",
                fontSize: "11px",
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
              borderTop: "1px solid rgba(255,255,255,0.1)",
              color: "#746960",
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