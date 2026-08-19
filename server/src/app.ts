import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import customerRoutes from "./modules/customers/customer.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import supplierRoutes from "./modules/suppliers/supplier.routes.js";
import purchaseOrderRoutes from "./modules/purchase-orders/purchase-order.routes.js";
import saleRoutes from "./modules/sales/sale.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import expenseRoutes from "./modules/expenses/expense.routes.js";
import reportRoutes from "./modules/reports/report.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import websiteRoutes from "./modules/websites/website.routes.js";
import publicWebsiteRoutes from "./modules/websites/public-website.routes.js";


const app = express();

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Body parsers MUST come before API routes.
|
*/
app.use(
  "/sites",
  publicWebsiteRoutes
);


app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/customers",
  customerRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/inventory",
  inventoryRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/suppliers",
  supplierRoutes
);

app.use(
  "/api/purchase-orders",
  purchaseOrderRoutes
);

app.use(
  "/api/sales",
  saleRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/expenses",
  expenseRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/websites",
  websiteRoutes
);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get(
  "/",
  (_req, res) => {
    res.status(200).json({
      success: true,
      message:
        "BizNest API is running",
    });
  }
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/customers",
  customerRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/inventory",
  inventoryRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/suppliers",
  supplierRoutes
);

app.use(
  "/api/purchase-orders",
  purchaseOrderRoutes
);

app.use(
  "/api/sales",
  saleRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/expenses",
  expenseRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(
  (_req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }
);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(error);

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
);

export default app;