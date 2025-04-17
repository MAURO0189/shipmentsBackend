import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import * as bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { JwtUtils } from "../../shared/utils/jwt";
import { RegisterUserDto } from "../dtos/registerUser.dto";
import { LoginUserDto } from "../dtos/loginUser.dto";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser({
    username,
    lastName,
    phoneNumber,
    email,
    password,
  }: RegisterUserDto) {
    if (!this.isValidEmail(email)) {
      throw new Error("El email no es válido");
    }

    if (!this.isPasswordStrongEnough(password)) {
      throw new Error(
        "La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, " +
          "una minúscula, un número y un carácter especial"
      );
    }

    if (await this.userRepository.findOneByEmail(email)) {
      throw new Error("El usuario ya existe");
    }

    const uuid = uuidv4();

    const hashedPassword = await bcryptjs.hash(password, 12);

    const newUser = new User();
    newUser.username = username;
    newUser.lastName = lastName;
    newUser.phoneNumber = phoneNumber;
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.uuid = uuid;

    const savedUser = await this.userRepository.create(newUser);
    const { password: _, ...userWithoutPassword } = savedUser;
    return {
      newUser: userWithoutPassword,
    };
  }

  async loginUser({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new Error("El usuario no existe");
    }
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }

    const payload = { email: user.email, sub: user.id, role: "user" };
    const token = JwtUtils.sign(payload);
    const { password: _, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword,
    };
  }

  async validateUserToken(token: string) {
    try {
      const decoded = JwtUtils.decode(token);
      const user = await this.userRepository.findOne(decoded.sub);
      if (!user) {
        throw new Error("Token inválido o usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isPasswordStrongEnough(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    return passwordRegex.test(password);
  }

  private isConfirmPasswordValid(
    password: string,
    confirmPassword: string
  ): boolean {
    return password === confirmPassword;
  }
}
