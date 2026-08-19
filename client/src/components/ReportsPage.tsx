import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api";

type ReportData = {
  totalSales?: number;
  totalRevenue?: number;
  totalExpenses?: number;
  totalProfit?: number;
  totalProducts?: number;
  totalCustomers?: number;
  totalSuppliers?: number;
  lowStockProducts?: number;
  salesCount?: number;
  expensesCount?: number;
};

type Sale = {
  _id: string;
  total?: number;
  createdAt?: string;
};

type Expense = {
  _id: string;
  amount?: number;
  date?: string;
  createdAt?: string;
};

type Props = {
  token: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export default function ReportsPage({
  token,
}: Props) {
  const [report, setReport] =
    useState<ReportData | null>(null);

  const [sales, setSales] =
    useState<Sale[]>([]);

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [period, setPeriod] =
    useState("30");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const loadReports = async () => {
    setLoading(true);
    setError("");

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        reportResponse,
        salesResponse,
        expensesResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/reports`, {
          headers,
        }),
        fetch(`${API_URL}/sales`, {
          headers,
        }),
        fetch(`${API_URL}/expenses`, {
          headers,
        }),
      ]);

      const reportResult =
        await reportResponse.json();

      const salesResult =
        await salesResponse.json();

      const expensesResult =
        await expensesResponse.json();

      if (
        !reportResponse.ok ||
        !reportResult.success
      ) {
        throw new Error(
          reportResult.message ||
            "Failed to load reports"
        );
      }

      setReport(
        reportResult.data || {}
      );

      const salesData =
        salesResult.data?.sales ??
        salesResult.data ??
        [];

      const expensesData =
        expensesResult.data?.expenses ??
        expensesResult.data ??
        [];

      setSales(
        Array.isArray(salesData)
          ? salesData
          : []
      );

      setExpenses(
        Array.isArray(expensesData)
          ? expensesData
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const periodDays = useMemo(() => {
    if (period === "7") return 7;
    if (period === "30") return 30;
    if (period === "90") return 90;
    if (period === "365") return 365;

    return 30;
  }, [period]);

  const filteredSales = useMemo(() => {
    const now = new Date();

    if (
      fromDate ||
      toDate
    ) {
      return sales.filter(
        (sale) => {
          const date = new Date(
            sale.createdAt || ""
          );

          if (
            Number.isNaN(
              date.getTime()
            )
          ) {
            return false;
          }

          if (fromDate) {
            const from =
              new Date(
                `${fromDate}T00:00:00`
              );

            if (date < from) {
              return false;
            }
          }

          if (toDate) {
            const to =
              new Date(
                `${toDate}T23:59:59`
              );

            if (date > to) {
              return false;
            }
          }

          return true;
        }
      );
    }

    const start = new Date(now);

    start.setDate(
      start.getDate() -
        periodDays
    );

    return sales.filter(
      (sale) => {
        const date = new Date(
          sale.createdAt || ""
        );

        return (
          !Number.isNaN(
            date.getTime()
          ) &&
          date >= start
        );
      }
    );
  }, [
    sales,
    periodDays,
    fromDate,
    toDate,
  ]);

  const filteredExpenses = useMemo(() => {
    const now = new Date();

    if (
      fromDate ||
      toDate
    ) {
      return expenses.filter(
        (expense) => {
          const date = new Date(
            expense.date ||
              expense.createdAt ||
              ""
          );

          if (
            Number.isNaN(
              date.getTime()
            )
          ) {
            return false;
          }

          if (fromDate) {
            const from =
              new Date(
                `${fromDate}T00:00:00`
              );

            if (date < from) {
              return false;
            }
          }

          if (toDate) {
            const to =
              new Date(
                `${toDate}T23:59:59`
              );

            if (date > to) {
              return false;
            }
          }

          return true;
        }
      );
    }

    const start = new Date(now);

    start.setDate(
      start.getDate() -
        periodDays
    );

    return expenses.filter(
      (expense) => {
        const date = new Date(
          expense.date ||
            expense.createdAt ||
            ""
        );

        return (
          !Number.isNaN(
            date.getTime()
          ) &&
          date >= start
        );
      }
    );
  }, [
    expenses,
    periodDays,
    fromDate,
    toDate,
  ]);

  const calculatedRevenue = useMemo(
    () =>
      filteredSales.reduce(
        (sum, sale) =>
          sum +
          Number(
            sale.total || 0
          ),
        0
      ),
    [filteredSales]
  );

  const calculatedExpenses =
    useMemo(
      () =>
        filteredExpenses.reduce(
          (sum, expense) =>
            sum +
            Number(
              expense.amount || 0
            ),
          0
        ),
      [filteredExpenses]
    );

  const calculatedProfit =
    calculatedRevenue -
    calculatedExpenses;

  const clearDates = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>Reports</h2>

          <p>
            Analyze revenue, expenses,
            profit and business
            performance
          </p>
        </div>

        <div className="toolbar-actions">

          <button
            className="secondary-button"
            onClick={loadReports}
          >
            Refresh
          </button>

        </div>

      </div>

      <div className="search-bar">

        <select
          value={period}
          onChange={(event) =>
            setPeriod(
              event.target.value
            )
          }
        >
          <option value="7">
            Last 7 Days
          </option>

          <option value="30">
            Last 30 Days
          </option>

          <option value="90">
            Last 90 Days
          </option>

          <option value="365">
            Last 12 Months
          </option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(event) =>
            setFromDate(
              event.target.value
            )
          }
        />

        <input
          type="date"
          value={toDate}
          onChange={(event) =>
            setToDate(
              event.target.value
            )
          }
        />

        {(fromDate || toDate) && (
          <button
            className="secondary-button"
            onClick={clearDates}
          >
            Clear Dates
          </button>
        )}

      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {loading ? (

        <div className="table-empty">
          Loading reports...
        </div>

      ) : (

        <>
          <div className="cards">

            <div className="stat-card">

              <span>
                Revenue
              </span>

              <strong>
                {formatCurrency(
                  calculatedRevenue ||
                    Number(
                      report?.totalRevenue ||
                        0
                    )
                )}
              </strong>

            </div>

            <div className="stat-card">

              <span>
                Expenses
              </span>

              <strong>
                {formatCurrency(
                  calculatedExpenses ||
                    Number(
                      report?.totalExpenses ||
                        0
                    )
                )}
              </strong>

            </div>

            <div className="stat-card">

              <span>
                Profit
              </span>

              <strong>
                {formatCurrency(
                  calculatedProfit ||
                    Number(
                      report?.totalProfit ||
                        0
                    )
                )}
              </strong>

            </div>

            <div className="stat-card">

              <span>
                Sales
              </span>

              <strong>
                {
                  filteredSales.length
                }
              </strong>

            </div>

            <div className="stat-card">

              <span>
                Expenses Count
              </span>

              <strong>
                {
                  filteredExpenses.length
                }
              </strong>

            </div>

          </div>

          <div className="cards">

            <div className="stat-card">

              <span>
                Products
              </span>

              <strong>
                {
                  report?.totalProducts ??
                  0
                }
              </strong>

            </div>

            <div className="stat-card">

              <span>
                Customers
              </span>

              <strong>
                {
                  report?.totalCustomers ??
                  0
                }
              </strong>

            </div>

            <div className="stat-card">

              <span>
                Suppliers
              </span>

              <strong>
                {
                  report?.totalSuppliers ??
                  0
                }
              </strong>

            </div>

            <div className="stat-card">

              <span>
                Low Stock
              </span>

              <strong>
                {
                  report?.lowStockProducts ??
                  0
                }
              </strong>

            </div>

          </div>

          <div className="customer-table-panel">

            <div className="modal-header">

              <div>

                <h2>
                  Performance Summary
                </h2>

                <p>
                  Sales and expenses
                  for the selected
                  period
                </p>

              </div>

            </div>

            <div className="report-summary-grid">

              <div className="report-card">

                <div className="report-icon">
                  💰
                </div>

                <div>

                  <span>
                    Total Revenue
                  </span>

                  <strong>
                    {formatCurrency(
                      calculatedRevenue
                    )}
                  </strong>

                </div>

              </div>

              <div className="report-card">

                <div className="report-icon">
                  💸
                </div>

                <div>

                  <span>
                    Total Expenses
                  </span>

                  <strong>
                    {formatCurrency(
                      calculatedExpenses
                    )}
                  </strong>

                </div>

              </div>

              <div className="report-card">

                <div className="report-icon">
                  📈
                </div>

                <div>

                  <span>
                    Net Profit
                  </span>

                  <strong>
                    {formatCurrency(
                      calculatedProfit
                    )}
                  </strong>

                </div>

              </div>

              <div className="report-card">

                <div className="report-icon">
                  🧾
                </div>

                <div>

                  <span>
                    Transactions
                  </span>

                  <strong>
                    {
                      filteredSales.length
                    }
                  </strong>

                </div>

              </div>

            </div>

          </div>

          <div className="customer-table-panel">

            <div className="modal-header">

              <div>

                <h2>
                  Recent Sales
                </h2>

                <p>
                  Latest sales included
                  in this report
                </p>

              </div>

            </div>

            {filteredSales.length ===
            0 ? (

              <div className="table-empty">

                <div className="empty-large">
                  📊
                </div>

                <h3>
                  No sales for this
                  period
                </h3>

                <p>
                  Sales will appear
                  here when
                  transactions are
                  created.
                </p>

              </div>

            ) : (

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Date
                      </th>

                      <th>
                        Sale
                      </th>

                      <th>
                        Amount
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredSales
                      .slice(0, 10)
                      .map(
                        (sale) => (

                          <tr
                            key={
                              sale._id
                            }
                          >

                            <td>
                              {sale.createdAt
                                ? new Date(
                                    sale.createdAt
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                : "—"}
                            </td>

                            <td>
                              SALE-
                              {
                                sale._id
                                  .slice(
                                    -6
                                  )
                                  .toUpperCase()
                              }
                            </td>

                            <td>
                              <strong>
                                {formatCurrency(
                                  Number(
                                    sale.total ||
                                      0
                                  )
                                )}
                              </strong>
                            </td>

                          </tr>

                        )
                      )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          <div className="customer-table-panel">

            <div className="modal-header">

              <div>

                <h2>
                  Recent Expenses
                </h2>

                <p>
                  Latest expenses
                  included in this
                  report
                </p>

              </div>

            </div>

            {filteredExpenses.length ===
            0 ? (

              <div className="table-empty">

                <div className="empty-large">
                  💸
                </div>

                <h3>
                  No expenses for
                  this period
                </h3>

              </div>

            ) : (

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Date
                      </th>

                      <th>
                        Category
                      </th>

                      <th>
                        Amount
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredExpenses
                      .slice(0, 10)
                      .map(
                        (expense) => (

                          <tr
                            key={
                              expense._id
                            }
                          >

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
                              {
                                expense._id
                                  ? "Expense"
                                  : "Other"
                              }
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

                          </tr>

                        )
                      )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </>
      )}

    </section>
  );
}