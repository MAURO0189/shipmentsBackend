import { ShipmentRoute } from "../../infrastructure/database/entities/ShipmentRoute.entity";
import { CreateShipmentRouteDto } from "../../domain/dtos/CreateShipmentRouteDto";
import { RouteStatus } from "../../domain/enums/route-status.enum";

export interface IShipmentRouteRepository {
  create(data: CreateShipmentRouteDto): Promise<ShipmentRoute>;
  findById(id: number): Promise<ShipmentRoute | null>;
  findByUuid(uuid: string): Promise<ShipmentRoute | null>;
  findAll(): Promise<ShipmentRoute[]>;
  findByStatus(status: RouteStatus): Promise<ShipmentRoute[]>;
  updateStatus(id: number, status: RouteStatus): Promise<ShipmentRoute | null>;
  findByShipmentId(shipmentId: number): Promise<ShipmentRoute[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<ShipmentRoute[]>;
  findByCarrierId(carrierId: number): Promise<ShipmentRoute[]>;
  findByShipmentStatus(status: string): Promise<ShipmentRoute[]>;
}
