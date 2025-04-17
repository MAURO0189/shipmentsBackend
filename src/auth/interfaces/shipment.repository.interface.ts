import { Shipment } from "../../infrastructure/database/entities/shipment.entity";
import { CreateShipmentDto } from "../../domain/dtos/create-shipment.dto";
import { ShipmentStatus } from "../../domain/enums/shipment-status.enum";

export interface IShipmentRepository {
  create(
    data: CreateShipmentDto,
    userId: number,
    userUuid: string
  ): Promise<Shipment>;
  findByUserId(userId: number): Promise<Shipment[]>;
  findById(id: number): Promise<Shipment | null>;
  findByUuid(uuid: string): Promise<Shipment | null>;
  updateStatus(id: number, status: ShipmentStatus): Promise<Shipment | null>;
}
