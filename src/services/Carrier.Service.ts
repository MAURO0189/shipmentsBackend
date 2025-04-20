import { CreateCarrierDto } from "../domain/dtos/CreateCarrierDto";
import { CarrierRepository } from "../domain/repositories/CarrierRepository";
import { Carrier } from "../infrastructure/database/entities/Carrier.entity";

export class CarrierService {
  private readonly carrierRepository: CarrierRepository;

  constructor() {
    this.carrierRepository = new CarrierRepository();
  }

  async createCarrier(data: CreateCarrierDto): Promise<Carrier> {
    return this.carrierRepository.create(data);
  }

  async getCarrierById(id: number): Promise<Carrier | null> {
    return this.carrierRepository.findById(id);
  }

  async getAllCarriers(): Promise<Carrier[]> {
    return this.carrierRepository.findAll();
  }

  async updateCarrier(
    id: number,
    data: Partial<Carrier>
  ): Promise<Carrier | null> {
    return this.carrierRepository.update(id, data);
  }
}
