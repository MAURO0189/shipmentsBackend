import { Repository } from "typeorm";
import { AppDataSource } from "../../infrastructure/database/data-source";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class TypeOrmUserRepository implements UserRepository {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(User);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.ormRepo.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.ormRepo.find();
  }

  async create(user: User): Promise<User> {
    return await this.ormRepo.save(user);
  }

  async update(id: number, user: User): Promise<User | null> {
    await this.ormRepo.update(id, user);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
