import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api";

type Product = {
  _id: string;
  name: string;
  sku?: string;
  price?: number;
  cost?: number;
  stock?: number;
};

type Supplier = {
  _id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
};

type PurchaseOrderItem = {
  productId: Product | string;
  quantity: number;
  unitCost: number;
  total: number;
};

type PurchaseOrder = {
  _id: string;
  orderNumber: string;
  supplierId: Supplier | string;
  status:
    | "DRAFT"
    | "ORDERED"
    | "RECEIVED"
    | "CANCELLED";
  items: PurchaseOrderItem[];
  subtotal: number;
  notes?: string;
  orderedAt?: string;
  receivedAt?: string;
  createdAt?: string;
};

type FormItem = {
  productId: string;
  quantity: string;
  unitCost: string;
};

type Props = {
  token: string;
};

const emptyItem: FormItem = {
  productId: "",
  quantity: "1",
  unitCost: "",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const getSupplier = (
  supplier: Supplier | string
): Supplier | null => {
  return typeof supplier === "string"
    ? null
    : supplier;
};

const getProduct = (
  product: Product | string
): Product | null => {
  return typeof product === "string"
    ? null
    : product;
};

const getStatusClass = (
  status: PurchaseOrder["status"]
) => {
  switch (status) {
    case "DRAFT":
      return "status-badge draft";

    case "ORDERED":
      return "status-badge ordered";

    case "RECEIVED":
      return "status-badge received";

    case "CANCELLED":
      return "status-badge cancelled";

    default:
      return "status-badge";
  }
};

export default function PurchaseOrdersPage({
  token,
}: Props) {
  const [purchaseOrders, setPurchaseOrders] =
    useState<PurchaseOrder[]>([]);

  const [suppliers, setSuppliers] =
    useState<Supplier[]>([]);

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

  const [selectedOrder, setSelectedOrder] =
    useState<PurchaseOrder | null>(null);

  const [supplierId, setSupplierId] =
    useState("");

  const [items, setItems] =
    useState<FormItem[]>([
      { ...emptyItem },
    ]);

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
        ordersResponse,
        suppliersResponse,
        productsResponse,
      ] = await Promise.all([
        fetch(
          `${API_URL}/purchase-orders`,
          { headers }
        ),
        fetch(
          `${API_URL}/suppliers`,
          { headers }
        ),
        fetch(
          `${API_URL}/products`,
          { headers }
        ),
      ]);

      const ordersResult =
        await ordersResponse.json();

      const suppliersResult =
        await suppliersResponse.json();

      const productsResult =
        await productsResponse.json();

      if (
        !ordersResponse.ok ||
        !ordersResult.success
      ) {
        throw new Error(
          ordersResult.message ||
            "Failed to load purchase orders"
        );
      }

      if (
        !suppliersResponse.ok ||
        !suppliersResult.success
      ) {
        throw new Error(
          suppliersResult.message ||
            "Failed to load suppliers"
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

      setPurchaseOrders(
        Array.isArray(ordersResult.data)
          ? ordersResult.data
          : []
      );

      setSuppliers(
        Array.isArray(suppliersResult.data)
          ? suppliersResult.data
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
          : "Failed to load purchase orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredOrders = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    return purchaseOrders.filter(
      (order) => {
        const supplier =
          getSupplier(order.supplierId);

        const matchesSearch =
          !value ||
          order.orderNumber
            .toLowerCase()
            .includes(value) ||
          supplier?.name
            ?.toLowerCase()
            .includes(value) ||
          supplier?.company
            ?.toLowerCase()
            .includes(value);

        const matchesStatus =
          statusFilter === "ALL" ||
          order.status === statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    purchaseOrders,
    search,
    statusFilter,
  ]);

  const totals = useMemo(() => {
    return {
      total: purchaseOrders.length,

      draft: purchaseOrders.filter(
        (order) =>
          order.status === "DRAFT"
      ).length,

      ordered: purchaseOrders.filter(
        (order) =>
          order.status === "ORDERED"
      ).length,

      received: purchaseOrders.filter(
        (order) =>
          order.status === "RECEIVED"
      ).length,

      value: purchaseOrders.reduce(
        (sum, order) =>
          sum + Number(order.subtotal || 0),
        0
      ),
    };
  }, [purchaseOrders]);

  const openCreateModal = () => {
    setSupplierId("");
    setItems([{ ...emptyItem }]);
    setNotes("");
    setSelectedOrder(null);
    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setSelectedOrder(null);
    setSupplierId("");
    setItems([{ ...emptyItem }]);
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

  const getSelectedProduct = (
    productId: string
  ) => {
    return products.find(
      (product) =>
        product._id === productId
    );
  };

  const calculateFormTotal = () => {
    return items.reduce(
      (total, item) => {
        const quantity =
          Number(item.quantity) || 0;

        const unitCost =
          Number(item.unitCost) || 0;

        return (
          total + quantity * unitCost
        );
      },
      0
    );
  };

  const handleProductChange = (
    index: number,
    productId: string
  ) => {
    const product =
      getSelectedProduct(productId);

    setItems((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        return {
          ...item,
          productId,
          unitCost:
            product?.cost !== undefined
              ? String(product.cost)
              : item.unitCost,
        };
      })
    );
  };

  const createPurchaseOrder =
    async (
      event: React.SyntheticEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (!supplierId) {
        setError(
          "Please select a supplier"
        );
        return;
      }

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

        const unitCost =
          Number(item.unitCost);

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
          !Number.isFinite(unitCost) ||
          unitCost < 0
        ) {
          setError(
            "Unit cost must be zero or greater"
          );
          return;
        }
      }

      setSaving(true);
      setError("");

      try {
        const payload = {
          supplierId,
          items: items.map(
            (item) => ({
              productId:
                item.productId,
              quantity:
                Number(item.quantity),
              unitCost:
                Number(item.unitCost),
            })
          ),
          notes:
            notes.trim() || undefined,
        };

        const response = await fetch(
          `${API_URL}/purchase-orders`,
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
              "Failed to create purchase order"
          );
        }

        closeModal();
        await fetchData();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to create purchase order"
        );
      } finally {
        setSaving(false);
      }
    };

  const markAsOrdered = async (
    order: PurchaseOrder
  ) => {
    if (order.status !== "DRAFT") {
      return;
    }

    const confirmed =
      window.confirm(
        `Mark ${order.orderNumber} as ordered?`
      );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/purchase-orders/${order._id}/order`,
        {
          method: "PATCH",
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
            "Failed to mark order"
        );
      }

      await fetchData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to mark order"
      );
    }
  };

  const receiveOrder = async (
    order: PurchaseOrder
  ) => {
    if (order.status !== "ORDERED") {
      return;
    }

    const confirmed =
      window.confirm(
        `Receive ${order.orderNumber}? Stock will be increased.`
      );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/purchase-orders/${order._id}/receive`,
        {
          method: "PATCH",
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
            "Failed to receive purchase order"
        );
      }

      await fetchData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to receive purchase order"
      );
    }
  };

  const deleteOrder = async (
    order: PurchaseOrder
  ) => {
    if (order.status !== "DRAFT") {
      setError(
        "Only draft purchase orders can be deleted"
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Delete ${order.orderNumber}?`
      );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/purchase-orders/${order._id}`,
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
            "Failed to delete purchase order"
        );
      }

      await fetchData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete purchase order"
      );
    }
  };

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>Purchase Orders</h2>

          <p>
            Create, track and receive
            supplier purchase orders
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
            + Create Purchase Order
          </button>

        </div>

      </div>

      <div className="cards">

        <div className="stat-card">
          <span>Total Orders</span>
          <strong>
            {totals.total}
          </strong>
        </div>

        <div className="stat-card">
          <span>Draft</span>
          <strong>
            {totals.draft}
          </strong>
        </div>

        <div className="stat-card">
          <span>Ordered</span>
          <strong>
            {totals.ordered}
          </strong>
        </div>

        <div className="stat-card">
          <span>Received</span>
          <strong>
            {totals.received}
          </strong>
        </div>

        <div className="stat-card">
          <span>Total Value</span>
          <strong>
            {formatCurrency(
              totals.value
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
          placeholder="Search purchase orders or suppliers..."
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

          <option value="DRAFT">
            Draft
          </option>

          <option value="ORDERED">
            Ordered
          </option>

          <option value="RECEIVED">
            Received
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
            Loading purchase orders...
          </div>

        ) : filteredOrders.length ===
          0 ? (

          <div className="table-empty">

            <div className="empty-large">
              📦
            </div>

            <h3>
              {search ||
              statusFilter !== "ALL"
                ? "No purchase orders found"
                : "No purchase orders yet"}
            </h3>

            <p>
              Create a purchase order
              to start managing
              supplier stock.
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
                  + Create Purchase Order
                </button>
              )}

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Order
                  </th>

                  <th>
                    Supplier
                  </th>

                  <th>
                    Items
                  </th>

                  <th>
                    Amount
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

                {filteredOrders.map(
                  (order) => {

                    const supplier =
                      getSupplier(
                        order.supplierId
                      );

                    return (
                      <tr
                        key={
                          order._id
                        }
                      >

                        <td>

                          <strong>
                            {
                              order.orderNumber
                            }
                          </strong>

                        </td>

                        <td>

                          <div className="customer-name">

                            <div className="customer-avatar">
                              {(
                                supplier?.name ||
                                "S"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <strong>
                                {
                                  supplier?.name ||
                                  "Unknown Supplier"
                                }
                              </strong>

                              <span>
                                {
                                  supplier?.company ||
                                  ""
                                }
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>
                          {
                            order.items
                              ?.length ||
                            0
                          } item(s)
                        </td>

                        <td>
                          {formatCurrency(
                            Number(
                              order.subtotal ||
                                0
                            )
                          )}
                        </td>

                        <td>

                          <span
                            className={getStatusClass(
                              order.status
                            )}
                          >
                            {
                              order.status
                            }
                          </span>

                        </td>

                        <td>
                          {order.createdAt
                            ? new Date(
                                order.createdAt
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
                                setSelectedOrder(
                                  order
                                )
                              }
                            >
                              View
                            </button>

                            {order.status ===
                              "DRAFT" && (
                              <>
                                <button
                                  className="icon-button edit"
                                  onClick={() =>
                                    markAsOrdered(
                                      order
                                    )
                                  }
                                >
                                  Order
                                </button>

                                <button
                                  className="icon-button delete"
                                  onClick={() =>
                                    deleteOrder(
                                      order
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              </>
                            )}

                            {order.status ===
                              "ORDERED" && (
                              <button
                                className="icon-button edit"
                                onClick={() =>
                                  receiveOrder(
                                    order
                                  )
                                }
                              >
                                Receive
                              </button>
                            )}

                          </div>

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
                  Create Purchase Order
                </h2>

                <p>
                  Add supplier and
                  products to your order.
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
              onSubmit={
                createPurchaseOrder
              }
            >

              <div className="form-field">

                <label>
                  Supplier *
                </label>

                <select
                  value={supplierId}
                  onChange={(event) =>
                    setSupplierId(
                      event.target.value
                    )
                  }
                  required
                >

                  <option value="">
                    Select supplier
                  </option>

                  {suppliers.map(
                    (supplier) => (
                      <option
                        key={
                          supplier._id
                        }
                        value={
                          supplier._id
                        }
                      >
                        {supplier.name}
                        {supplier.company
                          ? ` — ${supplier.company}`
                          : ""}
                      </option>
                    )
                  )}

                </select>

                {suppliers.length ===
                  0 && (
                  <small>
                    No suppliers found.
                    Create a supplier
                    first.
                  </small>
                )}

              </div>

              <div className="order-items-header">

                <div>
                  <h3>
                    Order Items
                  </h3>

                  <p>
                    Add the products and
                    quantities you want
                    to purchase.
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
                      getSelectedProduct(
                        item.productId
                      );

                    const lineTotal =
                      (Number(
                        item.quantity
                      ) || 0) *
                      (Number(
                        item.unitCost
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
                                >
                                  {
                                    productItem.name
                                  }
                                  {productItem.sku
                                    ? ` (${productItem.sku})`
                                    : ""}
                                </option>
                              )
                            )}

                          </select>

                          {product && (
                            <small>
                              Current stock:{" "}
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
                            Unit Cost
                          </label>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={
                              item.unitCost
                            }
                            onChange={(
                              event
                            ) =>
                              updateItem(
                                index,
                                "unitCost",
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
                          title="Remove item"
                        >
                          ×
                        </button>

                      </div>
                    );
                  }
                )}

              </div>

              <div className="form-field">

                <label>
                  Notes
                </label>

                <textarea
                  value={notes}
                  onChange={(event) =>
                    setNotes(
                      event.target.value
                    )
                  }
                  rows={3}
                  placeholder="Optional purchase order notes"
                />

              </div>

              <div className="order-total-card">

                <span>
                  Order Total
                </span>

                <strong>
                  {formatCurrency(
                    calculateFormTotal()
                  )}
                </strong>

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
                    suppliers.length ===
                      0 ||
                    products.length === 0
                  }
                >
                  {saving
                    ? "Creating..."
                    : "Create Purchase Order"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {selectedOrder && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedOrder(null);
            }
          }}
        >

          <div className="modal large-modal">

            <div className="modal-header">

              <div>
                <h2>
                  {
                    selectedOrder.orderNumber
                  }
                </h2>

                <p>
                  Purchase order details
                </p>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>

            </div>

            <div className="order-detail-summary">

              <div>
                <span>
                  Supplier
                </span>

                <strong>
                  {
                    getSupplier(
                      selectedOrder.supplierId
                    )?.name ||
                    "Unknown Supplier"
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
                      selectedOrder.status
                    )}
                  >
                    {
                      selectedOrder.status
                    }
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
                      selectedOrder.subtotal ||
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
                      Unit Cost
                    </th>

                    <th>
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {selectedOrder.items.map(
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
                                item.unitCost
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

            {selectedOrder.notes && (
              <div className="order-notes">

                <strong>
                  Notes
                </strong>

                <p>
                  {
                    selectedOrder.notes
                  }
                </p>

              </div>
            )}

            <div className="modal-actions">

              {selectedOrder.status ===
                "DRAFT" && (
                <button
                  className="primary-button"
                  onClick={() => {
                    setSelectedOrder(null);
                    markAsOrdered(
                      selectedOrder
                    );
                  }}
                >
                  Mark Ordered
                </button>
              )}

              {selectedOrder.status ===
                "ORDERED" && (
                <button
                  className="primary-button"
                  onClick={() => {
                    setSelectedOrder(null);
                    receiveOrder(
                      selectedOrder
                    );
                  }}
                >
                  Receive Order
                </button>
              )}

              <button
                className="secondary-button"
                onClick={() =>
                  setSelectedOrder(null)
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