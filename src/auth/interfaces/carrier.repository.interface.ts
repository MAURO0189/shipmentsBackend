import { Carrier } from "../../infrastructure/database/entities/Carrier.entity";
import { CreateCarrierDto } from "../../domain/dtos/CreateCarrierDto";

export interface ICarrierRepository {
  create(data: CreateCarrierDto): Promise<Carrier>;
  findById(id: number): Promise<Carrier | null>;
  findAll(): Promise<Carrier[]>;
  update(id: number, data: Partial<Carrier>): Promise<Carrier | null>;
}
