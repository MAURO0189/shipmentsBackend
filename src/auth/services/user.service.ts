import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
