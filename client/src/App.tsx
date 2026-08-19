import { useEffect, useState } from "react";
import "./App.css";
import PublicWebsite from "./public-site/PublicWebsite";
import WebsiteBuilderPage from "./components/website-builder/WebsiteBuilderPage";

const API_URL = "http://localhost:5000/api";

/* =========================================================
   TYPES
   ========================================================= */

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  businessId: string;
};

type Customer = {
  _id: string;
  businessId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  notes: string;
  tags: string;
};

type Category = {
  _id: string;
  businessId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

type ProductCategory =
  | {
      _id: string;
      name: string;
      description?: string;
    }
  | string;

type Product = {
  _id: string;
  businessId: string;
  name: string;
  sku: string;
  categoryId?: ProductCategory;
  description?: string;
  price: number;
  cost: number;
  stock: number;
  lowStockThreshold: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
};

type ProductForm = {
  name: string;
  sku: string;
  categoryId: string;
  description: string;
  price: string;
  cost: string;
  stock: string;
  lowStockThreshold: string;
  status: "ACTIVE" | "INACTIVE";
};

type CategoryForm = {
  name: string;
  description: string;
};

type DashboardData = {
  summary: {
    totalCustomers: number;
    totalProducts: number;
    totalSuppliers: number;
    totalSales: number;
    completedSales: number;
    draftSales: number;
    totalPurchaseOrders: number;
    totalRevenue: number;
    totalExpenses: number;
    paidExpenses: number;
    pendingExpenses: number;
    cancelledExpenses: number;
    totalExpenseAmount: number;
    netProfit: number;
  };

  lowStockProducts: Array<{
    _id: string;
    name: string;
    sku: string;
    stock: number;
    lowStockThreshold: number;
    price: number;
  }>;
};

const emptyCustomerForm: CustomerForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  company: "",
  notes: "",
  tags: "",
};

const emptyProductForm: ProductForm = {
  name: "",
  sku: "",
  categoryId: "",
  description: "",
  price: "",
  cost: "",
  stock: "0",
  lowStockThreshold: "5",
  status: "ACTIVE",
};

const emptyCategoryForm: CategoryForm = {
  name: "",
  description: "",
};

/* =========================================================
   APP
   ========================================================= */

