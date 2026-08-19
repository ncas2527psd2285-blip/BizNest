import type {
  BusinessProfile,
  WebsitePage,
  WebsiteSettings,
  WebsiteTemplate,
  WebsiteTheme,
} from "./WebsiteBuilderPage";

type Props = {
  profile: BusinessProfile;
  template: WebsiteTemplate;
  theme: WebsiteTheme;
  pages: WebsitePage[];
  settings: WebsiteSettings;
};

export default function WebsitePreview({
  profile,
  template,
  theme,
  pages,
  settings,
}: Props) {
  const name =
    profile.name ||
    "Your Business";

  const tagline =
    profile.tagline ||
    "Build your business online";

  const enabledPages =
    pages.filter(
      (page) =>
        page.enabled
    );

  const isDark =
    template ===
      "technology" ||
    template ===
      "portfolio";

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "14px",
          alignItems:
            "center",
        }}
      >
        <div>
          <strong>
            Live Website Preview
          </strong>

          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              marginTop: "3px",
            }}
          >
            {template}
          </div>
        </div>

        <span
          style={{
            padding:
              "5px 9px",
            borderRadius:
              "999px",
            background:
              "#dcfce7",
            color:
              "#15803d",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          Preview
        </span>
      </div>

      <div
        style={{
          border:
            "1px solid #cbd5e1",
          borderRadius:
            theme.borderRadius,
          overflow: "hidden",
          background:
            theme.backgroundColor,
          color:
            theme.textColor,
          fontFamily:
            theme.fontFamily,
        }}
      >
        <header
          style={{
            padding:
              "18px 28px",
            display:
              "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            background:
              isDark
                ? "#0f172a"
                : "#ffffff",
            color:
              isDark
                ? "#ffffff"
                : theme.textColor,
            borderBottom:
              "1px solid rgba(148,163,184,.2)",
            position:
              settings.stickyHeader
                ? "sticky"
                : "static",
            top: 0,
            zIndex: 2,
          }}
        >
          <strong
            style={{
              fontSize:
                "19px",
            }}
          >
            {name}
          </strong>

          <nav
            style={{
              display:
                "flex",
              gap: "18px",
              fontSize:
                "13px",
            }}
          >
            {enabledPages
              .slice(0, 5)
              .map(
                (page) => (
                  <span
                    key={
                      page.id
                    }
                  >
                    {
                      page.name
                    }
                  </span>
                )
              )}
          </nav>
        </header>

        <section
          style={{
            padding:
              "75px 30px",
            textAlign:
              "center",
            background:
              `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
            color: "#ffffff",
          }}
        >
          <small
            style={{
              letterSpacing:
                "2px",
              opacity:
                0.85,
            }}
          >
            {profile.type ||
              "BUSINESS"}
          </small>

          <h1
            style={{
              fontSize:
                "42px",
              margin:
                "15px auto",
              maxWidth:
                "720px",
            }}
          >
            {tagline}
          </h1>

          <p
            style={{
              maxWidth:
                "600px",
              margin:
                "auto",
              lineHeight:
                1.7,
              opacity:
                0.9,
            }}
          >
            {profile.description ||
              "Create a professional online presence for your business."}
          </p>

          <button
            type="button"
            style={{
              marginTop:
                "22px",
              padding:
                "12px 20px",
              border: "none",
              borderRadius:
                theme.borderRadius,
              background:
                "#ffffff",
              color:
                theme.primaryColor,
              fontWeight:
                700,
            }}
          >
            Get Started
          </button>
        </section>

        <section
          style={{
            padding:
              "45px 30px",
            display:
              "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "15px",
          }}
        >
          {[
            "Professional Service",
            "Quality Products",
            "Customer Support",
          ].map(
            (item) => (
              <div
                key={item}
                style={{
                  padding:
                    "22px",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius:
                    theme.borderRadius,
                  background:
                    "#ffffff",
                }}
              >
                <div
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
                      "10px",
                    background:
                      `${theme.primaryColor}18`,
                    color:
                      theme.primaryColor,
                    fontWeight:
                      800,
                  }}
                >
                  ✓
                </div>

                <h3>
                  {item}
                </h3>

                <p
                  style={{
                    fontSize:
                      "13px",
                    color:
                      "#64748b",
                  }}
                >
                  Designed to give
                  your customers a
                  great experience.
                </p>
              </div>
            )
          )}
        </section>

        {settings.showProducts && (
          <section
            style={{
              padding:
                "20px 30px 50px",
            }}
          >
            <h2>
              Featured Products
            </h2>

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(3,1fr)",
                gap:
                  "15px",
              }}
            >
              {[
                "Featured Product",
                "Popular Product",
                "New Product",
              ].map(
                (product) => (
                  <div
                    key={
                      product
                    }
                    style={{
                      border:
                        "1px solid #e2e8f0",
                      borderRadius:
                        theme.borderRadius,
                      overflow:
                        "hidden",
                    }}
                  >
                    <div
                      style={{
                        height:
                          "120px",
                        background:
                          "#e2e8f0",
                      }}
                    />

                    <div
                      style={{
                        padding:
                          "14px",
                      }}
                    >
                      <strong>
                        {product}
                      </strong>

                      {settings.showPrices && (
                        <p
                          style={{
                            color:
                              theme.primaryColor,
                            fontWeight:
                              700,
                          }}
                        >
                          ₹1,999
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        <footer
          style={{
            padding:
              "25px 30px",
            background:
              isDark
                ? "#020617"
                : "#f8fafc",
            color:
              isDark
                ? "#ffffff"
                : "#475569",
            textAlign:
              "center",
            fontSize:
              "13px",
          }}
        >
          ©{" "}
          {new Date().getFullYear()}{" "}
          {name}. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}