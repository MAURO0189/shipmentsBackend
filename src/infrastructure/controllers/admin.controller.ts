import { Request, Response } from "express";
import { AdminService } from "../../auth/services/admin.service";
import { RegisterAdminDto } from "../../auth/dtos/registerAdmin.dto";
import { LoginAdminDto } from "../../auth/dtos/loginAdmin.dto";

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const registerDto: RegisterAdminDto = req.body;
      const result = await this.adminService.registerAdmin(registerDto);
      res.status(201).json({
        success: true,
        message: "Administrador registrado con éxito",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginDto: LoginAdminDto = req.body;
      const result = await this.adminService.loginAdmin(loginDto);
      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error,
      });
    }
  }
}
