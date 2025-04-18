import express from "express";
import { ShipmentRouteController } from "../controllers/ShipmentRoute.Controller";
import { ShipmentRouteService } from "../../services/ShipmentRoute.Service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";

export const shipmentRouteRouter = express.Router();
const shipmentRouteService = new ShipmentRouteService();
const shipmentRouteController = new ShipmentRouteController(
  shipmentRouteService
);

// Rutas que requieren autenticación y rol de administrador
shipmentRouteRouter.post(
  "/create",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.createShipmentRoute.bind(shipmentRouteController)
);

shipmentRouteRouter.patch(
  "/status/:id",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.updateRouteStatus.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/list",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.getAllRoutes.bind(shipmentRouteController)
);

// Nuevo endpoint para filtrar rutas por estado
shipmentRouteRouter.get(
  "/status/:status",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.getRoutesByStatus.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/detail/:uuid",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.getRouteByUuid.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/shipment/:shipmentId",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.getRoutesByShipmentId.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/date-range",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.getRoutesByDateRange.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/carrier/:carrierId",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.getRoutesByCarrierId.bind(shipmentRouteController)
);

shipmentRouteRouter.get(
  "/shipment-status/:status",
  [authMiddleware, adminMiddleware],
  shipmentRouteController.getRoutesByShipmentStatus.bind(
    shipmentRouteController
  )
);
