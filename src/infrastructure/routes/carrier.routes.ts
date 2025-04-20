import express from "express";
import { CarrierController } from "../controllers/Carrier.Controller";
import { CarrierService } from "../../services/Carrier.Service";
import { adminMiddleware } from "../../middleware/admin.middleware";

export const carrierRouter = express.Router();
const carrierService = new CarrierService();
const carrierController = new CarrierController(carrierService);

/**
 * @swagger
 * tags:
 *   name: Transportistas
 *   description: Endpoints para la gestión de transportistas
 */

/**
 * @swagger
 * /api/carrier/create:
 *   post:
 *     summary: Crear un nuevo transportista
 *     tags: [Transportistas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 example: Juan Pérez
 *               phone:
 *                 type: string
 *                 maxLength: 15
 *                 example: "3001234567"
 *               vehicleModel:
 *                 type: string
 *                 maxLength: 100
 *                 nullable: true
 *                 example: Renault Kangoo
 *               vehiclePlate:
 *                 type: string
 *                 maxLength: 10
 *                 nullable: true
 *                 example: ABC123
 *               isActive:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Transportista creado con éxito
 *       400:
 *         description: Error al crear el transportista
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
carrierRouter.post(
  "/create",
  adminMiddleware,
  carrierController.createCarrier.bind(carrierController)
);

/**
 * @swagger
 * /api/carrier/list:
 *   get:
 *     summary: Obtener todos los transportistas
 *     tags: [Transportistas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transportistas
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
carrierRouter.get(
  "/list",
  adminMiddleware,
  carrierController.getAllCarriers.bind(carrierController)
);

/**
 * @swagger
 * /api/carrier/detail/{id}:
 *   get:
 *     summary: Obtener un transportista por ID
 *     tags: [Transportistas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del transportista
 *     responses:
 *       200:
 *         description: Detalles del transportista
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 *       404:
 *         description: Transportista no encontrado
 */
carrierRouter.get(
  "/detail/:id",
  adminMiddleware,
  carrierController.getCarrierById.bind(carrierController)
);
