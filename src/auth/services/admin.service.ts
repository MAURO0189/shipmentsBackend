import { Admin } from "../../domain/entities/admin.entity";
import { AdminRepository } from "../../domain/repositories/admin.repository";
import { RegisterAdminDto } from "../dtos/registerAdmin.dto";
import { LoginAdminDto } from "../dtos/loginAdmin.dto";
import * as bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { JwtUtils } from "../../shared/utils/jwt";

export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async registerAdmin({ AdminName, email, password }: RegisterAdminDto) {
    if (await this.adminRepository.findOneByEmail(email)) {
      throw new Error("El administrador ya existe");
    }

    if (!this.isValidEmail(email)) {
      throw new Error("El email no es válido");
    }

    if (!this.isPasswordStrongEnough(password)) {
      throw new Error(
        "La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, " +
          "una minúscula, un número y un carácter especial"
      );
    }

    const uuid = uuidv4();

    const hashedPassword = await bcryptjs.hash(password, 12);
    const newAdmin = new Admin();
    newAdmin.AdminName = AdminName;
    newAdmin.email = email;
    newAdmin.password = hashedPassword;
    newAdmin.uuid = uuid;

    const savedAdmin = await this.adminRepository.create(newAdmin);
    const { password: _, ...adminWithoutPassword } = savedAdmin;
    return {
      newAdmin: adminWithoutPassword,
    };
  }

  async loginAdmin({ email, password }: LoginAdminDto) {
    const admin = await this.adminRepository.findOneByEmail(email);
    if (!admin) {
      throw new Error("El administrador no existe");
    }
    if (!admin || !(await bcryptjs.compare(password, admin.password))) {
      throw new Error("Credenciales inválidas");
    }

    const payload = { email: admin.email, sub: admin.id, role: "admin" };
    const token = JwtUtils.sign(payload);
    const { password: _, ...adminWithoutPassword } = admin;
    return {
      token,
      admin: adminWithoutPassword,
    };
  }

  async validateAdminToken(token: string) {
    try {
      const decoded = JwtUtils.decode(token);
      const admin = await this.adminRepository.findOne(decoded.sub);
      if (!admin) {
        throw new Error("Token inválido o administrador no encontrado");
      }
      return admin;
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isPasswordStrongEnough(password: string): boolean {
    // Al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    return passwordRegex.test(password);
  }
}
