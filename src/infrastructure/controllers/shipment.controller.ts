import { Request, Response } from "express";
import { ShipmentService } from "../../services/shipment.service";
import { CreateShipmentDto } from "../../domain/dtos/create-shipment.dto";
import { validate } from "class-validator";
import { ShipmentStatus } from "../../domain/enums/shipment-status.enum";

export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  async createShipment(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const createShipmentDto = Object.assign(
        new CreateShipmentDto(),
        req.body
      );
      const errors = await validate(createShipmentDto);

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

      const result = await this.shipmentService.createShipment(
        createShipmentDto,
        parseInt(req.user.sub),
        req.user.uuid || ""
      );

      res.status(201).json({
        success: true,
        message: "Envío registrado con éxito",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al registrar el envío",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async updateShipmentStatus(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const { id } = req.params;
      const { status } = req.body;

      // Validar que el estado sea válido
      if (!Object.values(ShipmentStatus).includes(status)) {
        res.status(400).json({
          success: false,
          message: "Estado de envío no válido",
          validStates: Object.values(ShipmentStatus),
        });
        return;
      }

      const result = await this.shipmentService.updateShipmentStatus(
        parseInt(id),
        status,
        parseInt(req.user.sub)
      );

      res.status(200).json({
        success: true,
        message: "Estado del envío actualizado con éxito",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar el estado del envío",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getUserShipments(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const shipments = await this.shipmentService.getShipmentsByUserId(
        req.user.id
      );

      res.status(200).json({
        success: true,
        message: "Envíos obtenidos con éxito",
        data: shipments,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener los envíos",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getShipmentByUuid(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const { uuid } = req.params;
      const shipment = await this.shipmentService.getShipmentByUuid(uuid);

      if (shipment && shipment.userId !== req.user.id) {
        res.status(403).json({
          success: false,
          message: "No tienes permiso para acceder a este envío",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Envío obtenido con éxito",
        data: shipment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener el envío",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getShipmentStatusHistory(req: Request, res: Response): Promise<void> {
    const shipmentId = parseInt(req.params.id);

    if (isNaN(shipmentId)) {
      res.status(400).json({ message: "Invalid shipment ID" });
    }

    try {
      const history = await this.shipmentService.getStatusHistory(shipmentId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching status history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
