import { Repository } from "typeorm";
import { AppDataSource } from "../../infrastructure/database/data-source";
import { Carrier } from "../../infrastructure/database/entities/Carrier.entity";
import { CreateCarrierDto } from "../../domain/dtos/CreateCarrierDto";
import { ICarrierRepository } from "../../auth/interfaces/carrier.repository.interface";
import { v4 as uuidv4 } from "uuid";

export class CarrierRepository implements ICarrierRepository {
  private ormRepo: Repository<Carrier>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Carrier);
  }

  async create(data: CreateCarrierDto): Promise<Carrier> {
    const uuid = uuidv4();
    const now = new Date();

    const newCarrier = this.ormRepo.create({
      uuid,
      name: data.name,
      phone: data.phone,
      vehicleModel: data.vehicleModel,
      vehiclePlate: data.vehiclePlate,
      createdAt: now,
      updatedAt: now,
      isActive: true,
    });

    return this.ormRepo.save(newCarrier);
  }

  async findById(id: number): Promise<Carrier | null> {
    return this.ormRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<Carrier[]> {
    return this.ormRepo.find({ where: { isActive: true } });
  }

  async update(id: number, data: Partial<Carrier>): Promise<Carrier | null> {
    await this.ormRepo.update(id, {
      ...data,
      updatedAt: new Date(),
    });

    return this.findById(id);
  }
}
