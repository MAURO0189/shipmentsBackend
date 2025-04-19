import { Router } from "express";
import { ShipmentController } from "../controllers/shipment.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { ShipmentRepository } from "../../domain/repositories/shipment.repository";
import { ShipmentService } from "../../services/shipment.service";

export const shipmentRouter = Router();

const shipmentRepository = new ShipmentRepository();
const shipmentService = new ShipmentService(shipmentRepository);
const shipmentController = new ShipmentController(shipmentService);

// Rutas para envíos (protegidas con middleware de autenticación)
shipmentRouter.post(
  "/register",
  authMiddleware,
  shipmentController.createShipment.bind(shipmentController)
);

shipmentRouter.patch(
  "/:id/status",
  authMiddleware,
  shipmentController.updateShipmentStatus.bind(shipmentController)
);

shipmentRouter.get(
  "/user-shipments",
  authMiddleware,
  shipmentController.getUserShipments.bind(shipmentController)
);

shipmentRouter.get(
  "/:uuid",
  authMiddleware,
  shipmentController.getShipmentByUuid.bind(shipmentController)
);

shipmentRouter.get(
  "/shipments/:id/history",
  authMiddleware,
  shipmentController.getShipmentStatusHistory.bind(shipmentController)
);
