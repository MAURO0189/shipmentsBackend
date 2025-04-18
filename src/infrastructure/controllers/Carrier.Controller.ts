import { Request, Response } from "express";
import { validate } from "class-validator";
import { CarrierService } from "../../services/Carrier.Service";
import { CreateCarrierDto } from "../../domain/dtos/CreateCarrierDto";

export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  async createCarrier(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const createCarrierDto = Object.assign(new CreateCarrierDto(), req.body);
      const errors = await validate(createCarrierDto);

      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          message: "Errores de validación",
          errors: errors.map((err) => ({
            campo: err.property,
            errores: err.constraints ? Object.values(err.constraints) : [],
          })),
        });
        return;
      }

      const result = await this.carrierService.createCarrier(createCarrierDto);

      res.status(201).json({
        success: true,
        message: "Transportista registrado con éxito",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al registrar el transportista",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getAllCarriers(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const carriers = await this.carrierService.getAllCarriers();

      res.status(200).json({
        success: true,
        message: "Transportistas obtenidos con éxito",
        data: carriers,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener los transportistas",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getCarrierById(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const { id } = req.params;
      const carrier = await this.carrierService.getCarrierById(parseInt(id));

      if (!carrier) {
        res.status(404).json({
          success: false,
          message: "Transportista no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Transportista obtenido con éxito",
        data: carrier,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener el transportista",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }
}
