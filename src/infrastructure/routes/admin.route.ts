import { Router } from "express";
import { AdminController } from "../../infrastructure/controllers/admin.controller";
import { AdminService } from "../../auth/services/admin.service";
import { TypeOrmAdminRepository } from "../../domain/repositories/typeorm-admin.repository";

export const adminRouter = Router();

const adminRepository = new TypeOrmAdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

// Definimos las rutas
adminRouter.post("/register", (req, res) => adminController.register(req, res));
adminRouter.post("/login", (req, res) => adminController.login(req, res));
