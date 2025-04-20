import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtUtils } from "../shared/utils/jwt";

// Aseguramos que Express sepa que `req.user` puede existir
declare global {
  namespace Express {
    interface Request {
      admin?: any;
    }
  }
}

export const adminMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "No se proporcionó token de autenticación",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = JwtUtils.verify(token);

    req.user = {
      ...decoded,
      id: decoded.sub,
    };

    if (req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Acceso denegado: se requieren permisos de administrador",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
      error: error instanceof Error ? error.message : error,
    });
  }
};
