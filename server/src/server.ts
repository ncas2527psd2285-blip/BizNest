import dns from "node:dns";

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);
import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`BizNest API running on http://localhost:${PORT}`);
  });
};

startServer();