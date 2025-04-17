import { Admin } from "../entities/admin.entity";

export interface AdminRepository {
  findOneByEmail(email: string): Promise<Admin | null>;
  findOne(id: number): Promise<Admin | null>;
  findAll(): Promise<Admin[]>;
  create(admin: Admin): Promise<Admin>;
  update(id: number, admin: Admin): Promise<Admin | null>;
  delete(id: number): Promise<void>;
}
