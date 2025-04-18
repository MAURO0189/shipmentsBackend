import express from "express";
import { CarrierController } from "../controllers/Carrier.Controller";
import { CarrierService } from "../../services/Carrier.Service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";

export const carrierRouter = express.Router();
const carrierService = new CarrierService();
const carrierController = new CarrierController(carrierService);

// Rutas que requieren autenticación y rol de administrador
carrierRouter.post(
  "/create",
  [authMiddleware, adminMiddleware],
  carrierController.createCarrier.bind(carrierController)
);

carrierRouter.get(
  "/list",
  [authMiddleware, adminMiddleware],
  carrierController.getAllCarriers.bind(carrierController)
);

carrierRouter.get(
  "/detail/:id",
  [authMiddleware, adminMiddleware],
  carrierController.getCarrierById.bind(carrierController)
);
