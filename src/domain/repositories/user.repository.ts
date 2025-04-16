import { User } from "../entities/user.entity";

export interface UserRepository {
  findOneByEmail(email: string): Promise<User | null>;
  findOne(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User | null>;
  delete(id: number): Promise<void>;
}
