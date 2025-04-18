import { Request, Response } from "express";
import { validate } from "class-validator";
import { ShipmentRouteService } from "../../services/ShipmentRoute.Service";
import { CreateShipmentRouteDto } from "../../domain/dtos/CreateShipmentRouteDto";
import { RouteStatus } from "../../domain/enums/route-status.enum";
import { ShipmentStatus } from "../../domain/enums/shipment-status.enum";

export class ShipmentRouteController {
  constructor(private readonly shipmentRouteService: ShipmentRouteService) {}

  async createShipmentRoute(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const createShipmentRouteDto = Object.assign(
        new CreateShipmentRouteDto(),
        req.body
      );
      const errors = await validate(createShipmentRouteDto);

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

      const result = await this.shipmentRouteService.createShipmentRoute(
        createShipmentRouteDto
      );

      res.status(201).json({
        success: true,
        message: "Ruta de envío creada con éxito",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al crear la ruta de envío",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async updateRouteStatus(req: Request, res: Response): Promise<void> {
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
      if (!Object.values(RouteStatus).includes(status)) {
        res.status(400).json({
          success: false,
          message: "Estado de ruta no válido",
          validStates: Object.values(RouteStatus),
        });
        return;
      }

      const result = await this.shipmentRouteService.updateRouteStatus(
        parseInt(id),
        status
      );

      res.status(200).json({
        success: true,
        message: "Estado de la ruta actualizado con éxito",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar el estado de la ruta",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getAllRoutes(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const routes = await this.shipmentRouteService.getAllRoutes();

      res.status(200).json({
        success: true,
        message: "Rutas obtenidas con éxito",
        data: routes,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener las rutas",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getRoutesByStatus(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const { status } = req.params;

      // Validar que el estado sea válido
      if (!Object.values(RouteStatus).includes(status as RouteStatus)) {
        res.status(400).json({
          success: false,
          message: "Estado de ruta no válido",
          validStates: Object.values(RouteStatus),
        });
        return;
      }

      const routes = await this.shipmentRouteService.getRoutesByStatus(
        status as RouteStatus
      );

      res.status(200).json({
        success: true,
        message: `Rutas con estado ${status} obtenidas con éxito`,
        data: routes,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener las rutas por estado",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getRouteByUuid(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const { uuid } = req.params;
      const route = await this.shipmentRouteService.getRouteByUuid(uuid);

      if (!route) {
        res.status(404).json({
          success: false,
          message: "Ruta no encontrada",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Ruta obtenida con éxito",
        data: route,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener la ruta",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getRoutesByShipmentId(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const shipmentId = parseInt(req.params.shipmentId);

      if (isNaN(shipmentId)) {
        res.status(400).json({
          success: false,
          message: "ID de envío inválido",
        });
        return;
      }

      const routes = await this.shipmentRouteService.getRoutesByShipmentId(
        shipmentId
      );

      res.status(200).json({
        success: true,
        message: "Rutas obtenidas con éxito",
        data: routes,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener las rutas por ID de envío",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getRoutesByDateRange(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({
          success: false,
          message: "Se requieren fechas de inicio y fin",
        });
        return;
      }

      const routes = await this.shipmentRouteService.getRoutesByDateRange(
        startDate as string,
        endDate as string
      );

      res.status(200).json({
        success: true,
        message: "Rutas filtradas por rango de fechas obtenidas con éxito",
        data: routes,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener las rutas por rango de fechas",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getRoutesByCarrierId(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const carrierId = parseInt(req.params.carrierId);

      if (isNaN(carrierId)) {
        res.status(400).json({
          success: false,
          message: "ID de transportista inválido",
        });
        return;
      }

      const routes = await this.shipmentRouteService.getRoutesByCarrierId(
        carrierId
      );

      res.status(200).json({
        success: true,
        message: "Rutas por transportista obtenidas con éxito",
        data: routes,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener las rutas por transportista",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }

  async getRoutesByShipmentStatus(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const { status } = req.params;

      // Validar que el estado sea válido
      if (!Object.values(ShipmentStatus).includes(status as ShipmentStatus)) {
        res.status(400).json({
          success: false,
          message: "Estado de envío no válido",
          validStates: Object.values(ShipmentStatus),
        });
        return;
      }

      const routes = await this.shipmentRouteService.getRoutesByShipmentStatus(
        status
      );

      res.status(200).json({
        success: true,
        message: `Rutas con envíos en estado ${status} obtenidas con éxito`,
        data: routes,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error al obtener las rutas por estado de envío",
        error: typeof error?.message === "string" ? error.message : error,
      });
    }
  }
}
