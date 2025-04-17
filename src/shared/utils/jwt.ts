import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { config } from "dotenv";

config();

const SECRET: Secret = process.env.JWT_SECRET || "tu_clave_secreta";

export class JwtUtils {
  static sign(payload: object, expiresIn = "12h"): string {
    return jwt.sign(payload, SECRET, { expiresIn } as SignOptions);
  }

  static verify<T = any>(token: string): T {
    return jwt.verify(token, SECRET) as T;
  }

  static decode<T = any>(token: string): T | null {
    return jwt.decode(token) as T | null;
  }
}
