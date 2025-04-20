import { Router } from "express";
import { ShipmentController } from "../controllers/shipment.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { ShipmentRepository } from "../../domain/repositories/shipment.repository";
import { ShipmentService } from "../../services/shipment.service";

export const shipmentRouter = Router();

const shipmentRepository = new ShipmentRepository();
const shipmentService = new ShipmentService(shipmentRepository);
const shipmentController = new ShipmentController(shipmentService);

/**
 * @swagger
 * tags:
 *   name: Envíos
 *   description: Endpoints para la gestión de envíos
 */

/**
 * @swagger
 * /api/shipment/register:
 *   post:
 *     summary: Register a new shipment
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origin
 *               - destination
 *               - originAddress
 *               - destinationAddress
 *               - description
 *               - weight
 *               - height
 *               - width
 *               - length
 *               - productType
 *             properties:
 *               origin:
 *                 type: string
 *                 description: Origin address or location
 *               destination:
 *                 type: string
 *                 description: Destination address or location
 *               originAddress:
 *                 type: string
 *                 description: Origin address
 *               destinationAddress:
 *                 type: string
 *                 description: Destination address
 *               description:
 *                 type: string
 *                 description: Description of the shipment
 *               weight:
 *                 type: number
 *                 description: Weight in kilograms
 *               height:
 *                 type: number
 *                 description: Height in centimeters
 *               width:
 *                 type: number
 *                 description: Width in centimeters
 *               length:
 *                 type: number
 *                 description: Length in centimeters
 *               productType:
 *                 type: string
 *                 description: Type of product being shipped
 *               declaredValue:
 *                 type: number
 *                 description: Declared value of the shipment
 *               isFragile:
 *                 type: boolean
 *                 description: Indicates if the shipment contains fragile items
 *     responses:
 *       201:
 *         description: Shipment successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Shipment successfully registered
 *                 data:
 *                   type: object
 *       400:
 *         description: Error registering the shipment
 *       401:
 *         description: User not authenticated
 */
shipmentRouter.post(
  "/register",
  authMiddleware,
  shipmentController.createShipment.bind(shipmentController)
);

/**
 * @swagger
 * /api/shipment/{id}/status:
 *   patch:
 *     summary: Actualizar el estado de un envío
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del envío
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDIENTE, EN_PROCESO, EN_TRANSITO, ENTREGADO, CANCELADO]
 *     responses:
 *       200:
 *         description: Estado del envío actualizado con éxito
 *       400:
 *         description: Error al actualizar el estado del envío
 *       401:
 *         description: Usuario no autenticado
 */

shipmentRouter.patch(
  "/:id/status",
  authMiddleware,
  shipmentController.updateShipmentStatus.bind(shipmentController)
);

/**
 * @swagger
 * /api/shipment/user-shipments:
 *   get:
 *     summary: Obtener todos los envíos del usuario autenticado
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Envíos obtenidos con éxito
 *       400:
 *         description: Error al obtener los envíos
 *       401:
 *         description: Usuario no autenticado
 */

shipmentRouter.get(
  "/user-shipments",
  authMiddleware,
  shipmentController.getUserShipments.bind(shipmentController)
);

/**
 * @swagger
 * /api/shipment/{uuid}:
 *   get:
 *     summary: Obtener un envío por UUID
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID del envío
 *     responses:
 *       200:
 *         description: Envío obtenido con éxito
 *       400:
 *         description: Error al obtener el envío
 *       401:
 *         description: Usuario no autenticado
 */
shipmentRouter.get(
  "/:uuid",
  authMiddleware,
  shipmentController.getShipmentByUuid.bind(shipmentController)
);

/**
 * @swagger
 * /api/shipment/{id}/history:
 *   get:
 *     summary: Obtener el historial de estado de un envío
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del envío
 *     responses:
 *       200:
 *         description: Historial de estado obtenido con éxito
 *       400:
 *         description: Error al obtener el historial de estado
 *       401:
 *         description: Usuario no autenticado
 */
shipmentRouter.get(
  "/shipments/:id/history",
  authMiddleware,
  shipmentController.getShipmentStatusHistory.bind(shipmentController)
);
