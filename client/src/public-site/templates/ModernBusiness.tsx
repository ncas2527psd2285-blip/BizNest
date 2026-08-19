import type {
  WebsiteTheme,
} from "../PublicWebsite";

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

function getSection(
  sections: WebsiteSection[],
  id: string
) {
  return sections.find(
    (section) =>
      section.id === id &&
      section.enabled
  );
}

function parseJson<T>(
  value?: string
): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export default function ModernBusiness({
  website,
  theme,
  sections,
}: Props) {
  const hero =
    getSection(
      sections,
      "home"
    );

  const about =
    getSection(
      sections,
      "about"
    );

  const products =
    getSection(
      sections,
      "products"
    );

  const services =
    getSection(
      sections,
      "services"
    );

  const contact =
    getSection(
      sections,
      "contact"
    );

  const contactData =
    parseJson<{
      email?: string;
      phone?: string;
      whatsapp?: string;
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      instagram?: string;
      facebook?: string;
      linkedin?: string;
      youtube?: string;
    }>(
      contact?.content
    );

  const serviceData =
    parseJson<{
      settings?: {
        showProducts?: boolean;
        showServices?: boolean;
        showPrices?: boolean;
        showStock?: boolean;
        showContactForm?: boolean;
        stickyHeader?: boolean;
        mobileMenu?: boolean;
      };
      hours?: Record<
        string,
        string
      >;
    }>(
      services?.content
    );

  const scrollTo =
    (id: string) => {
      const element =
        document.getElementById(
          id
        );

      if (element) {
        element.scrollIntoView({
          behavior:
            "smooth",
        });
      }
    };

  const whatsappNumber =
    contactData?.whatsapp ||
    contactData?.phone ||
    "";

  const whatsappUrl =
    whatsappNumber
      ? `https://wa.me/${whatsappNumber.replace(
          /\D/g,
          ""
        )}`
      : "";

  const emailUrl =
    contactData?.email
      ? `mailto:${contactData.email}`
      : "";

  const phoneUrl =
    contactData?.phone
      ? `tel:${contactData.phone}`
      : "";

  const showProducts =
    serviceData?.settings
      ?.showProducts !==
    false;

  const showServices =
    serviceData?.settings
      ?.showServices !==
    false;

  const showContactForm =
    serviceData?.settings
      ?.showContactForm !==
    false;

  return (
    <div
      className="modern-business-template"
      style={{
        fontFamily:
          theme.fontFamily,
        color:
          theme.textColor,
        background:
          theme.backgroundColor,
      }}
    >
      {/* NAVBAR */}

      <header
        className="modern-navbar"
        style={{
          borderBottom:
            "1px solid rgba(15,23,42,0.08)",
          background:
            "rgba(255,255,255,0.92)",
        }}
      >
        <div className="modern-container modern-navbar-inner">
          <button
            type="button"
            className="modern-logo"
            onClick={() =>
              scrollTo("home")
            }
          >
            <span
              className="modern-logo-mark"
              style={{
                background:
                  theme.primaryColor,
              }}
            >
              {website.name
                .charAt(0)
                .toUpperCase()}
            </span>

            <span>
              {website.name}
            </span>
          </button>

          <nav className="modern-nav-links">
            <button
              type="button"
              onClick={() =>
                scrollTo("home")
              }
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
              >
                About
              </button>
            )}

            {showProducts &&
              products && (
                <button
                  type="button"
                  onClick={() =>
                    scrollTo(
                      "products"
                    )
                  }
                >
                  Products
                </button>
              )}

            {showServices &&
              services && (
                <button
                  type="button"
                  onClick={() =>
                    scrollTo(
                      "services"
                    )
                  }
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
              >
                Contact
              </button>
            )}
          </nav>

          <button
            type="button"
            className="modern-nav-cta"
            onClick={() =>
              scrollTo("contact")
            }
            style={{
              background:
                theme.primaryColor,
            }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        className="modern-hero"
        style={{
          background: `linear-gradient(135deg, ${theme.backgroundColor} 0%, #f1f5f9 100%)`,
        }}
      >
        <div className="modern-container modern-hero-grid">
          <div className="modern-hero-content">
            <div
              className="modern-eyebrow"
              style={{
                color:
                  theme.primaryColor,
                background:
                  `${theme.primaryColor}12`,
              }}
            >
              {website.name}
            </div>

            <h1>
              {hero?.title &&
              hero.title !==
                "Home"
                ? hero.title
                : website.tagline ||
                  `Grow your business with ${website.name}`}
            </h1>

            <p>
              {hero?.content ||
                website.description ||
                "Professional products and services designed to help you achieve more."}
            </p>

            <div className="modern-hero-actions">
              <button
                type="button"
                onClick={() =>
                  scrollTo(
                    "contact"
                  )
                }
                style={{
                  background:
                    theme.primaryColor,
                }}
              >
                Contact Us
              </button>

              {(products ||
                services) && (
                <button
                  type="button"
                  className="modern-secondary-button"
                  onClick={() =>
                    scrollTo(
                      products
                        ? "products"
                        : "services"
                    )
                  }
                >
                  Explore More
                  →
                </button>
              )}
            </div>

            <div className="modern-trust-row">
              <div>
                <strong>
                  Professional
                </strong>
                <span>
                  Quality service
                </span>
              </div>

              <div>
                <strong>
                  Reliable
                </strong>
                <span>
                  Customer focused
                </span>
              </div>

              <div>
                <strong>
                  Local
                </strong>
                <span>
                  Serving your area
                </span>
              </div>
            </div>
          </div>

          <div className="modern-hero-visual">
            <div
              className="modern-hero-card"
              style={{
                borderRadius:
                  theme.borderRadius,
              }}
            >
              <div
                className="modern-hero-orb"
                style={{
                  background:
                    theme.primaryColor,
                }}
              />

              <div className="modern-hero-card-content">
                <span>
                  Welcome to
                </span>

                <strong>
                  {website.name}
                </strong>

                <p>
                  {website.tagline ||
                    "Your trusted business partner."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      {about && (
        <section
          id="about"
          className="modern-section"
        >
          <div className="modern-container modern-two-column">
            <div>
              <span
                className="modern-section-label"
                style={{
                  color:
                    theme.primaryColor,
                }}
              >
                ABOUT US
              </span>

              <h2>
                {about.title &&
                about.title !==
                  "About"
                  ? about.title
                  : `About ${website.name}`}
              </h2>
            </div>

            <div>
              <p className="modern-large-text">
                {about.content ||
                  website.description ||
                  `${website.name} is committed to delivering quality products and services with a strong focus on customer satisfaction.`}
              </p>

              {website.tagline && (
                <div
                  className="modern-highlight"
                  style={{
                    borderLeft:
                      `4px solid ${theme.primaryColor}`,
                  }}
                >
                  {website.tagline}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FEATURE STRIP */}

      <section
        className="modern-feature-strip"
        style={{
          background:
            theme.primaryColor,
        }}
      >
        <div className="modern-container modern-feature-grid">
          <div>
            <span>
              ✓
            </span>

            <strong>
              Quality First
            </strong>

            <p>
              We care about
              every detail.
            </p>
          </div>

          <div>
            <span>
              ✓
            </span>

            <strong>
              Customer Focused
            </strong>

            <p>
              Your satisfaction
              matters.
            </p>
          </div>

          <div>
            <span>
              ✓
            </span>

            <strong>
              Professional Service
            </strong>

            <p>
              Reliable from
              start to finish.
            </p>
          </div>

          <div>
            <span>
              ✓
            </span>

            <strong>
              Trusted Business
            </strong>

            <p>
              Built on trust
              and quality.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}

      {showProducts &&
        products && (
          <section
            id="products"
            className="modern-section modern-light-section"
          >
            <div className="modern-container">
              <div className="modern-section-heading">
                <span
                  className="modern-section-label"
                  style={{
                    color:
                      theme.primaryColor,
                  }}
                >
                  OUR PRODUCTS
                </span>

                <h2>
                  {products.title &&
                  products.title !==
                    "Products"
                    ? products.title
                    : "Explore Our Products"}
                </h2>

                <p>
                  Discover products
                  created with quality
                  and attention to
                  detail.
                </p>
              </div>

              <div className="modern-product-grid">
                <article className="modern-product-card">
                  <div
                    className="modern-product-icon"
                    style={{
                      background:
                        `${theme.primaryColor}12`,
                      color:
                        theme.primaryColor,
                    }}
                  >
                    ✦
                  </div>

                  <h3>
                    Premium Products
                  </h3>

                  <p>
                    High-quality
                    products designed
                    around your needs.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      scrollTo(
                        "contact"
                      )
                    }
                  >
                    Enquire →
                  </button>
                </article>

                <article className="modern-product-card">
                  <div
                    className="modern-product-icon"
                    style={{
                      background:
                        `${theme.primaryColor}12`,
                      color:
                        theme.primaryColor,
                    }}
                  >
                    ◆
                  </div>

                  <h3>
                    Custom Solutions
                  </h3>

                  <p>
                    Personalized options
                    for your unique
                    requirements.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      scrollTo(
                        "contact"
                      )
                    }
                  >
                    Enquire →
                  </button>
                </article>

                <article className="modern-product-card">
                  <div
                    className="modern-product-icon"
                    style={{
                      background:
                        `${theme.primaryColor}12`,
                      color:
                        theme.primaryColor,
                    }}
                  >
                    ★
                  </div>

                  <h3>
                    Best Value
                  </h3>

                  <p>
                    Excellent quality
                    combined with
                    dependable service.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      scrollTo(
                        "contact"
                      )
                    }
                  >
                    Enquire →
                  </button>
                </article>
              </div>
            </div>
          </section>
        )}

      {/* SERVICES */}

      {showServices &&
        services && (
          <section
            id="services"
            className="modern-section"
          >
            <div className="modern-container">
              <div className="modern-section-heading">
                <span
                  className="modern-section-label"
                  style={{
                    color:
                      theme.primaryColor,
                  }}
                >
                  WHAT WE DO
                </span>

                <h2>
                  {services.title &&
                  services.title !==
                    "Services"
                    ? services.title
                    : "Our Services"}
                </h2>

                <p>
                  Professional
                  solutions tailored
                  to your requirements.
                </p>
              </div>

              <div className="modern-service-grid">
                <article className="modern-service-card">
                  <div
                    className="modern-service-number"
                    style={{
                      color:
                        theme.primaryColor,
                    }}
                  >
                    01
                  </div>

                  <h3>
                    Professional
                    Service
                  </h3>

                  <p>
                    Get dependable
                    service from
                    experienced
                    professionals.
                  </p>
                </article>

                <article className="modern-service-card">
                  <div
                    className="modern-service-number"
                    style={{
                      color:
                        theme.primaryColor,
                    }}
                  >
                    02
                  </div>

                  <h3>
                    Custom Solutions
                  </h3>

                  <p>
                    Solutions designed
                    specifically for
                    your business and
                    requirements.
                  </p>
                </article>

                <article className="modern-service-card">
                  <div
                    className="modern-service-number"
                    style={{
                      color:
                        theme.primaryColor,
                    }}
                  >
                    03
                  </div>

                  <h3>
                    Customer Support
                  </h3>

                  <p>
                    We're here to help
                    before, during and
                    after your purchase.
                  </p>
                </article>
              </div>
            </div>
          </section>
        )}

      {/* BUSINESS HOURS */}

      {serviceData?.hours && (
        <section className="modern-hours-section">
          <div className="modern-container modern-hours-inner">
            <div>
              <span
                className="modern-section-label"
                style={{
                  color:
                    theme.primaryColor,
                }}
              >
                BUSINESS HOURS
              </span>

              <h2>
                Visit or Contact Us
              </h2>

              <p>
                We're available
                during the following
                hours.
              </p>
            </div>

            <div className="modern-hours-list">
              {Object.entries(
                serviceData.hours
              ).map(
                ([
                  day,
                  time,
                ]) => (
                  <div
                    key={day}
                  >
                    <span>
                      {day
                        .charAt(
                          0
                        )
                        .toUpperCase() +
                        day.slice(
                          1
                        )}
                    </span>

                    <strong>
                      {time}
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}

      {contact && (
        <section
          id="contact"
          className="modern-contact-section"
          style={{
            background:
              theme.secondaryColor,
          }}
        >
          <div className="modern-container modern-contact-grid">
            <div className="modern-contact-copy">
              <span className="modern-section-label modern-white-label">
                CONTACT
              </span>

              <h2>
                Let's work together.
              </h2>

              <p>
                Have a question,
                requirement or
                project in mind?
                Contact{" "}
                {website.name}.
              </p>

              <div className="modern-contact-details">
                {contactData?.phone && (
                  <a
                    href={
                      phoneUrl
                    }
                  >
                    <span>
                      ☎
                    </span>

                    <div>
                      <small>
                        Phone
                      </small>

                      <strong>
                        {
                          contactData.phone
                        }
                      </strong>
                    </div>
                  </a>
                )}

                {contactData?.email && (
                  <a
                    href={
                      emailUrl
                    }
                  >
                    <span>
                      ✉
                    </span>

                    <div>
                      <small>
                        Email
                      </small>

                      <strong>
                        {
                          contactData.email
                        }
                      </strong>
                    </div>
                  </a>
                )}

                {(contactData?.address ||
                  contactData?.city) && (
                  <div>
                    <span>
                      📍
                    </span>

                    <div>
                      <small>
                        Location
                      </small>

                      <strong>
                        {[
                          contactData.address,
                          contactData.city,
                          contactData.state,
                        ]
                          .filter(
                            Boolean
                          )
                          .join(
                            ", "
                          )}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showContactForm && (
              <div className="modern-contact-card">
                <h3>
                  Send us a
                  message
                </h3>

                <p>
                  Tell us what you
                  need and we'll get
                  back to you.
                </p>

                <form
                  onSubmit={(
                    event
                  ) => {
                    event.preventDefault();

                    if (
                      whatsappUrl
                    ) {
                      window.open(
                        `${whatsappUrl}?text=${encodeURIComponent(
                          `Hello ${website.name}, I would like to know more about your products/services.`
                        )}`,
                        "_blank",
                        "noopener,noreferrer"
                      );

                      return;
                    }

                    if (
                      emailUrl
                    ) {
                      window.location.href =
                        `${emailUrl}?subject=${encodeURIComponent(
                          `Enquiry for ${website.name}`
                        )}`;
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your email"
                    required
                  />

                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    required
                  />

                  <button
                    type="submit"
                    style={{
                      background:
                        theme.primaryColor,
                    }}
                  >
                    Send Enquiry →
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer
        className="modern-footer"
        style={{
          background:
            "#0f172a",
        }}
      >
        <div className="modern-container modern-footer-grid">
          <div>
            <div className="modern-footer-brand">
              <span
                style={{
                  background:
                    theme.primaryColor,
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

            <p>
              {website.tagline ||
                website.description ||
                "Professional products and services."}
            </p>
          </div>

          <div className="modern-footer-links">
            <strong>
              Quick Links
            </strong>

            <button
              type="button"
              onClick={() =>
                scrollTo(
                  "home"
                )
              }
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
              >
                About
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
              >
                Products
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
              >
                Contact
              </button>
            )}
          </div>

          <div className="modern-footer-links">
            <strong>
              Connect
            </strong>

            {contactData?.instagram && (
              <a
                href={
                  contactData.instagram.startsWith(
                    "http"
                  )
                    ? contactData.instagram
                    : `https://instagram.com/${contactData.instagram.replace(
                        /^@/,
                        ""
                      )}`
                }
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            )}

            {contactData?.facebook && (
              <a
                href={
                  contactData.facebook.startsWith(
                    "http"
                  )
                    ? contactData.facebook
                    : `https://facebook.com/${contactData.facebook}`
                }
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            )}

            {contactData?.linkedin && (
              <a
                href={
                  contactData.linkedin.startsWith(
                    "http"
                  )
                    ? contactData.linkedin
                    : `https://linkedin.com/in/${contactData.linkedin}`
                }
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="modern-footer-bottom">
          <div className="modern-container">
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