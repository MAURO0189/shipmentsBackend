import { Router } from "express";
import { UserController } from "../../infrastructure/controllers/user.controller";
import { UserService } from "../../auth/services/user.service";
import { TypeOrmUserRepository } from "../../domain/repositories/user-typeorm.repository";

export const userRouter = Router();

const userRepository = new TypeOrmUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/**
 * Documentación para las rutas de usuario (user.routes.ts)
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
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
 *                   example: Usuario registrado con éxito
 *                 data:
 *                   type: object
 *       400:
 *         description: Error al registrar el usuario
 */

userRouter.post("/register", (req, res) => userController.register(req, res));

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión como usuario
 *     tags: [Usuarios]
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
 *                   properties:
 *                     token:
 *                       type: string
 *       401:
 *         description: Error al iniciar sesión
 */
userRouter.post("/login", (req, res) => userController.login(req, res));
