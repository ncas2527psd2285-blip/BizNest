import type {
  WebsitePage,
} from "./WebsiteBuilderPage";

type Props = {
  pages: WebsitePage[];
  onChange: (
    pages: WebsitePage[]
  ) => void;
};

export default function PageManager({
  pages,
  onChange,
}: Props) {
  const addPage = () => {
    const id =
      `page-${Date.now()}`;

    onChange([
      ...pages,
      {
        id,
        name: "New Page",
        slug: `/${id}`,
        enabled: true,
        order: pages.length,
      },
    ]);
  };

  const updatePage = (
    id: string,
    key: keyof WebsitePage,
    value: string | boolean | number
  ) => {
    onChange(
      pages.map((page) =>
        page.id === id
          ? {
              ...page,
              [key]: value,
            }
          : page
      )
    );
  };

  const removePage = (
    id: string
  ) => {
    onChange(
      pages.filter(
        (page) =>
          page.id !== id
      )
    );
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        border:
          "1px solid #e2e8f0",
        borderRadius: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>
            Website Pages
          </h2>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Manage your website
            navigation.
          </p>
        </div>

        <button
          type="button"
          onClick={addPage}
          style={{
            border: "none",
            background: "#2563eb",
            color: "#fff",
            padding:
              "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          + Add Page
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gap: "12px",
        }}
      >
        {pages.map(
          (page) => (
            <div
              key={page.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr auto auto",
                gap: "10px",
                alignItems:
                  "center",
                padding: "14px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "10px",
              }}
            >
              <input
                value={page.name}
                onChange={(
                  event
                ) =>
                  updatePage(
                    page.id,
                    "name",
                    event.target.value
                  )
                }
              />

              <input
                value={page.slug}
                onChange={(
                  event
                ) =>
                  updatePage(
                    page.id,
                    "slug",
                    event.target.value
                  )
                }
              />

              <label
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems:
                    "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    page.enabled
                  }
                  onChange={(
                    event
                  ) =>
                    updatePage(
                      page.id,
                      "enabled",
                      event.target.checked
                    )
                  }
                />
                Visible
              </label>

              <button
                type="button"
                onClick={() =>
                  removePage(
                    page.id
                  )
                }
                style={{
                  border: "none",
                  background:
                    "#fee2e2",
                  color:
                    "#b91c1c",
                  padding:
                    "8px 12px",
                  borderRadius:
                    "7px",
                  cursor:
                    "pointer",
                }}
              >
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}