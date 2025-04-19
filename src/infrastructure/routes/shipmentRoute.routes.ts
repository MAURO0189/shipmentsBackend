import express from "express";
import { ShipmentRouteController } from "../controllers/ShipmentRoute.Controller";
import { ShipmentRouteService } from "../../services/ShipmentRoute.Service";
import { adminMiddleware } from "../../middleware/admin.middleware";

export const shipmentRouteRouter = express.Router();
const shipmentRouteService = new ShipmentRouteService();
const shipmentRouteController = new ShipmentRouteController(
  shipmentRouteService
);

/**
 * @swagger
 * tags:
 *   name: Rutas de Envío
 *   description: Endpoints para la gestión de rutas de envío
 */

/**
 * @swagger
 * /api/shipment-route/create:
 *   post:
 *     summary: Crear una nueva ruta de envío
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shipmentId
 *               - carrierId
 *               - origen
 *               - destino
 *             properties:
 *               shipmentId:
 *                 type: integer
 *               carrierId:
 *                 type: integer
 *               origen:
 *                 type: string
 *               destino:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *               fechaEstimadaLlegada:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Ruta de envío creada con éxito
 *       400:
 *         description: Error al crear la ruta de envío
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
shipmentRouteRouter.post(
  "/create",
  adminMiddleware,
  shipmentRouteController.createShipmentRoute.bind(shipmentRouteController)
);

/**
 * @swagger
 * /api/shipment-route/update/{id}:
 *   patch:
 *     summary: Actualizar una ruta de envío
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la ruta de envío a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carrierId:
 *                 type: integer
 *               origen:
 *                 type: string
 *               destino:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *               fechaEstimadaLlegada:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Ruta de envío actualizada con éxito
 *       400:
 *         description: Error al actualizar la ruta de envío
 */
shipmentRouteRouter.patch(
  "/status/:id",
  adminMiddleware,
  shipmentRouteController.updateRouteStatus.bind(shipmentRouteController)
);

/**
 * @swagger
 * /api/shipment-route/list:
 *   get:
 *     summary: Obtener todas las rutas de envío
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutas de envío
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
shipmentRouteRouter.get(
  "/list",
  adminMiddleware,
  shipmentRouteController.getAllRoutes.bind(shipmentRouteController)
);

/**
 * @swagger
 * /api/shipment-route/status/{status}:
 *   get:
 *     summary: Obtener rutas de envío por estado
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         description: Estado de las rutas de envío a filtrar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de rutas de envío filtradas por estado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
shipmentRouteRouter.get(
  "/status/:status",
  adminMiddleware,
  shipmentRouteController.getRoutesByStatus.bind(shipmentRouteController)
);

/**
 * @swagger
 * /api/shipment-route/detail/{uuid}:
 *   get:
 *     summary: Obtener detalles de una ruta de envío por UUID
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: UUID de la ruta de envío a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la ruta de envío
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
shipmentRouteRouter.get(
  "/detail/:uuid",
  adminMiddleware,
  shipmentRouteController.getRouteByUuid.bind(shipmentRouteController)
);

/**
 * @swagger
 * /api/shipment-route/shipment/{shipmentId}:
 *   get:
 *     summary: Obtener rutas de envío por ID de envío
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: shipmentId
 *         in: path
 *         required: true
 *         description: ID del envío para filtrar las rutas
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de rutas de envío filtradas por ID de envío
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
shipmentRouteRouter.get(
  "/shipment/:shipmentId",
  adminMiddleware,
  shipmentRouteController.getRoutesByShipmentId.bind(shipmentRouteController)
);

/**
 * @swagger
 * /api/shipment-route/date-range:
 *   get:
 *     summary: Obtener rutas de envío por rango de fechas
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: true
 *         description: Fecha de inicio del rango
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: endDate
 *         in: query
 *         required: true
 *         description: Fecha de fin del rango
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Lista de rutas de envío filtradas por rango de fechas
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
shipmentRouteRouter.get(
  "/date-range",
  adminMiddleware,
  shipmentRouteController.getRoutesByDateRange.bind(shipmentRouteController)
);

/**
 * @swagger
 * /api/shipment-route/carrier/{carrierId}:
 *   get:
 *     summary: Obtener rutas de envío por ID de transportista
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: carrierId
 *         in: path
 *         required: true
 *         description: ID del transportista para filtrar las rutas
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de rutas de envío filtradas por ID de transportista
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
shipmentRouteRouter.get(
  "/carrier/:carrierId",
  adminMiddleware,
  shipmentRouteController.getRoutesByCarrierId.bind(shipmentRouteController)
);

/**
 * @swagger
 * /api/shipment-route/shipment-status/{status}:
 *   get:
 *     summary: Obtener rutas de envío por estado de envío
 *     tags: [Rutas de Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         description: Estado del envío para filtrar las rutas
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de rutas de envío filtradas por estado de envío
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
shipmentRouteRouter.get(
  "/shipment-status/:status",
  adminMiddleware,
  shipmentRouteController.getRoutesByShipmentStatus.bind(
    shipmentRouteController
  )
);
