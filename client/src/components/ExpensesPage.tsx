import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config";


type Expense = {
  _id: string;
  title?: string;
  description?: string;
  category?: string;
  amount: number;
  paymentMethod?: string;
  status?: string;
  date?: string;
  createdAt?: string;
  notes?: string;
};

type ExpenseForm = {
  title: string;
  description: string;
  category: string;
  amount: string;
  paymentMethod: string;
  date: string;
  notes: string;
};

type Props = {
  token: string;
};

const getToday = () => {
  return new Date().toISOString().slice(0, 10);
};

const emptyForm: ExpenseForm = {
  title: "",
  description: "",
  category: "",
  amount: "",
  paymentMethod: "CASH",
  date: getToday(),
  notes: "",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const getStatusClass = (status?: string) => {
  const value = status?.toUpperCase();

  if (
    value === "PAID" ||
    value === "COMPLETED"
  ) {
    return "status-badge received";
  }

  if (
    value === "PENDING" ||
    value === "UNPAID"
  ) {
    return "status-badge ordered";
  }

  if (
    value === "CANCELLED" ||
    value === "REJECTED"
  ) {
    return "status-badge cancelled";
  }

  return "status-badge draft";
};

export default function ExpensesPage({
  token,
}: Props) {
  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("ALL");

  const [showModal, setShowModal] =
    useState(false);

  const [editingExpense, setEditingExpense] =
    useState<Expense | null>(null);

  const [selectedExpense, setSelectedExpense] =
    useState<Expense | null>(null);

  const [form, setForm] =
    useState<ExpenseForm>(
      emptyForm
    );

  const loadExpenses = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/expenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to load expenses"
        );
      }

      const data =
        result.data?.expenses ??
        result.data ??
        [];

      setExpenses(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load expenses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        expenses
          .map(
            (expense) =>
              expense.category
          )
          .filter(Boolean)
      )
    ).sort();
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    return expenses.filter(
      (expense) => {
        const matchesSearch =
          !value ||
          expense.title
            ?.toLowerCase()
            .includes(value) ||
          expense.description
            ?.toLowerCase()
            .includes(value) ||
          expense.category
            ?.toLowerCase()
            .includes(value);

        const matchesCategory =
          categoryFilter === "ALL" ||
          expense.category ===
            categoryFilter;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );
  }, [
    expenses,
    search,
    categoryFilter,
  ]);

  const summary = useMemo(() => {
    const total = expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );

    const paid = expenses
      .filter(
        (expense) =>
          expense.status?.toUpperCase() ===
            "PAID" ||
          expense.status?.toUpperCase() ===
            "COMPLETED"
      )
      .reduce(
        (sum, expense) =>
          sum + Number(expense.amount || 0),
        0
      );

    const pending = expenses
      .filter(
        (expense) =>
          expense.status?.toUpperCase() ===
            "PENDING" ||
          expense.status?.toUpperCase() ===
            "UNPAID"
      )
      .reduce(
        (sum, expense) =>
          sum + Number(expense.amount || 0),
        0
      );

    const average =
      expenses.length > 0
        ? total / expenses.length
        : 0;

    return {
      count: expenses.length,
      total,
      paid,
      pending,
      average,
    };
  }, [expenses]);

  const openCreateModal = () => {
    setEditingExpense(null);
    setForm({
      ...emptyForm,
      date: getToday(),
    });
    setError("");
    setShowModal(true);
  };

  const openEditModal = (
    expense: Expense
  ) => {
    setEditingExpense(expense);

    setForm({
      title: expense.title || "",
      description:
        expense.description || "",
      category:
        expense.category || "",
      amount: String(
        expense.amount ?? ""
      ),
      paymentMethod:
        expense.paymentMethod ||
        "CASH",
      date: expense.date
        ? expense.date.slice(0, 10)
        : expense.createdAt
        ? expense.createdAt.slice(0, 10)
        : getToday(),
      notes: expense.notes || "",
    });

    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingExpense(null);
    setForm(emptyForm);
  };

  const saveExpense = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const amount =
      Number(form.amount);

    if (!form.title.trim()) {
      setError(
        "Expense title is required"
      );
      return;
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setError(
        "Expense amount must be greater than zero"
      );
      return;
    }

    if (!form.category.trim()) {
      setError(
        "Expense category is required"
      );
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        title: form.title.trim(),
        description:
          form.description.trim() ||
          undefined,
        category:
          form.category.trim(),
        amount,
        paymentMethod:
          form.paymentMethod,
        date: form.date,
        notes:
          form.notes.trim() ||
          undefined,
      };

      const url = editingExpense
        ? `${API_URL}/expenses/${editingExpense._id}`
        : `${API_URL}/expenses`;

      const response = await fetch(url, {
        method: editingExpense
          ? "PATCH"
          : "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to save expense"
        );
      }

      closeModal();

      await loadExpenses();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save expense"
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteExpense = async (
    expense: Expense
  ) => {
    const confirmed =
      window.confirm(
        `Delete expense "${expense.title || "this expense"}"?`
      );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/expenses/${expense._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to delete expense"
        );
      }

      await loadExpenses();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete expense"
      );
    }
  };

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>Expenses</h2>

          <p>
            Track business expenses,
            payments and spending
          </p>
        </div>

        <div className="toolbar-actions">

          <button
            className="secondary-button"
            onClick={loadExpenses}
          >
            Refresh
          </button>

          <button
            className="primary-button add-button"
            onClick={openCreateModal}
          >
            + Add Expense
          </button>

        </div>

      </div>

      <div className="cards">

        <div className="stat-card">
          <span>
            Total Expenses
          </span>

          <strong>
            {summary.count}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Total Spending
          </span>

          <strong>
            {formatCurrency(
              summary.total
            )}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Paid
          </span>

          <strong>
            {formatCurrency(
              summary.paid
            )}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Pending
          </span>

          <strong>
            {formatCurrency(
              summary.pending
            )}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Average Expense
          </span>

          <strong>
            {formatCurrency(
              summary.average
            )}
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
          placeholder="Search expenses..."
        />

        <select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            All Categories
          </option>

          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>

      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="customer-table-panel">

        {loading ? (

          <div className="table-empty">
            Loading expenses...
          </div>

        ) : filteredExpenses.length ===
          0 ? (

          <div className="table-empty">

            <div className="empty-large">
              💸
            </div>

            <h3>
              {search ||
              categoryFilter !== "ALL"
                ? "No expenses found"
                : "No expenses yet"}
            </h3>

            <p>
              Add your business
              expenses to track
              spending.
            </p>

            {!search &&
              categoryFilter ===
                "ALL" && (
                <button
                  className="primary-button add-button"
                  onClick={
                    openCreateModal
                  }
                >
                  + Add Expense
                </button>
              )}

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Expense
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Payment
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredExpenses.map(
                  (expense) => (

                    <tr
                      key={
                        expense._id
                      }
                    >

                      <td>

                        <div className="customer-name">

                          <div className="customer-avatar">
                            {(
                              expense.title ||
                              "E"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {
                                expense.title ||
                                "Untitled Expense"
                              }
                            </strong>

                            <span>
                              {
                                expense.description ||
                                expense.notes ||
                                ""
                              }
                            </span>

                          </div>

                        </div>

                      </td>

                      <td>

                        <span className="status-badge draft">
                          {
                            expense.category ||
                            "Other"
                          }
                        </span>

                      </td>

                      <td>

                        <strong>
                          {formatCurrency(
                            Number(
                              expense.amount ||
                                0
                            )
                          )}
                        </strong>

                      </td>

                      <td>
                        {
                          expense.paymentMethod ||
                          "—"
                        }
                      </td>

                      <td>

                        <span
                          className={getStatusClass(
                            expense.status
                          )}
                        >
                          {(
                            expense.status ||
                            "PENDING"
                          ).toUpperCase()}
                        </span>

                      </td>

                      <td>
                        {(
                          expense.date ||
                          expense.createdAt
                        )
                          ? new Date(
                              expense.date ||
                                expense.createdAt ||
                                ""
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "—"}
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="icon-button edit"
                            onClick={() =>
                              setSelectedExpense(
                                expense
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            className="icon-button edit"
                            onClick={() =>
                              openEditModal(
                                expense
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="icon-button delete"
                            onClick={() =>
                              deleteExpense(
                                expense
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
                  {editingExpense
                    ? "Edit Expense"
                    : "Add Expense"}
                </h2>

                <p>
                  Record a business
                  expense.
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
              onSubmit={saveExpense}
            >

              <div className="form-grid">

                <div className="form-field full">

                  <label>
                    Expense Title *
                  </label>

                  <input
                    value={form.title}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        title:
                          event.target.value,
                      })
                    }
                    placeholder="Office electricity bill"
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Category *
                  </label>

                  <input
                    value={
                      form.category
                    }
                    onChange={(event) =>
                      setForm({
                        ...form,
                        category:
                          event.target.value,
                      })
                    }
                    placeholder="Utilities"
                    list="expense-categories"
                    required
                  />

                  <datalist id="expense-categories">

                    <option value="Utilities" />
                    <option value="Rent" />
                    <option value="Salaries" />
                    <option value="Transport" />
                    <option value="Marketing" />
                    <option value="Office Supplies" />
                    <option value="Software" />
                    <option value="Maintenance" />
                    <option value="Travel" />
                    <option value="Other" />

                  </datalist>

                </div>

                <div className="form-field">

                  <label>
                    Amount *
                  </label>

                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={
                      form.amount
                    }
                    onChange={(event) =>
                      setForm({
                        ...form,
                        amount:
                          event.target.value,
                      })
                    }
                    placeholder="0.00"
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Payment Method
                  </label>

                  <select
                    value={
                      form.paymentMethod
                    }
                    onChange={(event) =>
                      setForm({
                        ...form,
                        paymentMethod:
                          event.target.value,
                      })
                    }
                  >

                    <option value="CASH">
                      Cash
                    </option>

                    <option value="CARD">
                      Card
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="BANK_TRANSFER">
                      Bank Transfer
                    </option>

                    <option value="OTHER">
                      Other
                    </option>

                  </select>

                </div>

                <div className="form-field">

                  <label>
                    Date
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        date:
                          event.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-field full">

                  <label>
                    Description
                  </label>

                  <textarea
                    value={
                      form.description
                    }
                    onChange={(event) =>
                      setForm({
                        ...form,
                        description:
                          event.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Describe the expense"
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
                    rows={3}
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
                    : editingExpense
                    ? "Update Expense"
                    : "Add Expense"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {selectedExpense && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedExpense(null);
            }
          }}
        >

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {
                    selectedExpense.title ||
                    "Expense Details"
                  }
                </h2>

                <p>
                  Expense information
                </p>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedExpense(
                    null
                  )
                }
              >
                ×
              </button>

            </div>

            <div className="order-detail-summary">

              <div>

                <span>
                  Category
                </span>

                <strong>
                  {
                    selectedExpense.category ||
                    "Other"
                  }
                </strong>

              </div>

              <div>

                <span>
                  Amount
                </span>

                <strong>
                  {formatCurrency(
                    Number(
                      selectedExpense.amount ||
                        0
                    )
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Payment
                </span>

                <strong>
                  {
                    selectedExpense.paymentMethod ||
                    "—"
                  }
                </strong>

              </div>

              <div>

                <span>
                  Status
                </span>

                <strong>

                  <span
                    className={getStatusClass(
                      selectedExpense.status
                    )}
                  >
                    {(
                      selectedExpense.status ||
                      "PENDING"
                    ).toUpperCase()}
                  </span>

                </strong>

              </div>

            </div>

            {selectedExpense.description && (
              <div className="order-notes">

                <strong>
                  Description
                </strong>

                <p>
                  {
                    selectedExpense.description
                  }
                </p>

              </div>
            )}

            {selectedExpense.notes && (
              <div className="order-notes">

                <strong>
                  Notes
                </strong>

                <p>
                  {
                    selectedExpense.notes
                  }
                </p>

              </div>
            )}

            <div className="modal-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  setSelectedExpense(
                    null
                  )
                }
              >
                Close
              </button>

              <button
                className="primary-button"
                onClick={() => {
                  setSelectedExpense(
                    null
                  );
                  openEditModal(
                    selectedExpense
                  );
                }}
              >
                Edit Expense
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}