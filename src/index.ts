import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { setupSwagger } from "./config/swagger";
import { adminRouter } from "./infrastructure/routes/admin.route";
import { AppDataSource } from "./infrastructure/database/data-source";
import { userRouter } from "./infrastructure/routes/user.route";
import { shipmentRouter } from "./infrastructure/routes/shipment.routes";
import { carrierRouter } from "./infrastructure/routes/carrier.routes";
import { shipmentRouteRouter } from "./infrastructure/routes/shipmentRoute.routes";

dotenv.config();

const allowdHost = ["http://localhost:3000", "https://localhost:3000"];

const devHosts = [
  "http://localhost:3000",
  "http://localhost:4200",
  "http://127.0.0.1:4200",
  "http://127.0.0.1:5500",
  "http://localhost:5173",
  "http://localhost:5174",
];

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? allowdHost : devHosts,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/shipment", shipmentRouter);
app.use("/api/carrier", carrierRouter);
app.use("/api/shipment-route", shipmentRouteRouter);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source initialized!");

    app.listen(PORT, () => {
      const startTime = new Date().toLocaleString();
      console.log(`🚀 Server started at ${startTime}`);
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error initializing Data Source", err);
  });
