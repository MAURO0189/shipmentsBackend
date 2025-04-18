import { CreateShipmentRouteDto } from "../domain/dtos/CreateShipmentRouteDto";
import { ShipmentRouteRepository } from "../domain/repositories/ShipmentRouteRepository";
import { ShipmentRepository } from "../domain/repositories/shipment.repository";
import { ShipmentRoute } from "../infrastructure/database/entities/ShipmentRoute.entity";
import { ShipmentStatus } from "../domain/enums/shipment-status.enum";
import { IShipmentRouteRepository } from "../auth/interfaces/shipment-route.repository.interface";
import { IShipmentRepository } from "../auth/interfaces/shipment.repository.interface";
import { RouteStatus } from "../domain/enums/route-status.enum";

export class ShipmentRouteService {
  private readonly shipmentRouteRepository: IShipmentRouteRepository;
  private readonly shipmentRepository: IShipmentRepository;

  constructor() {
    this.shipmentRouteRepository = new ShipmentRouteRepository();
    this.shipmentRepository = new ShipmentRepository();
  }

  async createShipmentRoute(
    data: CreateShipmentRouteDto
  ): Promise<ShipmentRoute> {
    // Validar que todos los envíos existan y estén en estado PENDING
    for (const shipmentId of data.shipmentIds) {
      const shipment = await this.shipmentRepository.findById(shipmentId);
      if (!shipment) {
        throw new Error(`El envío con ID ${shipmentId} no existe`);
      }
      if (shipment.status !== ShipmentStatus.PENDING) {
        throw new Error(
          `El envío con ID ${shipmentId} no está en estado pendiente`
        );
      }
    }

    // Crear la ruta y asignar los envíos
    const route = await this.shipmentRouteRepository.create(data);

    // Actualizar el estado de los envíos a IN_TRANSIT
    for (const shipmentId of data.shipmentIds) {
      await this.shipmentRepository.updateStatus(
        shipmentId,
        ShipmentStatus.IN_TRANSIT
      );
    }

    return route;
  }

  async getRouteById(id: number): Promise<ShipmentRoute | null> {
    return this.shipmentRouteRepository.findById(id);
  }

  async getRouteByUuid(uuid: string): Promise<ShipmentRoute | null> {
    return this.shipmentRouteRepository.findByUuid(uuid);
  }

  async getAllRoutes(): Promise<ShipmentRoute[]> {
    return this.shipmentRouteRepository.findAll();
  }

  async getRoutesByStatus(status: RouteStatus): Promise<ShipmentRoute[]> {
    return this.shipmentRouteRepository.findByStatus(status);
  }

  async updateRouteStatus(
    id: number,
    status: RouteStatus
  ): Promise<ShipmentRoute | null> {
    const route = await this.shipmentRouteRepository.findById(id);
    if (!route) {
      throw new Error("Ruta no encontrada");
    }

    const updatedRoute = await this.shipmentRouteRepository.updateStatus(
      id,
      status
    );

    // Si la ruta se marca como COMPLETED, actualizar todos los envíos a DELIVERED
    if (status === RouteStatus.COMPLETED) {
      for (const routeShipment of route.routeShipments) {
        await this.shipmentRepository.updateStatus(
          routeShipment.shipmentId,
          ShipmentStatus.DELIVERED
        );
      }
    }

    return updatedRoute;
  }

  async getRoutesByShipmentId(shipmentId: number): Promise<ShipmentRoute[]> {
    return this.shipmentRouteRepository.findByShipmentId(shipmentId);
  }

  async getRoutesByDateRange(
    startDate: string,
    endDate: string
  ): Promise<ShipmentRoute[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validar que las fechas son válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Fechas inválidas");
    }

    // Establecer la hora del fin del día para la fecha final
    end.setHours(23, 59, 59, 999);

    return this.shipmentRouteRepository.findByDateRange(start, end);
  }

  async getRoutesByCarrierId(carrierId: number): Promise<ShipmentRoute[]> {
    return this.shipmentRouteRepository.findByCarrierId(carrierId);
  }

  async getRoutesByShipmentStatus(status: string): Promise<ShipmentRoute[]> {
    // Validar que el estado del envío sea válido
    if (!Object.values(ShipmentStatus).includes(status as ShipmentStatus)) {
      throw new Error(`Estado de envío inválido: ${status}`);
    }

    return this.shipmentRouteRepository.findByShipmentStatus(status);
  }
}
