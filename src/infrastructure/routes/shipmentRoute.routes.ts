import express from "express";
import { ShipmentRouteController } from "../controllers/ShipmentRoute.Controller";
import { ShipmentRouteService } from "../../services/ShipmentRoute.Service";
import { adminMiddleware } from "../../middleware/admin.middleware";

export const shipmentRouteRouter = express.Router();
const shipmentRouteService = new ShipmentRouteService();
const shipmentRouteController = new ShipmentRouteController(
  shipmentRouteService
);

// Rutas que requieren autenticación y rol de administrador
shipmentRouteRouter.post(
  "/create",
  adminMiddleware,
  shipmentRouteController.createShipmentRoute.bind(shipmentRouteController)
);

shipmentRouteRouter.patch(
  "/status/:id",
  adminMiddleware,
  shipmentRouteController.updateRouteStatus.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/list",
  adminMiddleware,
  shipmentRouteController.getAllRoutes.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/status/:status",
  adminMiddleware,
  shipmentRouteController.getRoutesByStatus.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/detail/:uuid",
  adminMiddleware,
  shipmentRouteController.getRouteByUuid.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/shipment/:shipmentId",
  adminMiddleware,
  shipmentRouteController.getRoutesByShipmentId.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/date-range",
  adminMiddleware,
  shipmentRouteController.getRoutesByDateRange.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/carrier/:carrierId",
  adminMiddleware,
  shipmentRouteController.getRoutesByCarrierId.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/shipment-status/:status",
  adminMiddleware,
  shipmentRouteController.getRoutesByShipmentStatus.bind(
    shipmentRouteController
  )
);
