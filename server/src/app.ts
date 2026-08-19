import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import businessRoutes from "./modules/businesses/business.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import customerRoutes from "./modules/customers/customer.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import expenseRoutes from "./modules/expenses/expense.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import purchaseOrderRoutes from "./modules/purchase-orders/purchase-order.routes.js";
import reportRoutes from "./modules/reports/report.routes.js";
import salesRoutes from "./modules/sales/sale.routes.js";
import supplierRoutes from "./modules/suppliers/supplier.routes.js";
import websiteRoutes from "./modules/websites/website.routes.js";
import publicWebsiteRoutes from "./modules/websites/public-website.routes.js";

const app = express();

/* =========================================================
   CORS
   ========================================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://biz-nest-eight.vercel.app",
  process.env.FRONTEND_URL,
].filter(
  (origin): origin is string => Boolean(origin)
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header.
      // Useful for Postman, server-to-server requests, etc.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/*
 * Explicitly handle CORS preflight requests.
 */
app.options("*", cors());

/* =========================================================
   BODY PARSER
   ========================================================= */

app.use(express.json());

/* =========================================================
   API ROUTES
   ========================================================= */

app.use("/api/auth", authRoutes);

app.use(
  "/api/businesses",
  businessRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/customers",
  customerRoutes
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
  "/api/inventory",
  inventoryRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/purchase-orders",
  purchaseOrderRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/sales",
  salesRoutes
);

app.use(
  "/api/suppliers",
  supplierRoutes
);

app.use(
  "/api/websites",
  websiteRoutes
);

/* =========================================================
   PUBLIC WEBSITE ROUTES
   ========================================================= */

/*
 * Public websites do NOT require authentication.
 *
 * Example:
 * GET /sites/kreative-prints
 */
app.use(
  "/sites",
  publicWebsiteRoutes
);

/* =========================================================
   EXPORT
   ========================================================= */

export default app;