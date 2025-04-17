import { Repository } from "typeorm";
import { AppDataSource } from "../../infrastructure/database/data-source";
import { Admin } from "../../infrastructure/database/entities/admin.entity";
import { AdminRepository } from "../../domain/repositories/admin.repository";

export class TypeOrmAdminRepository implements AdminRepository {
  private ormRepo: Repository<Admin>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Admin);
  }

  async findOneByEmail(email: string): Promise<Admin | null> {
    return await this.ormRepo.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<Admin | null> {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<Admin[]> {
    return await this.ormRepo.find();
  }

  async create(admin: Admin): Promise<Admin> {
    return await this.ormRepo.save(admin);
  }

  async update(id: number, admin: Admin): Promise<Admin | null> {
    await this.ormRepo.update(id, admin);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
