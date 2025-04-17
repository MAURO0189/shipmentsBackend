import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { adminRouter } from "./infrastructure/routes/admin.route";
import { createClient } from "redis";
import { AppDataSource } from "./infrastructure/database/data-source";
import { userRouter } from "./infrastructure/routes/user.route";
import { shipmentRouter } from "./infrastructure/routes/shipment.routes";

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

//Routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/shipment", shipmentRouter);

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? allowdHost : devHosts,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

export const redisClient = createClient();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const startTime = new Date().toLocaleString();
  console.log(`🚀 Server started at ${startTime}`);
  console.log(`🚀 Server running on port ${PORT}`);
});

app.on("error", (err) => {
  console.error(`❌ Server error:${err}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source initialized!");

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error initializing Data Source", err);
  });
