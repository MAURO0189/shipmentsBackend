import { Router } from "express";
import { AdminController } from "../../infrastructure/controllers/admin.controller";
import { AdminService } from "../../auth/services/admin.service";
import { TypeOrmAdminRepository } from "../../domain/repositories/typeorm-admin.repository";

export const adminRouter = Router();

const adminRepository = new TypeOrmAdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

/**
 * Documentación para las rutas de administrador (admin.routes.ts)
 */

/**
 * @swagger
 * tags:
 *   name: Administradores
 *   description: Endpoints para la gestión de administradores
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Registrar un nuevo administrador
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - AdminName
 *               - email
 *               - password
 *             properties:
 *               AdminName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Administrador registrado con éxito
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
 *                   example: Administrador registrado con éxito
 *                 data:
 *                   type: object
 *       400:
 *         description: Error al registrar el administrador
 */
adminRouter.post("/register", (req, res) => adminController.register(req, res));

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
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
 *                   example: Inicio de sesión exitoso
 *                 data:
 *                   type: object
 *       401:
 *         description: Credenciales inválidas o error al iniciar sesión
 */
adminRouter.post("/login", (req, res) => adminController.login(req, res));
