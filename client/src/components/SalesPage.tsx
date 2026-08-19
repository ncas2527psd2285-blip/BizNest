import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config";


type Customer = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
};

type Product = {
  _id: string;
  name: string;
  sku?: string;
  price?: number;
  cost?: number;
  stock?: number;
};

type SaleItem = {
  productId: Product | string;
  quantity: number;
  unitPrice: number;
  total: number;
};

type Sale = {
  _id: string;
  saleNumber?: string;
  invoiceNumber?: string;
  customerId?: Customer | string;
  items: SaleItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  notes?: string;
  createdAt?: string;
};

type FormItem = {
  productId: string;
  quantity: string;
  unitPrice: string;
};

type Props = {
  token: string;
};

const emptyItem: FormItem = {
  productId: "",
  quantity: "1",
  unitPrice: "",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const getCustomer = (
  customer: Customer | string | undefined
): Customer | null => {
  if (!customer || typeof customer === "string") {
    return null;
  }

  return customer;
};

const getProduct = (
  product: Product | string
): Product | null => {
  if (typeof product === "string") {
    return null;
  }

  return product;
};

const getSaleNumber = (sale: Sale) =>
  sale.saleNumber ||
  sale.invoiceNumber ||
  `SALE-${sale._id.slice(-6).toUpperCase()}`;

const getStatusClass = (status?: string) => {
  const value = status?.toUpperCase();

  if (
    value === "COMPLETED" ||
    value === "PAID" ||
    value === "SUCCESS"
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
    value === "FAILED"
  ) {
    return "status-badge cancelled";
  }

  return "status-badge draft";
};

export default function SalesPage({
  token,
}: Props) {
  const [sales, setSales] =
    useState<Sale[]>([]);

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedSale, setSelectedSale] =
    useState<Sale | null>(null);

  const [customerId, setCustomerId] =
    useState("");

  const [items, setItems] =
    useState<FormItem[]>([
      { ...emptyItem },
    ]);

  const [discount, setDiscount] =
    useState("0");

  const [tax, setTax] =
    useState("0");

  const [paymentMethod, setPaymentMethod] =
    useState("CASH");

  const [notes, setNotes] =
    useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        salesResponse,
        customersResponse,
        productsResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/sales`, {
          headers,
        }),

        fetch(`${API_URL}/customers`, {
          headers,
        }),

        fetch(`${API_URL}/products`, {
          headers,
        }),
      ]);

      const salesResult =
        await salesResponse.json();

      const customersResult =
        await customersResponse.json();

      const productsResult =
        await productsResponse.json();

      if (
        !salesResponse.ok ||
        !salesResult.success
      ) {
        throw new Error(
          salesResult.message ||
            "Failed to load sales"
        );
      }

      if (
        !customersResponse.ok ||
        !customersResult.success
      ) {
        throw new Error(
          customersResult.message ||
            "Failed to load customers"
        );
      }

      if (
        !productsResponse.ok ||
        !productsResult.success
      ) {
        throw new Error(
          productsResult.message ||
            "Failed to load products"
        );
      }

      setSales(
        Array.isArray(salesResult.data)
          ? salesResult.data
          : []
      );

      const customerData =
        customersResult.data?.customers ??
        customersResult.data ??
        [];

      setCustomers(
        Array.isArray(customerData)
          ? customerData
          : []
      );

      const productData =
        productsResult.data?.products ??
        productsResult.data ??
        [];

      setProducts(
        Array.isArray(productData)
          ? productData
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load sales"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredSales = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    return sales.filter((sale) => {
      const customer = getCustomer(
        sale.customerId
      );

      const saleNumber =
        getSaleNumber(sale);

      const matchesSearch =
        !value ||
        saleNumber
          .toLowerCase()
          .includes(value) ||
        customer?.name
          ?.toLowerCase()
          .includes(value) ||
        customer?.email
          ?.toLowerCase()
          .includes(value) ||
        customer?.phone
          ?.toLowerCase()
          .includes(value);

      const matchesStatus =
        statusFilter === "ALL" ||
        sale.status?.toUpperCase() ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    sales,
    search,
    statusFilter,
  ]);

  const summary = useMemo(() => {
    const revenue = sales.reduce(
      (sum, sale) =>
        sum + Number(sale.total || 0),
      0
    );

    const paid = sales.filter(
      (sale) =>
        sale.paymentStatus?.toUpperCase() ===
          "PAID" ||
        sale.status?.toUpperCase() ===
          "PAID" ||
        sale.status?.toUpperCase() ===
          "COMPLETED"
    ).length;

    const pending = sales.filter(
      (sale) =>
        sale.paymentStatus?.toUpperCase() ===
          "PENDING" ||
        sale.paymentStatus?.toUpperCase() ===
          "UNPAID"
    ).length;

    const cancelled = sales.filter(
      (sale) =>
        sale.status?.toUpperCase() ===
        "CANCELLED"
    ).length;

    return {
      count: sales.length,
      revenue,
      paid,
      pending,
      cancelled,
    };
  }, [sales]);

  const openCreateModal = () => {
    setCustomerId("");
    setItems([{ ...emptyItem }]);
    setDiscount("0");
    setTax("0");
    setPaymentMethod("CASH");
    setNotes("");
    setSelectedSale(null);
    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setCustomerId("");
    setItems([{ ...emptyItem }]);
    setDiscount("0");
    setTax("0");
    setPaymentMethod("CASH");
    setNotes("");
  };

  const updateItem = (
    index: number,
    field: keyof FormItem,
    value: string
  ) => {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleProductChange = (
    index: number,
    productId: string
  ) => {
    const product = products.find(
      (item) =>
        item._id === productId
    );

    setItems((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        return {
          ...item,
          productId,
          unitPrice:
            product?.price !== undefined
              ? String(product.price)
              : item.unitPrice,
        };
      })
    );
  };

  const addItem = () => {
    setItems((current) => [
      ...current,
      { ...emptyItem },
    ]);
  };

  const removeItem = (index: number) => {
    setItems((current) =>
      current.length === 1
        ? current
        : current.filter(
            (_, itemIndex) =>
              itemIndex !== index
          )
    );
  };

  const calculateSubtotal = () =>
    items.reduce((sum, item) => {
      const quantity =
        Number(item.quantity) || 0;

      const unitPrice =
        Number(item.unitPrice) || 0;

      return (
        sum + quantity * unitPrice
      );
    }, 0);

  const calculateTotal = () => {
    const subtotal =
      calculateSubtotal();

    const discountValue =
      Number(discount) || 0;

    const taxValue =
      Number(tax) || 0;

    return Math.max(
      0,
      subtotal -
        discountValue +
        taxValue
    );
  };

  const createSale = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (items.length === 0) {
      setError(
        "Add at least one product"
      );
      return;
    }

    for (const item of items) {
      if (!item.productId) {
        setError(
          "Please select a product for every item"
        );
        return;
      }

      const quantity =
        Number(item.quantity);

      const unitPrice =
        Number(item.unitPrice);

      if (
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        setError(
          "Quantity must be a positive whole number"
        );
        return;
      }

      if (
        !Number.isFinite(unitPrice) ||
        unitPrice < 0
      ) {
        setError(
          "Unit price must be zero or greater"
        );
        return;
      }

      const product = products.find(
        (productItem) =>
          productItem._id ===
          item.productId
      );

      if (
        product?.stock !== undefined &&
        quantity > product.stock
      ) {
        setError(
          `${product.name} has only ${product.stock} item(s) in stock`
        );
        return;
      }
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        customerId:
          customerId || undefined,

        items: items.map((item) => ({
          productId:
            item.productId,

          quantity:
            Number(item.quantity),

          unitPrice:
            Number(item.unitPrice),
        })),

        discount:
          Number(discount) || 0,

        tax:
          Number(tax) || 0,

        paymentMethod,

        notes:
          notes.trim() || undefined,
      };

      const response = await fetch(
        `${API_URL}/sales`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
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
            "Failed to create sale"
        );
      }

      closeModal();

      await fetchData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create sale"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>Sales</h2>

          <p>
            Manage sales, invoices and
            customer transactions
          </p>
        </div>

        <div className="toolbar-actions">

          <button
            className="secondary-button"
            onClick={fetchData}
          >
            Refresh
          </button>

          <button
            className="primary-button add-button"
            onClick={openCreateModal}
          >
            + Create Sale
          </button>

        </div>

      </div>

      <div className="cards">

        <div className="stat-card">
          <span>Total Sales</span>

          <strong>
            {summary.count}
          </strong>
        </div>

        <div className="stat-card">
          <span>Total Revenue</span>

          <strong>
            {formatCurrency(
              summary.revenue
            )}
          </strong>
        </div>

        <div className="stat-card">
          <span>Paid</span>

          <strong>
            {summary.paid}
          </strong>
        </div>

        <div className="stat-card">
          <span>Pending</span>

          <strong>
            {summary.pending}
          </strong>
        </div>

        <div className="stat-card">
          <span>Cancelled</span>

          <strong>
            {summary.cancelled}
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
          placeholder="Search sales or customers..."
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            All Statuses
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="PAID">
            Paid
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="UNPAID">
            Unpaid
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
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
            Loading sales...
          </div>

        ) : filteredSales.length ===
          0 ? (

          <div className="table-empty">

            <div className="empty-large">
              💰
            </div>

            <h3>
              {search ||
              statusFilter !== "ALL"
                ? "No sales found"
                : "No sales yet"}
            </h3>

            <p>
              Create your first sale
              to start tracking
              revenue.
            </p>

            {!search &&
              statusFilter ===
                "ALL" && (
                <button
                  className="primary-button add-button"
                  onClick={
                    openCreateModal
                  }
                >
                  + Create Sale
                </button>
              )}

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Sale
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Items
                  </th>

                  <th>
                    Total
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
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredSales.map(
                  (sale) => {

                    const customer =
                      getCustomer(
                        sale.customerId
                      );

                    return (
                      <tr
                        key={
                          sale._id
                        }
                      >

                        <td>

                          <strong>
                            {
                              getSaleNumber(
                                sale
                              )
                            }
                          </strong>

                        </td>

                        <td>

                          <div className="customer-name">

                            <div className="customer-avatar">
                              {(
                                customer?.name ||
                                "W"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <strong>
                                {
                                  customer?.name ||
                                  "Walk-in Customer"
                                }
                              </strong>

                              <span>
                                {
                                  customer?.phone ||
                                  customer?.email ||
                                  ""
                                }
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>
                          {
                            sale.items
                              ?.length ||
                            0
                          } item(s)
                        </td>

                        <td>
                          {formatCurrency(
                            Number(
                              sale.total ||
                                0
                            )
                          )}
                        </td>

                        <td>
                          <span>
                            {
                              sale.paymentMethod ||
                              "—"
                            }
                          </span>
                        </td>

                        <td>

                          <span
                            className={getStatusClass(
                              sale.paymentStatus ||
                                sale.status
                            )}
                          >
                            {(
                              sale.paymentStatus ||
                              sale.status ||
                              "PENDING"
                            ).toUpperCase()}
                          </span>

                        </td>

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

                          <button
                            className="icon-button edit"
                            onClick={() =>
                              setSelectedSale(
                                sale
                              )
                            }
                          >
                            View
                          </button>

                        </td>

                      </tr>
                    );
                  }
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

          <div className="modal large-modal">

            <div className="modal-header">

              <div>

                <h2>
                  Create Sale
                </h2>

                <p>
                  Add products and
                  complete the customer
                  transaction.
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
              onSubmit={createSale}
            >

              <div className="form-field">

                <label>
                  Customer
                </label>

                <select
                  value={customerId}
                  onChange={(event) =>
                    setCustomerId(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    Walk-in Customer
                  </option>

                  {customers.map(
                    (customer) => (
                      <option
                        key={
                          customer._id
                        }
                        value={
                          customer._id
                        }
                      >
                        {customer.name}
                        {customer.phone
                          ? ` — ${customer.phone}`
                          : ""}
                      </option>
                    )
                  )}

                </select>

              </div>

              <div className="order-items-header">

                <div>

                  <h3>
                    Sale Items
                  </h3>

                  <p>
                    Select products and
                    quantities.
                  </p>

                </div>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={addItem}
                >
                  + Add Item
                </button>

              </div>

              <div className="order-items">

                {items.map(
                  (item, index) => {

                    const product =
                      products.find(
                        (productItem) =>
                          productItem._id ===
                          item.productId
                      );

                    const lineTotal =
                      (Number(
                        item.quantity
                      ) || 0) *
                      (Number(
                        item.unitPrice
                      ) || 0);

                    return (
                      <div
                        className="order-item-row"
                        key={index}
                      >

                        <div className="form-field">

                          <label>
                            Product
                          </label>

                          <select
                            value={
                              item.productId
                            }
                            onChange={(
                              event
                            ) =>
                              handleProductChange(
                                index,
                                event.target
                                  .value
                              )
                            }
                            required
                          >

                            <option value="">
                              Select product
                            </option>

                            {products.map(
                              (
                                productItem
                              ) => (
                                <option
                                  key={
                                    productItem._id
                                  }
                                  value={
                                    productItem._id
                                  }
                                  disabled={
                                    Number(
                                      productItem.stock ??
                                        0
                                    ) <= 0
                                  }
                                >
                                  {
                                    productItem.name
                                  }
                                  {productItem.sku
                                    ? ` (${productItem.sku})`
                                    : ""}
                                  {" — Stock: "}
                                  {
                                    productItem.stock ??
                                    0
                                  }
                                </option>
                              )
                            )}

                          </select>

                          {product && (
                            <small>
                              Available stock:{" "}
                              {
                                product.stock ??
                                0
                              }
                            </small>
                          )}

                        </div>

                        <div className="form-field">

                          <label>
                            Quantity
                          </label>

                          <input
                            type="number"
                            min="1"
                            step="1"
                            max={
                              product?.stock ??
                              undefined
                            }
                            value={
                              item.quantity
                            }
                            onChange={(
                              event
                            ) =>
                              updateItem(
                                index,
                                "quantity",
                                event.target
                                  .value
                              )
                            }
                            required
                          />

                        </div>

                        <div className="form-field">

                          <label>
                            Unit Price
                          </label>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={
                              item.unitPrice
                            }
                            onChange={(
                              event
                            ) =>
                              updateItem(
                                index,
                                "unitPrice",
                                event.target
                                  .value
                              )
                            }
                            placeholder="0.00"
                            required
                          />

                        </div>

                        <div className="line-total">

                          <span>
                            Total
                          </span>

                          <strong>
                            {formatCurrency(
                              lineTotal
                            )}
                          </strong>

                        </div>

                        <button
                          type="button"
                          className="remove-item-button"
                          onClick={() =>
                            removeItem(
                              index
                            )
                          }
                          disabled={
                            items.length ===
                            1
                          }
                        >
                          ×
                        </button>

                      </div>
                    );
                  }
                )}

              </div>

              <div className="form-grid">

                <div className="form-field">

                  <label>
                    Discount
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discount}
                    onChange={(event) =>
                      setDiscount(
                        event.target.value
                      )
                    }
                  />

                </div>

                <div className="form-field">

                  <label>
                    Tax
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tax}
                    onChange={(event) =>
                      setTax(
                        event.target.value
                      )
                    }
                  />

                </div>

                <div className="form-field">

                  <label>
                    Payment Method
                  </label>

                  <select
                    value={
                      paymentMethod
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
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

                  </select>

                </div>

                <div className="form-field">

                  <label>
                    Notes
                  </label>

                  <input
                    value={notes}
                    onChange={(event) =>
                      setNotes(
                        event.target.value
                      )
                    }
                    placeholder="Optional notes"
                  />

                </div>

              </div>

              <div className="order-total-card">

                <div>

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    {formatCurrency(
                      calculateSubtotal()
                    )}
                  </strong>

                </div>

                <div>

                  <span>
                    Discount
                  </span>

                  <strong>
                    -{" "}
                    {formatCurrency(
                      Number(
                        discount
                      ) || 0
                    )}
                  </strong>

                </div>

                <div>

                  <span>
                    Tax
                  </span>

                  <strong>
                    {formatCurrency(
                      Number(tax) ||
                        0
                    )}
                  </strong>

                </div>

                <div>

                  <span>
                    Total
                  </span>

                  <strong>
                    {formatCurrency(
                      calculateTotal()
                    )}
                  </strong>

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
                  disabled={
                    saving ||
                    products.length === 0
                  }
                >
                  {saving
                    ? "Creating..."
                    : "Complete Sale"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {selectedSale && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedSale(null);
            }
          }}
        >

          <div className="modal large-modal">

            <div className="modal-header">

              <div>

                <h2>
                  {
                    getSaleNumber(
                      selectedSale
                    )
                  }
                </h2>

                <p>
                  Sale details and invoice
                  summary
                </p>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedSale(null)
                }
              >
                ×
              </button>

            </div>

            <div className="order-detail-summary">

              <div>

                <span>
                  Customer
                </span>

                <strong>
                  {getCustomer(
                    selectedSale.customerId
                  )?.name ||
                    "Walk-in Customer"}
                </strong>

              </div>

              <div>

                <span>
                  Payment
                </span>

                <strong>
                  {
                    selectedSale.paymentMethod ||
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
                      selectedSale.paymentStatus ||
                        selectedSale.status
                    )}
                  >
                    {(
                      selectedSale.paymentStatus ||
                      selectedSale.status ||
                      "PENDING"
                    ).toUpperCase()}
                  </span>
                </strong>

              </div>

              <div>

                <span>
                  Total
                </span>

                <strong>
                  {formatCurrency(
                    Number(
                      selectedSale.total ||
                        0
                    )
                  )}
                </strong>

              </div>

            </div>

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>
                      Product
                    </th>

                    <th>
                      Quantity
                    </th>

                    <th>
                      Unit Price
                    </th>

                    <th>
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {selectedSale.items.map(
                    (item, index) => {

                      const product =
                        getProduct(
                          item.productId
                        );

                      return (
                        <tr
                          key={index}
                        >

                          <td>
                            {
                              product?.name ||
                              "Unknown Product"
                            }
                          </td>

                          <td>
                            {
                              item.quantity
                            }
                          </td>

                          <td>
                            {formatCurrency(
                              Number(
                                item.unitPrice
                              )
                            )}
                          </td>

                          <td>
                            {formatCurrency(
                              Number(
                                item.total
                              )
                            )}
                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

            {selectedSale.notes && (
              <div className="order-notes">

                <strong>
                  Notes
                </strong>

                <p>
                  {
                    selectedSale.notes
                  }
                </p>

              </div>
            )}

            <div className="modal-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  setSelectedSale(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}