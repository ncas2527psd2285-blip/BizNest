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

export default function MinimalShop({
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

  const shopItems = [
    {
      name: "Essential Collection",
      price: "₹999",
      category: "Everyday",
    },
    {
      name: "Premium Collection",
      price: "₹1,499",
      category: "Premium",
    },
    {
      name: "Signature Collection",
      price: "₹1,999",
      category: "Signature",
    },
    {
      name: "Limited Edition",
      price: "₹2,499",
      category: "Limited",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        color: "#181818",
        fontFamily: theme.fontFamily,
      }}
    >
      {/* ANNOUNCEMENT */}

      <div
        style={{
          minHeight: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "7px 20px",
          background: "#181818",
          color: "#ffffff",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Free delivery on selected orders
      </div>

      {/* HEADER */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(250,250,250,0.95)",
          backdropFilter: "blur(15px)",
          borderBottom: "1px solid #e9e9e9",
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
              color: "#181818",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <strong
              style={{
                display: "block",
                fontSize: "18px",
                letterSpacing: "-0.035em",
              }}
            >
              {website.name}
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "2px",
                color: "#999999",
                fontSize: "8px",
                letterSpacing: "0.17em",
                textTransform: "uppercase",
              }}
            >
              Official Store
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
                color: "#666666",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Home
            </button>

            {products && (
              <button
                type="button"
                onClick={() => scrollTo("shop")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#666666",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Shop
              </button>
            )}

            {about && (
              <button
                type="button"
                onClick={() => scrollTo("about")}
                style={{
                  padding: 0,
                  background: "transparent",
                  color: "#666666",
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
                  color: "#666666",
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
                  color: "#666666",
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
            onClick={() => scrollTo("shop")}
            style={{
              width: "40px",
              height: "40px",
              display: "grid",
              placeItems: "center",
              padding: 0,
              borderRadius: "50%",
              background: "#ffffff",
              color: "#181818",
              border: "1px solid #dedede",
              cursor: "pointer",
              fontSize: "16px",
            }}
            aria-label="Shopping bag"
          >
            ♡
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          padding: "70px 0 100px",
          background: "#fafafa",
        }}
      >
        <div
          className="modern-container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 0.95fr",
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
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              New Season
            </span>

            <h1
              style={{
                maxWidth: "700px",
                margin: "20px 0 0",
                fontSize: "clamp(48px,6vw,78px)",
                lineHeight: 0.98,
                letterSpacing: "-0.065em",
                fontWeight: 700,
              }}
            >
              {website.tagline ||
                `Simple products. Thoughtfully made.`}
            </h1>

            <p
              style={{
                maxWidth: "580px",
                margin: "25px 0 0",
                color: "#707070",
                fontSize: "17px",
                lineHeight: 1.8,
              }}
            >
              {website.description ||
                `${website.name} brings together carefully selected products designed for everyday life.`}
            </p>

            <div
              style={{
                display: "flex",
                gap: "11px",
                flexWrap: "wrap",
                marginTop: "30px",
              }}
            >
              {products && (
                <button
                  type="button"
                  onClick={() => scrollTo("shop")}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "5px",
                    background: theme.primaryColor,
                    color: "#ffffff",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  Shop Collection
                </button>
              )}

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                style={{
                  padding: "14px 24px",
                  borderRadius: "5px",
                  background: "#ffffff",
                  color: "#181818",
                  border: "1px solid #dcdcdc",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* HERO PRODUCT VISUAL */}

          <div
            style={{
              minHeight: "530px",
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(145deg,#ece8e2,#d6d0c7)",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "360px",
                height: "360px",
                left: "50%",
                top: "45%",
                transform: "translate(-50%,-50%)",
                borderRadius: "50%",
                background: "#f7f5f1",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "43%",
                transform: "translate(-50%,-50%)",
                width: "190px",
                height: "240px",
                borderRadius: "20px 20px 45px 45px",
                background: "#ffffff",
                boxShadow:
                  "0 35px 60px rgba(0,0,0,0.13)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "43%",
                transform: "translate(-50%,-50%)",
                width: "65px",
                height: "65px",
                borderRadius: "50%",
                border:
                  `2px solid ${theme.primaryColor}`,
                opacity: 0.8,
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "30px",
                right: "30px",
                bottom: "25px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#777777",
                    fontSize: "9px",
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                  }}
                >
                  Featured
                </span>

                <strong
                  style={{
                    display: "block",
                    marginTop: "5px",
                    fontSize: "19px",
                  }}
                >
                  Signature Piece
                </strong>
              </div>

              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "20px",
                }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}

      <section
        style={{
          padding: "30px 0",
          background: "#ffffff",
          borderTop: "1px solid #eeeeee",
          borderBottom: "1px solid #eeeeee",
        }}
      >
        <div
          className="modern-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
          }}
        >
          {[
            ["Free Delivery", "On eligible orders"],
            ["Secure Payment", "100% protected"],
            ["Easy Support", "We're here to help"],
            ["Quality First", "Made with care"],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                padding: "8px 0",
                textAlign: "center",
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "12px",
                }}
              >
                {title}
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "#999999",
                  fontSize: "10px",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP */}

      {products && (
        <section
          id="shop"
          style={{
            padding: "105px 0",
            background: "#fafafa",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: "25px",
                marginBottom: "45px",
              }}
            >
              <div>
                <span
                  style={{
                    color: theme.primaryColor,
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Shop
                </span>

                <h2
                  style={{
                    margin: "12px 0 0",
                    fontSize: "44px",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {products.title &&
                  products.title !== "Products"
                    ? products.title
                    : "Our collection"}
                </h2>
              </div>

              <p
                style={{
                  maxWidth: "380px",
                  margin: 0,
                  color: "#777777",
                  lineHeight: 1.7,
                  fontSize: "13px",
                }}
              >
                {products.subtitle ||
                  "Explore our latest collection of carefully selected products."}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "15px",
              }}
            >
              {shopItems.map((item, index) => (
                <article
                  key={item.name}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e8e8e8",
                  }}
                >
                  <div
                    style={{
                      height: "310px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      background:
                        index % 2 === 0
                          ? "#efede9"
                          : "#e8e8e5",
                    }}
                  >
                    <div
                      style={{
                        width: "150px",
                        height: "190px",
                        borderRadius:
                          index % 2 === 0
                            ? "8px 8px 25px 25px"
                            : "50%",
                        background:
                          index === 0
                            ? "#ffffff"
                            : index === 1
                            ? "#d6d1ca"
                            : index === 2
                            ? "#202020"
                            : theme.primaryColor,
                        boxShadow:
                          "0 20px 35px rgba(0,0,0,0.12)",
                      }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "14px",
                        padding: "6px 8px",
                        background: "#ffffff",
                        color: "#555555",
                        fontSize: "8px",
                        fontWeight: 900,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "18px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: 700,
                      }}
                    >
                      {item.name}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "12px",
                      }}
                    >
                      <strong
                        style={{
                          color: theme.primaryColor,
                          fontSize: "14px",
                        }}
                      >
                        {item.price}
                      </strong>

                      <button
                        type="button"
                        onClick={() => scrollTo("contact")}
                        style={{
                          padding: 0,
                          background: "transparent",
                          color: "#555555",
                          fontWeight: 800,
                          cursor: "pointer",
                          fontSize: "11px",
                        }}
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT */}

      {about && (
        <section
          id="about"
          style={{
            padding: "105px 0",
            background: "#181818",
            color: "#ffffff",
          }}
        >
          <div
            className="modern-container"
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.2fr",
              gap: "80px",
            }}
          >
            <div>
              <span
                style={{
                  color: theme.accentColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                About
              </span>

              <h2
                style={{
                  margin: "15px 0 0",
                  fontSize: "46px",
                  lineHeight: 1.05,
                  letterSpacing: "-0.05em",
                }}
              >
                {about.title &&
                about.title !== "About"
                  ? about.title
                  : "Less, but better."}
              </h2>
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: "#a4a4a4",
                  fontSize: "18px",
                  lineHeight: 1.9,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} focuses on simple design, useful products and quality experiences without unnecessary complexity.`}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "12px",
                  marginTop: "40px",
                }}
              >
                {[
                  ["01", "Simple"],
                  ["02", "Useful"],
                  ["03", "Quality"],
                ].map(([number, title]) => (
                  <div
                    key={title}
                    style={{
                      padding: "20px",
                      background: "#222222",
                      border:
                        "1px solid #303030",
                    }}
                  >
                    <span
                      style={{
                        color: theme.accentColor,
                        fontSize: "10px",
                        fontWeight: 900,
                      }}
                    >
                      {number}
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "14px",
                        fontSize: "14px",
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
            background: "#ffffff",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                maxWidth: "700px",
                marginBottom: "45px",
              }}
            >
              <span
                style={{
                  color: theme.primaryColor,
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Services
              </span>

              <h2
                style={{
                  margin: "13px 0 0",
                  fontSize: "45px",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                }}
              >
                {services.title &&
                services.title !== "Services"
                  ? services.title
                  : "Made for your business"}
              </h2>

              <p
                style={{
                  margin: "16px 0 0",
                  color: "#777777",
                  lineHeight: 1.8,
                }}
              >
                {services.subtitle ||
                  "Simple solutions that help your business sell, grow and connect with customers."}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "15px",
              }}
            >
              {[
                [
                  "Custom Orders",
                  "Create products tailored to your requirements.",
                ],
                [
                  "Business Solutions",
                  "Flexible services designed for growing businesses.",
                ],
                [
                  "Customer Support",
                  "Personal assistance whenever you need it.",
                ],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  style={{
                    minHeight: "230px",
                    padding: "28px",
                    background: "#fafafa",
                    border:
                      "1px solid #e7e7e7",
                  }}
                >
                  <span
                    style={{
                      color: theme.primaryColor,
                      fontSize: "10px",
                      fontWeight: 900,
                    }}
                  >
                    0{index + 1}
                  </span>

                  <h3
                    style={{
                      margin: "30px 0 10px",
                      fontSize: "20px",
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#777777",
                      fontSize: "13px",
                      lineHeight: 1.8,
                    }}
                  >
                    {text}
                  </p>

                  <button
                    type="button"
                    onClick={() => scrollTo("contact")}
                    style={{
                      marginTop: "18px",
                      padding: 0,
                      background: "transparent",
                      color: theme.primaryColor,
                      fontWeight: 900,
                      cursor: "pointer",
                      fontSize: "11px",
                    }}
                  >
                    Enquire →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER / CTA */}

      <section
        style={{
          padding: "80px 0",
          background:
            `${theme.primaryColor}0d`,
          borderTop:
            `1px solid ${theme.primaryColor}20`,
          borderBottom:
            `1px solid ${theme.primaryColor}20`,
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
                color: theme.primaryColor,
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Stay Connected
            </span>

            <h2
              style={{
                margin: "11px 0 0",
                fontSize: "34px",
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
              }}
            >
              Discover what's new.
            </h2>

            <p
              style={{
                margin: "10px 0 0",
                color: "#777777",
                fontSize: "13px",
              }}
            >
              Follow our latest products,
              offers and updates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "14px 23px",
              borderRadius: "5px",
              background: theme.primaryColor,
              color: "#ffffff",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Get in Touch →
          </button>
        </div>
      </section>

      {/* CONTACT */}

      {contact && (
        <section
          id="contact"
          style={{
            padding: "105px 0",
            background: "#fafafa",
          }}
        >
          <div
            className="modern-container"
            style={{
              maxWidth: "850px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: theme.primaryColor,
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Contact
            </span>

            <h2
              style={{
                margin: "14px 0",
                fontSize:
                  "clamp(43px,6vw,67px)",
                lineHeight: 0.98,
                letterSpacing: "-0.06em",
              }}
            >
              Have a question?
            </h2>

            <p
              style={{
                maxWidth: "600px",
                margin: "22px auto 0",
                color: "#777777",
                lineHeight: 1.8,
              }}
            >
              {contact.content ||
                `Contact ${website.name} for product enquiries, custom orders and support.`}
            </p>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  `mailto:?subject=${encodeURIComponent(
                    `Enquiry - ${website.name}`
                  )}&body=${encodeURIComponent(
                    `Hello ${website.name}, I would like to make an enquiry.`
                  )}`)
              }
              style={{
                marginTop: "28px",
                padding: "15px 27px",
                borderRadius: "5px",
                background: "#181818",
                color: "#ffffff",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Send an Enquiry
            </button>
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer
        style={{
          padding: "45px 0 22px",
          background: "#181818",
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
                  color: "#777777",
                  fontSize: "11px",
                }}
              >
                {website.tagline ||
                  "Simple. Useful. Better."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("home")}
              style={{
                padding: 0,
                background: "transparent",
                color: theme.accentColor,
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
              color: "#555555",
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