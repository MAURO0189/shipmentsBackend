import { Request, Response } from "express";
import { UserService } from "../../auth/services/user.service";
import { RegisterUserDto } from "../../auth/dtos/registerUser.dto";
import { LoginUserDto } from "../../auth/dtos/loginUser.dto";
import { validate } from "class-validator";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const registerUserDto = Object.assign(new RegisterUserDto(), req.body);

      const errors = await validate(registerUserDto);

      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          message: "Errores de validación",
          errors: errors.map((err) => ({
            campo: err.property,
            errores: err.constraints ? Object.values(err.constraints) : [],
          })),
        });
      }

      const result = await this.userService.registerUser(registerUserDto);

      res.status(201).json({
        success: true,
        message: "Usuario registrado con éxito",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al registrar el usuario",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginUserDto = Object.assign(new LoginUserDto(), req.body);

      const errors = await validate(loginUserDto);

      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          message: "Errores de validación",
          errors: errors.map((err) => ({
            campo: err.property,
            errores: err.constraints ? Object.values(err.constraints) : [],
          })),
        });
      }

      const result = await this.userService.loginUser(loginUserDto);

      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: "Error al iniciar sesión",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }
}