function BizNestApp() {
  /* =======================================================
     AUTH
     ======================================================= */

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("biznest_token")
  );

  const [user, setUser] = useState<User | null>(null);

  const [email, setEmail] = useState("test@example.com");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const [page, setPage] = useState("Dashboard");

  /* =======================================================
     DASHBOARD
     ======================================================= */

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  /* =======================================================
     CUSTOMERS
     ======================================================= */

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [customersLoading, setCustomersLoading] =
    useState(false);

  const [customerSearch, setCustomerSearch] = useState("");

  const [showCustomerModal, setShowCustomerModal] =
    useState(false);

  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [customerForm, setCustomerForm] =
    useState<CustomerForm>(emptyCustomerForm);

  const [customerError, setCustomerError] = useState("");

  const [customerSaving, setCustomerSaving] =
    useState(false);

  /* =======================================================
     PRODUCTS
     ======================================================= */

  const [products, setProducts] = useState<Product[]>([]);

  const [productsLoading, setProductsLoading] =
    useState(false);

  const [productSearch, setProductSearch] = useState("");

  const [showProductModal, setShowProductModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [productForm, setProductForm] =
    useState<ProductForm>(emptyProductForm);

  const [productError, setProductError] = useState("");

  const [productSaving, setProductSaving] =
    useState(false);

  /* =======================================================
     CATEGORIES
     ======================================================= */

  const [categories, setCategories] = useState<Category[]>([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(false);

  const [categorySearch, setCategorySearch] = useState("");

  const [showCategoryModal, setShowCategoryModal] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [categoryForm, setCategoryForm] =
    useState<CategoryForm>(emptyCategoryForm);

  const [categoryError, setCategoryError] = useState("");

  const [categorySaving, setCategorySaving] =
    useState(false);

  /* =======================================================
     LOGIN
     ======================================================= */

  const login = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Invalid email or password"
        );
      }

      const receivedToken = result.data.token;

      localStorage.setItem(
        "biznest_token",
        receivedToken
      );

      setToken(receivedToken);
      setUser(result.data.user);
      setPage("Dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOGOUT
     ======================================================= */

  const logout = () => {
    localStorage.removeItem("biznest_token");

    setToken(null);
    setUser(null);
    setDashboard(null);
    setCustomers([]);
    setProducts([]);
    setCategories([]);
  };

  /* =======================================================
     DASHBOARD
     ======================================================= */

  const loadDashboard = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `${API_URL}/dashboard`,
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
            "Failed to load dashboard"
        );
      }

      setDashboard(result.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard"
      );
    }
  };

  /* =======================================================
     CUSTOMERS API
     ======================================================= */

  const loadCustomers = async () => {
    if (!token) return;

    setCustomersLoading(true);
    setCustomerError("");

    try {
      const response = await fetch(
        `${API_URL}/customers`,
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
            "Failed to load customers"
        );
      }

      setCustomers(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (err) {
      setCustomerError(
        err instanceof Error
          ? err.message
          : "Failed to load customers"
      );
    } finally {
      setCustomersLoading(false);
    }
  };

  const openCreateCustomer = () => {
    setEditingCustomer(null);
    setCustomerForm(emptyCustomerForm);
    setCustomerError("");
    setShowCustomerModal(true);
  };

  const openEditCustomer = (
    customer: Customer
  ) => {
    setEditingCustomer(customer);

    setCustomerForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
      company: customer.company || "",
      notes: customer.notes || "",
      tags: customer.tags?.join(", ") || "",
    });

    setCustomerError("");
    setShowCustomerModal(true);
  };

  const closeCustomerModal = () => {
    if (customerSaving) return;

    setShowCustomerModal(false);
    setEditingCustomer(null);
    setCustomerForm(emptyCustomerForm);
    setCustomerError("");
  };

  const saveCustomer = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) return;

    setCustomerSaving(true);
    setCustomerError("");

    try {
      const tags = customerForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const payload = {
        name: customerForm.name.trim(),
        email:
          customerForm.email.trim() ||
          undefined,
        phone:
          customerForm.phone.trim() ||
          undefined,
        address:
          customerForm.address.trim() ||
          undefined,
        company:
          customerForm.company.trim() ||
          undefined,
        notes:
          customerForm.notes.trim() ||
          undefined,
        tags,
      };

      const url = editingCustomer
        ? `${API_URL}/customers/${editingCustomer._id}`
        : `${API_URL}/customers`;

      const response = await fetch(url, {
        method: editingCustomer ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to save customer"
        );
      }

      closeCustomerModal();

      await loadCustomers();
      await loadDashboard();
    } catch (err) {
      setCustomerError(
        err instanceof Error
          ? err.message
          : "Failed to save customer"
      );
    } finally {
      setCustomerSaving(false);
    }
  };

  const deleteCustomer = async (
    customer: Customer
  ) => {
    if (!token) return;

    const confirmed = window.confirm(
      `Delete customer "${customer.name}"?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/customers/${customer._id}`,
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
            "Failed to delete customer"
        );
      }

      await loadCustomers();
      await loadDashboard();
    } catch (err) {
      setCustomerError(
        err instanceof Error
          ? err.message
          : "Failed to delete customer"
      );
    }
  };

  /* =======================================================
     CATEGORIES API
     ======================================================= */

  const loadCategories = async () => {
    if (!token) return;

    setCategoriesLoading(true);
    setCategoryError("");

    try {
      const response = await fetch(
        `${API_URL}/categories`,
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
            "Failed to load categories"
        );
      }

      setCategories(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (err) {
      setCategoryError(
        err instanceof Error
          ? err.message
          : "Failed to load categories"
      );
    } finally {
      setCategoriesLoading(false);
    }
  };

  const openCreateCategory = () => {
    setEditingCategory(null);
    setCategoryForm(emptyCategoryForm);
    setCategoryError("");
    setShowCategoryModal(true);
  };

  const openEditCategory = (
    category: Category
  ) => {
    setEditingCategory(category);

    setCategoryForm({
      name: category.name || "",
      description:
        category.description || "",
    });

    setCategoryError("");
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    if (categorySaving) return;

    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryForm(emptyCategoryForm);
    setCategoryError("");
  };

  const saveCategory = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) return;

    setCategorySaving(true);
    setCategoryError("");

    try {
      const payload = {
        name: categoryForm.name.trim(),
        description:
          categoryForm.description.trim() ||
          undefined,
      };

      const url = editingCategory
        ? `${API_URL}/categories/${editingCategory._id}`
        : `${API_URL}/categories`;

      const response = await fetch(url, {
        method: editingCategory ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to save category"
        );
      }

      closeCategoryModal();

      await loadCategories();
      await loadProducts();
    } catch (err) {
      setCategoryError(
        err instanceof Error
          ? err.message
          : "Failed to save category"
      );
    } finally {
      setCategorySaving(false);
    }
  };

  const deleteCategory = async (
    category: Category
  ) => {
    if (!token) return;

    const confirmed = window.confirm(
      `Delete category "${category.name}"?`
    );

    if (!confirmed) return;

    setCategoryError("");

    try {
      const response = await fetch(
        `${API_URL}/categories/${category._id}`,
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
            "Failed to delete category"
        );
      }

      await loadCategories();
    } catch (err) {
      setCategoryError(
        err instanceof Error
          ? err.message
          : "Failed to delete category"
      );
    }
  };

  /* =======================================================
     PRODUCTS API
     ======================================================= */

  const loadProducts = async () => {
    if (!token) return;

    setProductsLoading(true);
    setProductError("");

    try {
      const params = new URLSearchParams();

      if (productSearch.trim()) {
        params.set(
          "search",
          productSearch.trim()
        );
      }

      const query = params.toString();

      const url = query
        ? `${API_URL}/products?${query}`
        : `${API_URL}/products`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to load products"
        );
      }

      setProducts(
        result.data?.products || []
      );
    } catch (err) {
      setProductError(
        err instanceof Error
          ? err.message
          : "Failed to load products"
      );
    } finally {
      setProductsLoading(false);
    }
  };

  const openCreateProduct = () => {
    setEditingProduct(null);
    setProductForm(emptyProductForm);
    setProductError("");
    setShowProductModal(true);

    if (categories.length === 0) {
      loadCategories();
    }
  };

  const openEditProduct = (
    product: Product
  ) => {
    const categoryId =
      typeof product.categoryId === "string"
        ? product.categoryId
        : product.categoryId?._id || "";

    setEditingProduct(product);

    setProductForm({
      name: product.name || "",
      sku: product.sku || "",
      categoryId,
      description:
        product.description || "",
      price: String(product.price ?? ""),
      cost: String(product.cost ?? ""),
      stock: String(product.stock ?? 0),
      lowStockThreshold: String(
        product.lowStockThreshold ?? 5
      ),
      status:
        product.status || "ACTIVE",
    });

    setProductError("");
    setShowProductModal(true);

    if (categories.length === 0) {
      loadCategories();
    }
  };

  const closeProductModal = () => {
    if (productSaving) return;

    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm(emptyProductForm);
    setProductError("");
  };

  const saveProduct = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) return;

    setProductSaving(true);
    setProductError("");

    try {
      const payload: Record<
        string,
        unknown
      > = {
        name: productForm.name.trim(),
        sku: productForm.sku
          .trim()
          .toUpperCase(),

        description:
          productForm.description.trim() ||
          undefined,

        price: Number(productForm.price),

        cost: Number(productForm.cost),

        stock: Number(productForm.stock),

        lowStockThreshold: Number(
          productForm.lowStockThreshold
        ),

        status: productForm.status,
      };

      if (productForm.categoryId) {
        payload.categoryId =
          productForm.categoryId;
      }

      const url = editingProduct
        ? `${API_URL}/products/${editingProduct._id}`
        : `${API_URL}/products`;

      const response = await fetch(url, {
        method: editingProduct ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to save product"
        );
      }

      closeProductModal();

      await loadProducts();
      await loadDashboard();
    } catch (err) {
      setProductError(
        err instanceof Error
          ? err.message
          : "Failed to save product"
      );
    } finally {
      setProductSaving(false);
    }
  };

  const deleteProduct = async (
    product: Product
  ) => {
    if (!token) return;

    const confirmed = window.confirm(
      `Delete product "${product.name}"?`
    );

    if (!confirmed) return;

    setProductError("");

    try {
      const response = await fetch(
        `${API_URL}/products/${product._id}`,
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
            "Failed to delete product"
        );
      }

      await loadProducts();
      await loadDashboard();
    } catch (err) {
      setProductError(
        err instanceof Error
          ? err.message
          : "Failed to delete product"
      );
    }
  };

  /* =======================================================
     EFFECTS
     ======================================================= */

  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, [token]);

  useEffect(() => {
    if (
      token &&
      page === "Customers"
    ) {
      loadCustomers();
    }
  }, [token, page]);

  useEffect(() => {
    if (
      token &&
      page === "Categories"
    ) {
      loadCategories();
    }
  }, [token, page]);

  useEffect(() => {
    if (
      token &&
      page === "Products"
    ) {
      loadProducts();
      loadCategories();
    }
  }, [token, page]);

  /* =======================================================
     LOGIN SCREEN
     ======================================================= */

  if (!token) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="brand">
            <div className="brand-icon">
              B
            </div>

            <div>
              <h1>BizNest</h1>
              <p>
                Business Management System
              </p>
            </div>
          </div>

          <div className="login-heading">
            <h2>Welcome back</h2>
            <p>
              Sign in to manage your business
            </p>
          </div>

          <form onSubmit={login}>

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="Enter your email"
              required
            />

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter your password"
              required
            />

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </button>

          </form>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN APP
     ======================================================= */

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="brand-icon">
            B
          </div>

          <div>
            <strong>BizNest</strong>
            <span>
              Business Manager
            </span>
          </div>

        </div>

        <nav>

          {[
            "Dashboard",
            "Customers",
            "Products",
            "Categories",
            "Suppliers",
            "Purchase Orders",
            "Sales",
            "Expenses",
            "Reports",
            "Notifications",
            "Website Builder",
          ].map((item) => (

            <button
              key={item}
              className={
                page === item
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                setPage(item)
              }
            >
              {item}
            </button>

          ))}

        </nav>

        <button
          className="logout"
          onClick={logout}
        >
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="main">

        <header className="topbar">

          <div>
            <h1>{page}</h1>

            <p>
              Manage your business from one
              place.
            </p>
          </div>

          <div className="user-info">

            <div className="avatar">
              {user?.name
                ?.charAt(0)
                .toUpperCase() || "A"}
            </div>

            <div>
              <strong>
                {user?.name || "Admin"}
              </strong>

              <span>
                {user?.role || "OWNER"}
              </span>
            </div>

          </div>

        </header>

        {/* DASHBOARD */}

        {page === "Dashboard" && (
          <DashboardPage
            dashboard={dashboard}
            error={error}
          />
        )}

        {/* CUSTOMERS */}

        {page === "Customers" && (
          <CustomersPage
            customers={customers}
            loading={customersLoading}
            error={customerError}
            search={customerSearch}
            onSearchChange={
              setCustomerSearch
            }
            onAdd={
              openCreateCustomer
            }
            onEdit={
              openEditCustomer
            }
            onDelete={
              deleteCustomer
            }
            onRefresh={
              loadCustomers
            }
          />
        )}

        {/* PRODUCTS */}

        {page === "Products" && (
          <ProductsPage
            products={products}
            loading={productsLoading}
            error={productError}
            search={productSearch}
            categories={categories}
            onSearchChange={
              setProductSearch
            }
            onAdd={
              openCreateProduct
            }
            onEdit={
              openEditProduct
            }
            onDelete={
              deleteProduct
            }
            onRefresh={
              loadProducts
            }
          />
        )}

        {/* CATEGORIES */}

        {page === "Categories" && (
          <CategoriesPage
            categories={categories}
            loading={categoriesLoading}
            error={categoryError}
            search={categorySearch}
            onSearchChange={
              setCategorySearch
            }
            onAdd={
              openCreateCategory
            }
            onEdit={
              openEditCategory
            }
            onDelete={
              deleteCategory
            }
            onRefresh={
              loadCategories
            }
          />
        )}

        {/* SUPPLIERS */}

        {page === "Suppliers" && <SuppliersPage token={token} />}

        {/* PURCHASE ORDERS */}

        {page === "Purchase Orders" && <PurchaseOrdersPage token={token} />}

        {/* SALES */}

        {page === "Sales" && <SalesPage token={token} />}

        {/* EXPENSES */}

        {page === "Expenses" && <ExpensesPage token={token} />}

        {/* REPORTS */}

        {page === "Reports" && <ReportsPage token={token} />}

        {/* NOTIFICATIONS */}

        {page === "Notifications" && <NotificationsPage token={token} />}

        {/* WEBSITE BUILDER */}

        {page === "Website Builder" && (
          <WebsiteBuilderPage token={token} />
        )}

      </main>

      {/* CUSTOMER MODAL */}

      {showCustomerModal && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeCustomerModal();
            }
          }}
        >

          <div className="modal">

            <div className="modal-header">

              <div>
                <h2>
                  {editingCustomer
                    ? "Edit Customer"
                    : "Add Customer"}
                </h2>

                <p>
                  Manage customer information.
                </p>
              </div>

              <button
                className="close-button"
                onClick={
                  closeCustomerModal
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={saveCustomer}
            >

              <div className="form-grid">

                <div className="form-field full">

                  <label>
                    Name *
                  </label>

                  <input
                    value={
                      customerForm.name
                    }
                    onChange={(event) =>
                      setCustomerForm({
                        ...customerForm,
                        name:
                          event.target.value,
                      })
                    }
                    placeholder="Customer name"
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={
                      customerForm.email
                    }
                    onChange={(event) =>
                      setCustomerForm({
                        ...customerForm,
                        email:
                          event.target.value,
                      })
                    }
                    placeholder="customer@example.com"
                  />

                </div>

                <div className="form-field">

                  <label>
                    Phone
                  </label>

                  <input
                    value={
                      customerForm.phone
                    }
                    onChange={(event) =>
                      setCustomerForm({
                        ...customerForm,
                        phone:
                          event.target.value,
                      })
                    }
                    placeholder="9876543210"
                  />

                </div>

                <div className="form-field">

                  <label>
                    Company
                  </label>

                  <input
                    value={
                      customerForm.company
                    }
                    onChange={(event) =>
                      setCustomerForm({
                        ...customerForm,
                        company:
                          event.target.value,
                      })
                    }
                    placeholder="Company name"
                  />

                </div>

                <div className="form-field">

                  <label>
                    Address
                  </label>

                  <input
                    value={
                      customerForm.address
                    }
                    onChange={(event) =>
                      setCustomerForm({
                        ...customerForm,
                        address:
                          event.target.value,
                      })
                    }
                    placeholder="Chennai"
                  />

                </div>

                <div className="form-field full">

                  <label>
                    Tags
                  </label>

                  <input
                    value={
                      customerForm.tags
                    }
                    onChange={(event) =>
                      setCustomerForm({
                        ...customerForm,
                        tags:
                          event.target.value,
                      })
                    }
                    placeholder="regular, retail"
                  />

                </div>

                <div className="form-field full">

                  <label>
                    Notes
                  </label>

                  <textarea
                    value={
                      customerForm.notes
                    }
                    onChange={(event) =>
                      setCustomerForm({
                        ...customerForm,
                        notes:
                          event.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Customer notes"
                  />

                </div>

              </div>

              {customerError && (
                <div className="error">
                  {customerError}
                </div>
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    closeCustomerModal
                  }
                  disabled={
                    customerSaving
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button modal-save"
                  disabled={
                    customerSaving
                  }
                >
                  {customerSaving
                    ? "Saving..."
                    : editingCustomer
                    ? "Update Customer"
                    : "Create Customer"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* PRODUCT MODAL */}

      {showProductModal && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeProductModal();
            }
          }}
        >

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p>
                  Manage product and inventory
                  information.
                </p>

              </div>

              <button
                className="close-button"
                onClick={
                  closeProductModal
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={saveProduct}
            >

              <div className="form-grid">

                <div className="form-field full">

                  <label>
                    Product Name *
                  </label>

                  <input
                    value={
                      productForm.name
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        name:
                          event.target.value,
                      })
                    }
                    placeholder="Dell Inspiron 15"
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    SKU *
                  </label>

                  <input
                    value={
                      productForm.sku
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        sku:
                          event.target.value
                            .toUpperCase(),
                      })
                    }
                    placeholder="LAPTOP-001"
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Category
                  </label>

                  <select
                    value={
                      productForm.categoryId
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        categoryId:
                          event.target.value,
                      })
                    }
                  >

                    <option value="">
                      No Category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={
                            category._id
                          }
                          value={
                            category._id
                          }
                        >
                          {category.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="form-field">

                  <label>
                    Selling Price *
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      productForm.price
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        price:
                          event.target.value,
                      })
                    }
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Cost *
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      productForm.cost
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        cost:
                          event.target.value,
                      })
                    }
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Stock
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      productForm.stock
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        stock:
                          event.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-field">

                  <label>
                    Low Stock Threshold
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      productForm.lowStockThreshold
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        lowStockThreshold:
                          event.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-field">

                  <label>
                    Status
                  </label>

                  <select
                    value={
                      productForm.status
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        status:
                          event.target
                            .value as
                            | "ACTIVE"
                            | "INACTIVE",
                      })
                    }
                  >

                    <option value="ACTIVE">
                      ACTIVE
                    </option>

                    <option value="INACTIVE">
                      INACTIVE
                    </option>

                  </select>

                </div>

                <div className="form-field full">

                  <label>
                    Description
                  </label>

                  <textarea
                    value={
                      productForm.description
                    }
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        description:
                          event.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Product description"
                  />

                </div>

              </div>

              {productError && (
                <div className="error">
                  {productError}
                </div>
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    closeProductModal
                  }
                  disabled={
                    productSaving
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button modal-save"
                  disabled={
                    productSaving
                  }
                >
                  {productSaving
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Create Product"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* CATEGORY MODAL */}

      {showCategoryModal && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeCategoryModal();
            }
          }}
        >

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p>
                  Create and manage product
                  categories.
                </p>

              </div>

              <button
                className="close-button"
                onClick={
                  closeCategoryModal
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={saveCategory}
            >

              <div className="form-grid">

                <div className="form-field full">

                  <label>
                    Category Name *
                  </label>

                  <input
                    value={
                      categoryForm.name
                    }
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        name:
                          event.target.value,
                      })
                    }
                    placeholder="Laptops"
                    required
                  />

                </div>

                <div className="form-field full">

                  <label>
                    Description
                  </label>

                  <textarea
                    value={
                      categoryForm.description
                    }
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        description:
                          event.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Laptop and notebook products"
                  />

                </div>

              </div>

              {categoryError && (
                <div className="error">
                  {categoryError}
                </div>
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    closeCategoryModal
                  }
                  disabled={
                    categorySaving
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button modal-save"
                  disabled={
                    categorySaving
                  }
                >
                  {categorySaving
                    ? "Saving..."
                    : editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function DashboardPage({
  dashboard,
  error,
}: {
  dashboard: DashboardData | null;
  error: string;
}) {
  return (
    <>
      {error && (
        <div className="error dashboard-error">
          {error}
        </div>
      )}

      <section className="cards">

        <StatCard
          title="Customers"
          value={
            dashboard?.summary
              .totalCustomers ?? 0
          }
        />

        <StatCard
          title="Products"
          value={
            dashboard?.summary
              .totalProducts ?? 0
          }
        />

        <StatCard
          title="Suppliers"
          value={
            dashboard?.summary
              .totalSuppliers ?? 0
          }
        />

        <StatCard
          title="Sales"
          value={
            dashboard?.summary
              .totalSales ?? 0
          }
        />

      </section>

      <section className="cards">

        <StatCard
          title="Revenue"
          value={`₹${(
            dashboard?.summary
              .totalRevenue ?? 0
          ).toLocaleString()}`}
        />

        <StatCard
          title="Expenses"
          value={`₹${(
            dashboard?.summary
              .totalExpenseAmount ?? 0
          ).toLocaleString()}`}
        />

        <StatCard
          title="Net Profit"
          value={`₹${(
            dashboard?.summary
              .netProfit ?? 0
          ).toLocaleString()}`}
        />

        <StatCard
          title="Low Stock"
          value={
            dashboard?.lowStockProducts
              ?.length ?? 0
          }
        />

      </section>

      <section className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">
            <h2>
              Business Overview
            </h2>
          </div>

          <div className="overview-row">
            <span>
              Completed Sales
            </span>

            <strong>
              {dashboard?.summary
                .completedSales ?? 0}
            </strong>
          </div>

          <div className="overview-row">
            <span>
              Draft Sales
            </span>

            <strong>
              {dashboard?.summary
                .draftSales ?? 0}
            </strong>
          </div>

          <div className="overview-row">
            <span>
              Purchase Orders
            </span>

            <strong>
              {dashboard?.summary
                .totalPurchaseOrders ?? 0}
            </strong>
          </div>

          <div className="overview-row">
            <span>
              Pending Expenses
            </span>

            <strong>
              {dashboard?.summary
                .pendingExpenses ?? 0}
            </strong>
          </div>

        </div>

        <div className="panel">

          <div className="panel-header">
            <h2>
              Low Stock Products
            </h2>
          </div>

          {dashboard?.lowStockProducts
            ?.length ? (

            dashboard.lowStockProducts.map(
              (product) => (
                <div
                  className="product-row"
                  key={product._id}
                >

                  <div>
                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.sku}
                    </span>
                  </div>

                  <strong>
                    {product.stock}
                  </strong>

                </div>
              )
            )

          ) : (

            <div className="empty">
              No low-stock products
            </div>

          )}

        </div>

      </section>
    </>
  );
}

/* =========================================================
   CUSTOMERS PAGE
   ========================================================= */

function CustomersPage({
  customers,
  loading,
  error,
  search,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
}: {
  customers: Customer[];
  loading: boolean;
  error: string;
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onRefresh: () => void;
}) {
  const filteredCustomers =
    customers.filter((customer) => {
      const value =
        search.toLowerCase();

      return (
        customer.name
          .toLowerCase()
          .includes(value) ||
        customer.email
          ?.toLowerCase()
          .includes(value) ||
        customer.phone
          ?.toLowerCase()
          .includes(value) ||
        customer.company
          ?.toLowerCase()
          .includes(value)
      );
    });

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>Customers</h2>

          <p>
            {customers.length} customer
            {customers.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

        <div className="toolbar-actions">

          <button
            className="secondary-button"
            onClick={onRefresh}
          >
            Refresh
          </button>

          <button
            className="primary-button add-button"
            onClick={onAdd}
          >
            + Add Customer
          </button>

        </div>

      </div>

      <div className="search-bar">

        <input
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search customers..."
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
            Loading customers...
          </div>

        ) : filteredCustomers.length === 0 ? (

          <div className="table-empty">

            <div className="empty-large">
              👥
            </div>

            <h3>
              {search
                ? "No customers found"
                : "No customers yet"}
            </h3>

            <p>
              {search
                ? "Try a different search."
                : "Add your first customer to get started."}
            </p>

            {!search && (
              <button
                className="primary-button add-button"
                onClick={onAdd}
              >
                + Add Customer
              </button>
            )}

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>
                    Customer
                  </th>

                  <th>
                    Contact
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Tags
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {filteredCustomers.map(
                  (customer) => (

                    <tr
                      key={
                        customer._id
                      }
                    >

                      <td>

                        <div className="customer-name">

                          <div className="customer-avatar">
                            {customer.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {
                                customer.name
                              }
                            </strong>

                            <span>
                              {
                                customer.address ||
                                ""
                              }
                            </span>
                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="contact-cell">

                          {customer.email && (
                            <span>
                              {
                                customer.email
                              }
                            </span>
                          )}

                          {customer.phone && (
                            <span>
                              {
                                customer.phone
                              }
                            </span>
                          )}

                          {!customer.email &&
                            !customer.phone && (
                              <span>
                                —
                              </span>
                            )}

                        </div>

                      </td>

                      <td>
                        {
                          customer.company ||
                          "—"
                        }
                      </td>

                      <td>

                        <div className="tags">

                          {customer.tags?.length
                            ? customer.tags.map(
                                (tag) => (
                                  <span
                                    className="tag"
                                    key={tag}
                                  >
                                    {tag}
                                  </span>
                                )
                              )
                            : "—"}

                        </div>

                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="icon-button edit"
                            onClick={() =>
                              onEdit(
                                customer
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="icon-button delete"
                            onClick={() =>
                              onDelete(
                                customer
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

    </section>
  );
}

/* =========================================================
   PRODUCTS PAGE
   ========================================================= */

function ProductsPage({
  products,
  loading,
  error,
  search,
  categories,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
}: {
  products: Product[];
  loading: boolean;
  error: string;
  search: string;
  categories: Category[];
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onRefresh: () => void;
}) {
  const filteredProducts =
    products.filter((product) => {
      const value =
        search.toLowerCase();

      return (
        product.name
          .toLowerCase()
          .includes(value) ||
        product.sku
          .toLowerCase()
          .includes(value) ||
        product.description
          ?.toLowerCase()
          .includes(value)
      );
    });

  const getCategoryName = (
    product: Product
  ) => {
    if (
      product.categoryId &&
      typeof product.categoryId ===
        "object"
    ) {
      return product.categoryId.name;
    }

    if (
      typeof product.categoryId ===
      "string"
    ) {
      return (
        categories.find(
          (category) =>
            category._id ===
            product.categoryId
        )?.name || "—"
      );
    }

    return "—";
  };

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>Products</h2>

          <p>
            {products.length} product
            {products.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

        <div className="toolbar-actions">

          <button
            className="secondary-button"
            onClick={onRefresh}
          >
            Refresh
          </button>

          <button
            className="primary-button add-button"
            onClick={onAdd}
          >
            + Add Product
          </button>

        </div>

      </div>

      <div className="search-bar">

        <input
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search by product name or SKU..."
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
            Loading products...
          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="table-empty">

            <div className="empty-large">
              📦
            </div>

            <h3>
              {search
                ? "No products found"
                : "No products yet"}
            </h3>

            <p>
              {search
                ? "Try a different search."
                : "Add your first product to start managing inventory."}
            </p>

            {!search && (
              <button
                className="primary-button add-button"
                onClick={onAdd}
              >
                + Add Product
              </button>
            )}

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Product
                  </th>

                  <th>
                    SKU
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Cost
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map(
                  (product) => (

                    <tr
                      key={
                        product._id
                      }
                    >

                      <td>
                        <strong>
                          {product.name}
                        </strong>

                        <span className="table-subtext">
                          {
                            product.description ||
                            ""
                          }
                        </span>
                      </td>

                      <td>
                        <span className="sku">
                          {product.sku}
                        </span>
                      </td>

                      <td>
                        {getCategoryName(
                          product
                        )}
                      </td>

                      <td>
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString()}
                      </td>

                      <td>
                        ₹
                        {Number(
                          product.cost
                        ).toLocaleString()}
                      </td>

                      <td>

                        <span
                          className={
                            product.stock <=
                            product.lowStockThreshold
                              ? "stock-low"
                              : "stock-good"
                          }
                        >
                          {product.stock}
                        </span>

                      </td>

                      <td>

                        <span
                          className={
                            product.status ===
                            "ACTIVE"
                              ? "status-active"
                              : "status-inactive"
                          }
                        >
                          {
                            product.status
                          }
                        </span>

                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="icon-button edit"
                            onClick={() =>
                              onEdit(
                                product
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="icon-button delete"
                            onClick={() =>
                              onDelete(
                                product
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

    </section>
  );
}

/* =========================================================
   CATEGORIES PAGE
   ========================================================= */

function CategoriesPage({
  categories,
  loading,
  error,
  search,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
}: {
  categories: Category[];
  loading: boolean;
  error: string;
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onRefresh: () => void;
}) {
  const filteredCategories =
    categories.filter((category) => {
      const value =
        search.toLowerCase();

      return (
        category.name
          .toLowerCase()
          .includes(value) ||
        category.description
          ?.toLowerCase()
          .includes(value)
      );
    });

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>Categories</h2>

          <p>
            {categories.length} categor
            {categories.length === 1
              ? "y"
              : "ies"}
          </p>
        </div>

        <div className="toolbar-actions">

          <button
            className="secondary-button"
            onClick={onRefresh}
          >
            Refresh
          </button>

          <button
            className="primary-button add-button"
            onClick={onAdd}
          >
            + Add Category
          </button>

        </div>

      </div>

      <div className="search-bar">

        <input
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search categories..."
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
            Loading categories...
          </div>

        ) : filteredCategories.length === 0 ? (

          <div className="table-empty">

            <div className="empty-large">
              🗂️
            </div>

            <h3>
              {search
                ? "No categories found"
                : "No categories yet"}
            </h3>

            <p>
              {search
                ? "Try a different search."
                : "Create your first product category."}
            </p>

            {!search && (
              <button
                className="primary-button add-button"
                onClick={onAdd}
              >
                + Add Category
              </button>
            )}

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Category
                  </th>

                  <th>
                    Description
                  </th>

                  <th>
                    Created
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredCategories.map(
                  (category) => (

                    <tr
                      key={
                        category._id
                      }
                    >

                      <td>
                        <strong>
                          {
                            category.name
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          category.description ||
                          "—"
                        }
                      </td>

                      <td>
                        {new Date(
                          category.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="icon-button edit"
                            onClick={() =>
                              onEdit(
                                category
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="icon-button delete"
                            onClick={() =>
                              onDelete(
                                category
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

    </section>
  );
}

/* =========================================================
   NEW BUSINESS MODULE UI PAGES
   These pages are intentionally UI-first. API integration can be
   added later without changing the navigation structure.
   ========================================================= */

type ModulePageProps = {
  token: string | null;
};

type SupplierRow = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
};

function SuppliersPage({ token }: ModulePageProps) {
  void token;
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierRow[]>([
    { id: 1, name: "Arun Kumar", company: "Tech Wholesale", email: "arun@techwholesale.com", phone: "9876543210", status: "ACTIVE" },
    { id: 2, name: "Priya Traders", company: "Priya Enterprises", email: "sales@priyatraders.com", phone: "9840123456", status: "ACTIVE" },
  ]);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });

  const filtered = suppliers.filter((item) =>
    `${item.name} ${item.company} ${item.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const addSupplier = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.company.trim()) return;
    setSuppliers((current) => [
      ...current,
      { id: Date.now(), ...form, status: "ACTIVE" },
    ]);
    setForm({ name: "", company: "", email: "", phone: "" });
    setShowForm(false);
  };

  return (
    <section className="customers-page">
      <div className="page-toolbar">
        <div><h2>Suppliers</h2><p>{suppliers.length} supplier{suppliers.length === 1 ? "" : "s"}</p></div>
        <div className="toolbar-actions">
          <button className="secondary-button" onClick={() => setSearch("")}>Refresh</button>
          <button className="primary-button add-button" onClick={() => setShowForm(true)}>+ Add Supplier</button>
        </div>
      </div>
      <div className="search-bar"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search suppliers..." /></div>
      {showForm && (
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-header"><h2>Add Supplier</h2></div>
          <form onSubmit={addSupplier}>
            <div className="form-grid">
              <div className="form-field"><label>Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Supplier name" /></div>
              <div className="form-field"><label>Company *</label><input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" /></div>
              <div className="form-field"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="supplier@example.com" /></div>
              <div className="form-field"><label>Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" /></div>
            </div>
            <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="primary-button">Save Supplier</button></div>
          </form>
        </div>
      )}
      <div className="customer-table-panel">
        {filtered.length === 0 ? <div className="table-empty"><div className="empty-large">🏢</div><h3>No suppliers found</h3><p>Add a supplier or change your search.</p></div> : (
          <div className="table-wrapper"><table><thead><tr><th>Supplier</th><th>Company</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead><tbody>
            {filtered.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.company}</td><td><div className="contact-cell"><span>{item.email || "—"}</span><span>{item.phone || "—"}</span></div></td><td><span className="status-active">{item.status}</span></td><td><button className="icon-button delete" onClick={() => setSuppliers((current) => current.filter((x) => x.id !== item.id))}>Delete</button></td></tr>)}
          </tbody></table></div>
        )}
      </div>
    </section>
  );
}

function PurchaseOrdersPage({ token }: ModulePageProps) {
  void token;
  const orders = [
    ["PO-1001", "Tech Wholesale", "19 Aug 2026", "₹48,500", "PENDING"],
    ["PO-1002", "Priya Enterprises", "17 Aug 2026", "₹22,800", "RECEIVED"],
    ["PO-1003", "Metro Supplies", "15 Aug 2026", "₹15,250", "DRAFT"],
  ];
  return (
    <section className="customers-page">
      <div className="page-toolbar"><div><h2>Purchase Orders</h2><p>Track supplier orders and incoming stock.</p></div><div className="toolbar-actions"><button className="secondary-button">Export</button><button className="primary-button add-button">+ New Purchase Order</button></div></div>
      <section className="cards"><StatCard title="Total Orders" value={orders.length} /><StatCard title="Pending" value={1} /><StatCard title="Received" value={1} /><StatCard title="Order Value" value="₹86,550" /></section>
      <div className="customer-table-panel"><div className="table-wrapper"><table><thead><tr><th>PO Number</th><th>Supplier</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>{orders.map((o) => <tr key={o[0]}><td><strong>{o[0]}</strong></td><td>{o[1]}</td><td>{o[2]}</td><td>{o[3]}</td><td><span className={o[4] === "RECEIVED" ? "status-active" : "sku"}>{o[4]}</span></td><td><button className="icon-button edit">View</button></td></tr>)}</tbody></table></div></div>
    </section>
  );
}

function SalesPage({ token }: ModulePageProps) {
  void token;
  const sales = [
    ["INV-2041", "Walk-in Customer", "19 Aug 2026", "₹12,500", "PAID"],
    ["INV-2040", "ABC Retail", "18 Aug 2026", "₹8,750", "PAID"],
    ["INV-2039", "Kumar Stores", "18 Aug 2026", "₹4,250", "PENDING"],
  ];
  return (
    <section className="customers-page">
      <div className="page-toolbar"><div><h2>Sales</h2><p>Manage invoices, payments and customer sales.</p></div><div className="toolbar-actions"><button className="secondary-button">Export</button><button className="primary-button add-button">+ New Sale</button></div></div>
      <section className="cards"><StatCard title="Today's Sales" value="₹25,500" /><StatCard title="Invoices" value={sales.length} /><StatCard title="Paid" value="₹21,250" /><StatCard title="Pending" value="₹4,250" /></section>
      <div className="search-bar"><input placeholder="Search invoice, customer or date..." /></div>
      <div className="customer-table-panel"><div className="table-wrapper"><table><thead><tr><th>Invoice</th><th>Customer</th><th>Date</th><th>Total</th><th>Payment</th><th>Actions</th></tr></thead><tbody>{sales.map((s) => <tr key={s[0]}><td><strong>{s[0]}</strong></td><td>{s[1]}</td><td>{s[2]}</td><td>{s[3]}</td><td><span className={s[4] === "PAID" ? "status-active" : "sku"}>{s[4]}</span></td><td><button className="icon-button edit">View</button></td></tr>)}</tbody></table></div></div>
    </section>
  );
}

function ExpensesPage({ token }: ModulePageProps) {
  void token;
  const expenses = [
    ["EXP-301", "Office Rent", "19 Aug 2026", "₹18,000", "PAID"],
    ["EXP-300", "Internet", "18 Aug 2026", "₹1,499", "PAID"],
    ["EXP-299", "Transport", "17 Aug 2026", "₹2,350", "PENDING"],
  ];
  return (
    <section className="customers-page">
      <div className="page-toolbar"><div><h2>Expenses</h2><p>Track business spending and payment status.</p></div><div className="toolbar-actions"><button className="secondary-button">Export</button><button className="primary-button add-button">+ Add Expense</button></div></div>
      <section className="cards"><StatCard title="This Month" value="₹21,849" /><StatCard title="Paid" value="₹19,499" /><StatCard title="Pending" value="₹2,350" /><StatCard title="Categories" value={6} /></section>
      <div className="customer-table-panel"><div className="table-wrapper"><table><thead><tr><th>Reference</th><th>Expense</th><th>Date</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead><tbody>{expenses.map((e) => <tr key={e[0]}><td><strong>{e[0]}</strong></td><td>{e[1]}</td><td>{e[2]}</td><td>{e[3]}</td><td><span className={e[4] === "PAID" ? "status-active" : "sku"}>{e[4]}</span></td><td><button className="icon-button edit">View</button></td></tr>)}</tbody></table></div></div>
    </section>
  );
}

function ReportsPage({ token }: ModulePageProps) {
  void token;
  return (
    <section className="customers-page">
      <div className="page-toolbar"><div><h2>Reports</h2><p>Business performance and financial insights.</p></div><div className="toolbar-actions"><button className="secondary-button">Last 30 Days ▾</button><button className="primary-button add-button">Export Report</button></div></div>
      <section className="cards"><StatCard title="Revenue" value="₹3,84,500" /><StatCard title="Expenses" value="₹1,42,800" /><StatCard title="Gross Profit" value="₹2,41,700" /><StatCard title="Profit Margin" value="62.9%" /></section>
      <section className="dashboard-grid"><div className="panel"><div className="panel-header"><h2>Sales Performance</h2></div><div className="overview-row"><span>Total Sales</span><strong>₹3,84,500</strong></div><div className="overview-row"><span>Completed Invoices</span><strong>148</strong></div><div className="overview-row"><span>Average Order Value</span><strong>₹2,598</strong></div><div className="overview-row"><span>Growth</span><strong>+18.4%</strong></div></div><div className="panel"><div className="panel-header"><h2>Inventory Health</h2></div><div className="overview-row"><span>Total Products</span><strong>126</strong></div><div className="overview-row"><span>Low Stock</span><strong>8</strong></div><div className="overview-row"><span>Active Categories</span><strong>12</strong></div><div className="overview-row"><span>Stock Value</span><strong>₹8,42,300</strong></div></div></section>
    </section>
  );
}

function NotificationsPage({ token }: ModulePageProps) {
  void token;
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Low stock alert", text: "Dell Inspiron 15 has only 3 units left.", time: "10 min ago", unread: true },
    { id: 2, title: "Purchase order received", text: "PO-1002 has been marked as received.", time: "1 hour ago", unread: true },
    { id: 3, title: "Payment pending", text: "INV-2039 has an outstanding payment of ₹4,250.", time: "3 hours ago", unread: false },
  ]);
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <section className="customers-page">
      <div className="page-toolbar"><div><h2>Notifications</h2><p>{unread} unread notification{unread === 1 ? "" : "s"}</p></div><div className="toolbar-actions"><button className="secondary-button" onClick={() => setNotifications((items) => items.map((n) => ({ ...n, unread: false })))}>Mark all read</button></div></div>
      <div className="customer-table-panel"><div style={{ padding: 8 }}>{notifications.map((item) => <div key={item.id} className="product-row" style={{ padding: "18px 12px", borderBottom: "1px solid #eee", opacity: item.unread ? 1 : 0.7 }}><div><strong>{item.title}</strong><span>{item.text}</span><small style={{ display: "block", marginTop: 5 }}>{item.time}</small></div>{item.unread && <button className="icon-button edit" onClick={() => setNotifications((items) => items.map((n) => n.id === item.id ? { ...n, unread: false } : n))}>Mark read</button>}</div>)}</div></div>
    </section>
  );
}

/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="stat-card">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}

/* =========================================================
   PUBLIC WEBSITE ROUTER
   ========================================================= */

function App() {
  const pathname = window.location.pathname;

  /*
   * Public business websites use:
   * http://localhost:5173/sites/<slug>
   *
   * Example:
   * http://localhost:5173/sites/kreative-prints
   *
   * This check happens before the authenticated BizNest
   * dashboard is rendered.
   */
  if (pathname.startsWith("/sites/")) {
    const parts = pathname
      .split("/")
      .filter(Boolean);

    const slug = parts[1];

    if (slug) {
      return (
        <PublicWebsite
          slug={decodeURIComponent(slug)}
        />
      );
    }

    return <PublicWebsite />;
  }

  return <BizNestApp />;
}

export default App;