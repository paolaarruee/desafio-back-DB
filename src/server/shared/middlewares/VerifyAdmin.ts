import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Token de autenticação não fornecido.",
    });
  }

  const jwtData = JWTService.verify(token);
  if (jwtData === "JWT_SECRET_NOT_FOUND" || jwtData === "INVALID_TOKEN") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Token inválido.",
    });
  }

  res.locals.jwtData = jwtData;

  if (!jwtData.admin) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Apenas usuários administradores podem criar pautas.",
    });
  }

  next();
};
