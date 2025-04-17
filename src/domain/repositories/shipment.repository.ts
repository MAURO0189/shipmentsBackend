import { Repository } from "typeorm";
import { CreateShipmentDto } from "../../domain/dtos/create-shipment.dto";
import { Shipment } from "../../infrastructure/database/entities/shipment.entity";
import { AppDataSource } from "../../infrastructure/database/data-source";
import { v4 as uuidv4 } from "uuid";
import { IShipmentRepository } from "../../auth/interfaces/shipment.repository.interface";
import { ShipmentStatus } from "../enums/shipment-status.enum";

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
      weight: data.weight,
      height: data.height,
      width: data.width,
      length: data.length,
      productType: data.productType,
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

    return this.findById(id);
  }
}
