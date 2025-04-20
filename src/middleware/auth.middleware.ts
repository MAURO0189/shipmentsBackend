import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtUtils } from "../shared/utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
      error: error instanceof Error ? error.message : error,
    });
  }
};
