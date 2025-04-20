import { Repository } from "typeorm";
import { CreateShipmentDto } from "../../domain/dtos/create-shipment.dto";
import { Shipment } from "../../infrastructure/database/entities/shipment.entity";
import { AppDataSource } from "../../infrastructure/database/data-source";
import { v4 as uuidv4 } from "uuid";
import { IShipmentRepository } from "../../auth/interfaces/shipment.repository.interface";
import { ShipmentStatus } from "../enums/shipment-status.enum";
import { ShipmentStatusHistory } from "../../infrastructure/database/entities/ShipmentStatusHistory.entity";

export class ShipmentRepository implements IShipmentRepository {
  private ormRepo: Repository<Shipment>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Shipment);
  }

  async create(
    data: CreateShipmentDto,
    userId: number,
    userUuid: string
  ): Promise<Shipment> {
    const uuid = uuidv4();
    const now = new Date();

    const newShipment = this.ormRepo.create({
      uuid,
      origin: data.origin,
      destination: data.destination,
      description: data.description,
      originAddress: data.originAddress,
      destinationAddress: data.destinationAddress,
      weight: data.weight,
      height: data.height,
      width: data.width,
      length: data.length,
      productType: data.productType,
      declaredValue: data.declaredValue,
      isFragile: data.isFragile || false,
      userId,
      userUuid,
      createdAt: now,
      updatedAt: now,
      status: data.status || ShipmentStatus.PENDING,
      statusUpdatedAt: new Date(),
    });

    return this.ormRepo.save(newShipment);
  }

  async findByUserId(userId: number): Promise<Shipment[]> {
    return this.ormRepo.find({ where: { userId } });
  }

  async findById(id: number): Promise<Shipment | null> {
    return this.ormRepo.findOne({ where: { id } });
  }

  async findByUuid(uuid: string): Promise<Shipment | null> {
    return this.ormRepo.findOne({ where: { uuid } });
  }

  async updateStatus(
    id: number,
    status: ShipmentStatus
  ): Promise<Shipment | null> {
    await this.ormRepo.update(id, {
      status,
      statusUpdatedAt: new Date(),
    });

    const shipment = await this.findById(id);
    if (!shipment) return null;

    const oldStatus = shipment.status;
    const newStatus = status;

    await this.ormRepo.update(id, {
      status: newStatus,
      statusUpdatedAt: new Date(),
    });

    const historyRepo = AppDataSource.getRepository(ShipmentStatusHistory);
    const history = historyRepo.create({
      shipmentId: id,
      oldStatus,
      newStatus,
      changedAt: new Date(),
    });
    await historyRepo.save(history);

    return this.findById(id);
  }

  async findStatusHistoryByShipmentId(
    shipmentId: number
  ): Promise<ShipmentStatusHistory[]> {
    const historyRepo = AppDataSource.getRepository(ShipmentStatusHistory);
    return historyRepo.find({
      where: { shipmentId },
      order: { changedAt: "DESC" },
    });
  }
}
