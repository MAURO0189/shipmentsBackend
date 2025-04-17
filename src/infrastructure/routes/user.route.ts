import { Router } from "express";
import { UserController } from "../../infrastructure/controllers/user.controller";
import { UserService } from "../../auth/services/user.service";
import { TypeOrmUserRepository } from "../../domain/repositories/user-typeorm.repository";

export const userRouter = Router();

const userRepository = new TypeOrmUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Definimos las rutas para el usuario
userRouter.post("/register", (req, res) => userController.register(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));
