import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api";

type Supplier = {
  _id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt?: string;
};

type SupplierForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

const emptyForm: SupplierForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

type Props = {
  token: string;
};

export default function SuppliersPage({
  token,
}: Props) {
  const [suppliers, setSuppliers] =
    useState<Supplier[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingSupplier, setEditingSupplier] =
    useState<Supplier | null>(null);

  const [form, setForm] =
    useState<SupplierForm>(emptyForm);

  const loadSuppliers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/suppliers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to load suppliers"
        );
      }

      setSuppliers(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load suppliers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filteredSuppliers = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) {
      return suppliers;
    }

    return suppliers.filter(
      (supplier) =>
        supplier.name
          .toLowerCase()
          .includes(value) ||
        supplier.company
          ?.toLowerCase()
          .includes(value) ||
        supplier.email
          ?.toLowerCase()
          .includes(value) ||
        supplier.phone
          ?.toLowerCase()
          .includes(value)
    );
  }, [suppliers, search]);

  const openCreate = () => {
    setEditingSupplier(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEdit = (
    supplier: Supplier
  ) => {
    setEditingSupplier(supplier);

    setForm({
      name: supplier.name || "",
      company: supplier.company || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      address: supplier.address || "",
      notes: supplier.notes || "",
    });

    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingSupplier(null);
    setForm(emptyForm);
  };

  const saveSupplier = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Supplier name is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        company:
          form.company.trim() || undefined,
        email:
          form.email.trim() || undefined,
        phone:
          form.phone.trim() || undefined,
        address:
          form.address.trim() || undefined,
        notes:
          form.notes.trim() || undefined,
      };

      const url = editingSupplier
        ? `${API_URL}/suppliers/${editingSupplier._id}`
        : `${API_URL}/suppliers`;

      const response = await fetch(url, {
        method: editingSupplier
          ? "PATCH"
          : "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to save supplier"
        );
      }

      closeModal();

      await loadSuppliers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save supplier"
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteSupplier = async (
    supplier: Supplier
  ) => {
    const confirmed =
      window.confirm(
        `Delete supplier "${supplier.name}"?`
      );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/suppliers/${supplier._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to delete supplier"
        );
      }

      await loadSuppliers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete supplier"
      );
    }
  };

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>Suppliers</h2>

          <p>
            Manage your suppliers and
            vendor contacts
          </p>
        </div>

        <div className="toolbar-actions">

          <button
            className="secondary-button"
            onClick={loadSuppliers}
          >
            Refresh
          </button>

          <button
            className="primary-button add-button"
            onClick={openCreate}
          >
            + Add Supplier
          </button>

        </div>

      </div>

      <div className="cards">

        <div className="stat-card">
          <span>
            Total Suppliers
          </span>

          <strong>
            {suppliers.length}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            With Email
          </span>

          <strong>
            {
              suppliers.filter(
                (item) => item.email
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>
            With Phone
          </span>

          <strong>
            {
              suppliers.filter(
                (item) => item.phone
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Companies
          </span>

          <strong>
            {
              new Set(
                suppliers
                  .map(
                    (item) =>
                      item.company
                  )
                  .filter(Boolean)
              ).size
            }
          </strong>
        </div>

      </div>

      <div className="search-bar">

        <input
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search suppliers..."
        />

      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="customer-table-panel">

        {loading ? (

          <div className="table-empty">
            Loading suppliers...
          </div>

        ) : filteredSuppliers.length ===
          0 ? (

          <div className="table-empty">

            <div className="empty-large">
              🏢
            </div>

            <h3>
              {search
                ? "No suppliers found"
                : "No suppliers yet"}
            </h3>

            <p>
              {search
                ? "Try a different search."
                : "Add your first supplier to get started."}
            </p>

            {!search && (
              <button
                className="primary-button add-button"
                onClick={openCreate}
              >
                + Add Supplier
              </button>
            )}

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Supplier
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Contact
                  </th>

                  <th>
                    Address
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredSuppliers.map(
                  (supplier) => (

                    <tr
                      key={
                        supplier._id
                      }
                    >

                      <td>

                        <div className="customer-name">

                          <div className="customer-avatar">
                            {supplier.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {
                                supplier.name
                              }
                            </strong>

                            <span>
                              {
                                supplier.notes ||
                                ""
                              }
                            </span>

                          </div>

                        </div>

                      </td>

                      <td>
                        {
                          supplier.company ||
                          "—"
                        }
                      </td>

                      <td>

                        <div className="contact-cell">

                          <span>
                            {
                              supplier.email ||
                              "—"
                            }
                          </span>

                          <span>
                            {
                              supplier.phone ||
                              "—"
                            }
                          </span>

                        </div>

                      </td>

                      <td>
                        {
                          supplier.address ||
                          "—"
                        }
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="icon-button edit"
                            onClick={() =>
                              openEdit(
                                supplier
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="icon-button delete"
                            onClick={() =>
                              deleteSupplier(
                                supplier
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingSupplier
                    ? "Edit Supplier"
                    : "Add Supplier"}
                </h2>

                <p>
                  Add supplier contact
                  information.
                </p>

              </div>

              <button
                className="close-button"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              onSubmit={saveSupplier}
            >

              <div className="form-grid">

                <div className="form-field full">

                  <label>
                    Supplier Name *
                  </label>

                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name:
                          event.target.value,
                      })
                    }
                    placeholder="Supplier name"
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Company
                  </label>

                  <input
                    value={
                      form.company
                    }
                    onChange={(event) =>
                      setForm({
                        ...form,
                        company:
                          event.target.value,
                      })
                    }
                    placeholder="Company"
                  />

                </div>

                <div className="form-field">

                  <label>
                    Phone
                  </label>

                  <input
                    value={form.phone}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        phone:
                          event.target.value,
                      })
                    }
                    placeholder="9876543210"
                  />

                </div>

                <div className="form-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email:
                          event.target.value,
                      })
                    }
                    placeholder="supplier@example.com"
                  />

                </div>

                <div className="form-field">

                  <label>
                    Address
                  </label>

                  <input
                    value={
                      form.address
                    }
                    onChange={(event) =>
                      setForm({
                        ...form,
                        address:
                          event.target.value,
                      })
                    }
                    placeholder="Supplier address"
                  />

                </div>

                <div className="form-field full">

                  <label>
                    Notes
                  </label>

                  <textarea
                    value={form.notes}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        notes:
                          event.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Additional notes"
                  />

                </div>

              </div>

              {error && (
                <div className="error">
                  {error}
                </div>
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button modal-save"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingSupplier
                    ? "Update Supplier"
                    : "Create Supplier"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </section>
  );
}