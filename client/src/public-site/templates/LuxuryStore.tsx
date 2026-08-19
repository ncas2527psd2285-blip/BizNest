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

export default function LuxuryStore({
  website,
  theme,
  sections,
}: Props) {
  const about = sections.find(
    (section) =>
      section.id === "about" &&
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

  const contact = sections.find(
    (section) =>
      section.id === "contact" &&
      section.enabled
  );

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const gold =
    theme.accentColor ||
    "#c9a227";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf9f6",
        color: "#171717",
        fontFamily:
          theme.fontFamily,
      }}
    >
      {/* LUXURY ANNOUNCEMENT BAR */}

      <div
        style={{
          background: "#171717",
          color: "#ffffff",
          textAlign: "center",
          padding: "9px 15px",
          fontSize: "11px",
          letterSpacing:
            "0.18em",
          textTransform:
            "uppercase",
        }}
      >
        Exclusive quality •
        Crafted for you •{" "}
        {website.name}
      </div>

      {/* NAVIGATION */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background:
            "rgba(250,249,246,0.94)",
          backdropFilter:
            "blur(18px)",
          borderBottom:
            "1px solid rgba(23,23,23,0.1)",
        }}
      >
        <div
          className="modern-container"
          style={{
            minHeight: "88px",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            gap: "25px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              scrollTo("home")
            }
            style={{
              padding: 0,
              background:
                "transparent",
              cursor: "pointer",
              color: "#171717",
              textAlign: "left",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "10px",
                letterSpacing:
                  "0.25em",
                textTransform:
                  "uppercase",
                color: "#777",
              }}
            >
              Maison
            </span>

            <strong
              style={{
                display: "block",
                marginTop: "3px",
                fontFamily:
                  "Georgia, serif",
                fontSize: "21px",
                letterSpacing:
                  "0.04em",
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
              gap: "28px",
            }}
          >
            <button
              type="button"
              onClick={() =>
                scrollTo("home")
              }
              style={{
                padding: 0,
                background:
                  "transparent",
                cursor:
                  "pointer",
                color: "#555",
                fontSize:
                  "12px",
                letterSpacing:
                  "0.1em",
                textTransform:
                  "uppercase",
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
                  padding: 0,
                  background:
                    "transparent",
                  cursor:
                    "pointer",
                  color: "#555",
                  fontSize:
                    "12px",
                  letterSpacing:
                    "0.1em",
                  textTransform:
                    "uppercase",
                }}
              >
                Story
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
                  padding: 0,
                  background:
                    "transparent",
                  cursor:
                    "pointer",
                  color: "#555",
                  fontSize:
                    "12px",
                  letterSpacing:
                    "0.1em",
                  textTransform:
                    "uppercase",
                }}
              >
                Collection
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
                  padding: 0,
                  background:
                    "transparent",
                  cursor:
                    "pointer",
                  color: "#555",
                  fontSize:
                    "12px",
                  letterSpacing:
                    "0.1em",
                  textTransform:
                    "uppercase",
                }}
              >
                Services
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
                  padding: 0,
                  background:
                    "transparent",
                  cursor:
                    "pointer",
                  color: "#555",
                  fontSize:
                    "12px",
                  letterSpacing:
                    "0.1em",
                  textTransform:
                    "uppercase",
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
              background:
                "#171717",
              color: "#ffffff",
              borderRadius:
                "0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing:
                "0.1em",
              textTransform:
                "uppercase",
              cursor:
                "pointer",
            }}
          >
            Enquire
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        style={{
          minHeight:
            "calc(100vh - 126px)",
          display: "flex",
          alignItems:
            "center",
          position:
            "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#faf9f6 0%,#f0ede5 100%)",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            width: "650px",
            height: "650px",
            borderRadius:
              "50%",
            right: "-260px",
            top: "-220px",
            border:
              `1px solid ${gold}55`,
          }}
        />

        <div
          style={{
            position:
              "absolute",
            width: "430px",
            height: "430px",
            borderRadius:
              "50%",
            right: "-150px",
            top: "-110px",
            border:
              `1px solid ${gold}35`,
          }}
        />

        <div
          className="modern-container"
          style={{
            position:
              "relative",
            zIndex: 1,
            display:
              "grid",
            gridTemplateColumns:
              "1fr 0.85fr",
            gap: "80px",
            alignItems:
              "center",
            padding:
              "100px 0",
          }}
        >
          <div>
            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "12px",
                marginBottom:
                  "26px",
              }}
            >
              <span
                style={{
                  width: "45px",
                  height: "1px",
                  background:
                    gold,
                }}
              />

              <span
                style={{
                  color: gold,
                  fontSize:
                    "11px",
                  letterSpacing:
                    "0.25em",
                  textTransform:
                    "uppercase",
                }}
              >
                Signature
                Collection
              </span>
            </div>

            <h1
              style={{
                maxWidth:
                  "720px",
                margin: 0,
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize:
                  "clamp(48px,6vw,82px)",
                fontWeight: 400,
                lineHeight:
                  1.02,
                letterSpacing:
                  "-0.04em",
              }}
            >
              {website.tagline ||
                `The art of exceptional ${website.name}`}
            </h1>

            <p
              style={{
                maxWidth:
                  "600px",
                margin:
                  "30px 0 0",
                color: "#666",
                fontSize:
                  "17px",
                lineHeight:
                  1.9,
              }}
            >
              {website.description ||
                "Discover carefully crafted products and exceptional service created for those who appreciate quality."}
            </p>

            <div
              style={{
                display:
                  "flex",
                gap: "12px",
                flexWrap:
                  "wrap",
                marginTop:
                  "35px",
              }}
            >
              {products && (
                <button
                  type="button"
                  onClick={() =>
                    scrollTo(
                      "products"
                    )
                  }
                  style={{
                    padding:
                      "15px 25px",
                    background:
                      "#171717",
                    color:
                      "#ffffff",
                    border:
                      "1px solid #171717",
                    fontSize:
                      "11px",
                    fontWeight:
                      800,
                    letterSpacing:
                      "0.12em",
                    textTransform:
                      "uppercase",
                    cursor:
                      "pointer",
                  }}
                >
                  Explore
                  Collection
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  scrollTo(
                    "contact"
                  )
                }
                style={{
                  padding:
                    "15px 25px",
                  background:
                    "transparent",
                  color: "#171717",
                  border:
                    `1px solid #171717`,
                  fontSize:
                    "11px",
                  fontWeight:
                    800,
                  letterSpacing:
                    "0.12em",
                  textTransform:
                    "uppercase",
                  cursor:
                    "pointer",
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          <div>
            <div
              style={{
                position:
                  "relative",
                minHeight:
                  "500px",
                background:
                  "#171717",
                overflow:
                  "hidden",
              }}
            >
              <div
                style={{
                  position:
                    "absolute",
                  inset: "22px",
                  border:
                    `1px solid ${gold}66`,
                }}
              />

              <div
                style={{
                  position:
                    "absolute",
                  width:
                    "230px",
                  height:
                    "230px",
                  borderRadius:
                    "50%",
                  top: "90px",
                  left: "50%",
                  transform:
                    "translateX(-50%)",
                  background:
                    `radial-gradient(circle at 35% 30%,#ffffff,${gold} 28%,#5c4510 75%)`,
                  opacity: 0.9,
                  boxShadow:
                    `0 25px 80px ${gold}30`,
                }}
              />

              <div
                style={{
                  position:
                    "absolute",
                  bottom:
                    "50px",
                  left: 0,
                  right: 0,
                  textAlign:
                    "center",
                  padding:
                    "0 30px",
                }}
              >
                <span
                  style={{
                    color:
                      gold,
                    fontSize:
                      "10px",
                    letterSpacing:
                      "0.25em",
                    textTransform:
                      "uppercase",
                  }}
                >
                  Established
                  Excellence
                </span>

                <h2
                  style={{
                    margin:
                      "12px 0 8px",
                    color:
                      "#ffffff",
                    fontFamily:
                      "Georgia, serif",
                    fontSize:
                      "32px",
                    fontWeight: 400,
                  }}
                >
                  {website.name}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color:
                      "#999",
                    fontSize:
                      "13px",
                  }}
                >
                  {website.tagline ||
                    "Quality without compromise."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section
        style={{
          padding:
            "80px 0",
          background:
            "#171717",
          color:
            "#ffffff",
          textAlign:
            "center",
        }}
      >
        <div
          className="modern-container"
          style={{
            maxWidth:
              "850px",
          }}
        >
          <span
            style={{
              color: gold,
              fontSize:
                "10px",
              letterSpacing:
                "0.25em",
              textTransform:
                "uppercase",
            }}
          >
            The Difference
          </span>

          <h2
            style={{
              margin:
                "18px 0",
              fontFamily:
                "Georgia, serif",
              fontWeight: 400,
              fontSize:
                "clamp(30px,4vw,48px)",
              lineHeight:
                1.2,
            }}
          >
            Designed with
            intention. Delivered
            with excellence.
          </h2>

          <p
            style={{
              margin: 0,
              color:
                "#aaa",
              fontSize:
                "16px",
              lineHeight:
                1.9,
            }}
          >
            Every detail matters.
            From the first
            interaction to the
            final experience,
            {` ${website.name}`}{" "}
            focuses on quality,
            authenticity and
            lasting value.
          </p>
        </div>
      </section>

      {/* STORY */}

      {about && (
        <section
          id="about"
          style={{
            padding:
              "110px 0",
            background:
              "#faf9f6",
          }}
        >
          <div
            className="modern-container"
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "0.8fr 1.2fr",
              gap: "90px",
              alignItems:
                "center",
            }}
          >
            <div
              style={{
                minHeight:
                  "400px",
                display:
                  "flex",
                alignItems:
                  "flex-end",
                padding:
                  "35px",
                background:
                  "#e7e1d5",
              }}
            >
              <div>
                <span
                  style={{
                    color:
                      gold,
                    fontSize:
                      "10px",
                    letterSpacing:
                      "0.2em",
                    textTransform:
                      "uppercase",
                  }}
                >
                  Our Story
                </span>

                <h2
                  style={{
                    margin:
                      "15px 0 0",
                    fontFamily:
                      "Georgia, serif",
                    fontSize:
                      "43px",
                    fontWeight: 400,
                  }}
                >
                  {about.title &&
                  about.title !==
                    "About"
                    ? about.title
                    : "A story of quality"}
                </h2>
              </div>
            </div>

            <div>
              <span
                style={{
                  color:
                    gold,
                  fontSize:
                    "10px",
                    letterSpacing:
                      "0.2em",
                  textTransform:
                    "uppercase",
                }}
              >
                About Us
              </span>

              <p
                style={{
                  margin:
                    "22px 0 0",
                  color:
                    "#555",
                  fontFamily:
                    "Georgia, serif",
                  fontSize:
                    "21px",
                  lineHeight:
                    1.8,
                }}
              >
                {about.content ||
                  website.description ||
                  `${website.name} creates experiences built around craftsmanship, thoughtful service and uncompromising quality.`}
              </p>

              <div
                style={{
                  width:
                    "70px",
                  height:
                    "1px",
                  marginTop:
                    "30px",
                  background:
                    gold,
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* COLLECTION */}

      {products && (
        <section
          id="products"
          style={{
            padding:
              "110px 0",
            background:
              "#ffffff",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                textAlign:
                  "center",
                marginBottom:
                  "55px",
              }}
            >
              <span
                style={{
                  color:
                    gold,
                  fontSize:
                    "10px",
                  letterSpacing:
                    "0.25em",
                  textTransform:
                    "uppercase",
                }}
              >
                The Collection
              </span>

              <h2
                style={{
                  margin:
                    "15px 0 0",
                  fontFamily:
                    "Georgia, serif",
                  fontSize:
                    "48px",
                  fontWeight: 400,
                }}
              >
                {products.title &&
                products.title !==
                  "Products"
                  ? products.title
                  : "Curated for You"}
              </h2>

              <p
                style={{
                  maxWidth:
                    "600px",
                  margin:
                    "15px auto 0",
                  color:
                    "#777",
                }}
              >
                Explore a selection
                created to combine
                timeless style with
                modern quality.
              </p>
            </div>

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(3,1fr)",
                gap: "24px",
              }}
            >
              {[
                {
                  title:
                    "Signature",
                  text:
                    "Our signature selection reflects the character and quality of our brand.",
                  number:
                    "01",
                },
                {
                  title:
                    "Personalized",
                  text:
                    "Thoughtfully tailored options created around your individual requirements.",
                  number:
                    "02",
                },
                {
                  title:
                    "Essential",
                  text:
                    "Timeless essentials made for dependable everyday experiences.",
                  number:
                    "03",
                },
              ].map(
                (item) => (
                  <article
                    key={
                      item.number
                    }
                    style={{
                      background:
                        "#faf9f6",
                      padding:
                        "42px 32px",
                      minHeight:
                        "330px",
                      border:
                        "1px solid #ebe8e0",
                    }}
                  >
                    <span
                      style={{
                        color:
                          gold,
                        fontFamily:
                          "Georgia, serif",
                        fontSize:
                          "18px",
                      }}
                    >
                      {
                        item.number
                      }
                    </span>

                    <div
                      style={{
                        width:
                          "100%",
                        height:
                          "130px",
                        margin:
                          "25px 0",
                        background:
                          "linear-gradient(135deg,#e8e2d7,#d1c7b5)",
                        display:
                          "grid",
                        placeItems:
                          "center",
                        color:
                          "#8c806d",
                        fontFamily:
                          "Georgia, serif",
                        fontSize:
                          "24px",
                      }}
                    >
                      {website.name}
                    </div>

                    <h3
                      style={{
                        margin:
                          "0 0 9px",
                        fontFamily:
                          "Georgia, serif",
                        fontSize:
                          "23px",
                        fontWeight:
                          400,
                      }}
                    >
                      {
                        item.title
                      }
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color:
                          "#777",
                        fontSize:
                          "14px",
                        lineHeight:
                          1.7,
                      }}
                    >
                      {
                        item.text
                      }
                    </p>
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
            padding:
              "105px 0",
            background:
              "#f1eee7",
          }}
        >
          <div className="modern-container">
            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "0.8fr 1.2fr",
                gap: "80px",
              }}
            >
              <div>
                <span
                  style={{
                    color:
                      gold,
                    fontSize:
                      "10px",
                    letterSpacing:
                      "0.25em",
                    textTransform:
                      "uppercase",
                  }}
                >
                  Services
                </span>

                <h2
                  style={{
                    margin:
                      "15px 0 0",
                    fontFamily:
                      "Georgia, serif",
                    fontSize:
                      "46px",
                    fontWeight:
                      400,
                    lineHeight:
                      1.15,
                  }}
                >
                  {services.title &&
                  services.title !==
                    "Services"
                    ? services.title
                    : "Exceptional service"}
                </h2>

                <p
                  style={{
                    color:
                      "#777",
                    lineHeight:
                      1.8,
                  }}
                >
                  {services.subtitle ||
                    "Personal attention and thoughtful solutions at every step."}
                </p>
              </div>

              <div>
                {[
                  "Personal Consultation",
                  "Custom Solutions",
                  "Premium Support",
                ].map(
                  (
                    title,
                    index
                  ) => (
                    <div
                      key={
                        title
                      }
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "55px 1fr",
                        gap: "18px",
                        padding:
                          "24px 0",
                        borderBottom:
                          "1px solid #d5d0c5",
                      }}
                    >
                      <span
                        style={{
                          color:
                            gold,
                          fontFamily:
                            "Georgia, serif",
                          fontSize:
                            "18px",
                        }}
                      >
                        0
                        {index +
                          1}
                      </span>

                      <div>
                        <h3
                          style={{
                            margin:
                              0,
                            fontFamily:
                              "Georgia, serif",
                            fontSize:
                              "21px",
                            fontWeight:
                              400,
                          }}
                        >
                          {
                            title
                          }
                        </h3>

                        <p
                          style={{
                            margin:
                              "7px 0 0",
                            color:
                              "#777",
                            fontSize:
                              "14px",
                          }}
                        >
                          Carefully
                          considered
                          service
                          designed
                          around
                          your
                          expectations.
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}

      <section
        style={{
          padding:
            "95px 0",
          background:
            "#171717",
          color:
            "#ffffff",
          textAlign:
            "center",
        }}
      >
        <div
          className="modern-container"
          style={{
            maxWidth:
              "760px",
          }}
        >
          <span
            style={{
              color: gold,
              fontSize:
                "10px",
              letterSpacing:
                "0.25em",
              textTransform:
                "uppercase",
            }}
          >
            Begin Your Experience
          </span>

          <h2
            style={{
              margin:
                "18px 0",
              fontFamily:
                "Georgia, serif",
              fontSize:
                "clamp(36px,5vw,58px)",
              fontWeight:
                400,
            }}
          >
            Let's create
            something
            exceptional.
          </h2>

          <p
            style={{
              margin:
                "0 auto",
              maxWidth:
                "600px",
              color:
                "#999",
              lineHeight:
                1.8,
            }}
          >
            Connect with{" "}
            {website.name} and
            discover a more
            thoughtful way to
            experience quality.
          </p>

          <button
            type="button"
            onClick={() =>
              scrollTo("contact")
            }
            style={{
              marginTop:
                "30px",
              padding:
                "15px 28px",
              background:
                gold,
              color:
                "#171717",
              fontWeight:
                800,
              fontSize:
                "11px",
              letterSpacing:
                "0.12em",
              textTransform:
                "uppercase",
              cursor:
                "pointer",
            }}
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* CONTACT */}

      {contact && (
        <section
          id="contact"
          style={{
            padding:
              "105px 0",
            background:
              "#faf9f6",
          }}
        >
          <div
            className="modern-container"
            style={{
              maxWidth:
                "900px",
              textAlign:
                "center",
            }}
          >
            <span
              style={{
                color: gold,
                fontSize:
                  "10px",
                letterSpacing:
                  "0.25em",
                textTransform:
                  "uppercase",
              }}
            >
              Contact
            </span>

            <h2
              style={{
                margin:
                  "16px 0",
                fontFamily:
                  "Georgia, serif",
                fontSize:
                  "48px",
                fontWeight:
                  400,
              }}
            >
              We would love to
              hear from you.
            </h2>

            <p
              style={{
                maxWidth:
                  "650px",
                margin:
                  "0 auto",
                color:
                  "#777",
                lineHeight:
                  1.8,
              }}
            >
              {website.name} is
              ready to answer
              your questions,
              discuss your
              requirements and
              help you find the
              right solution.
            </p>

            <div
              style={{
                marginTop:
                  "38px",
                padding:
                  "25px",
                background:
                  "#ffffff",
                border:
                  "1px solid #e7e2d9",
                textAlign:
                  "left",
              }}
            >
              <p
                style={{
                  margin: 0,
                  whiteSpace:
                    "pre-wrap",
                  color:
                    "#555",
                  lineHeight:
                    1.8,
                }}
              >
                {contact.content ||
                  "Please contact us for enquiries and more information."}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                window.location.href =
                  `mailto:?subject=${encodeURIComponent(
                    `Enquiry for ${website.name}`
                  )}&body=${encodeURIComponent(
                    `Hello ${website.name}, I would like to know more about your products and services.`
                  )}`
              }
              style={{
                marginTop:
                  "25px",
                padding:
                  "14px 25px",
                background:
                  "#171717",
                color:
                  "#ffffff",
                fontSize:
                  "11px",
                fontWeight:
                  800,
                letterSpacing:
                  "0.12em",
                textTransform:
                  "uppercase",
                cursor:
                  "pointer",
              }}
            >
              Send Enquiry
            </button>
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer
        style={{
          padding:
            "50px 0 25px",
          background:
            "#111111",
          color:
            "#ffffff",
        }}
      >
        <div
          className="modern-container"
        >
          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              gap: "30px",
              flexWrap:
                "wrap",
              alignItems:
                "center",
            }}
          >
            <div>
              <strong
                style={{
                  fontFamily:
                    "Georgia, serif",
                  fontSize:
                    "20px",
                  fontWeight:
                    400,
                }}
              >
                {website.name}
              </strong>

              <p
                style={{
                  margin:
                    "7px 0 0",
                  color:
                    "#777",
                  fontSize:
                    "12px",
                }}
              >
                {website.tagline ||
                  "Exceptional quality, thoughtfully delivered."}
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
                color: gold,
                fontSize:
                  "11px",
                letterSpacing:
                  "0.12em",
                textTransform:
                  "uppercase",
                cursor:
                  "pointer",
              }}
            >
              Back to top ↑
            </button>
          </div>

          <div
            style={{
              marginTop:
                "35px",
              paddingTop:
                "20px",
              borderTop:
                "1px solid #292929",
              color:
                "#555",
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