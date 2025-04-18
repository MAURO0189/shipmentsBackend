import { Request, Response, NextFunction, RequestHandler } from "express";

export const adminMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
    return;
  }

  // Verificar si el usuario es administrador
  if (req.user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Acceso denegado: se requieren permisos de administrador",
    });
    return;
  }

  next();
};
