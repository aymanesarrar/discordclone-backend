import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/response";

const decoded = (req: Request) => {
  const token = req.headers.authorization?.split(" ")[1] as string;

  return jwt.decode(token);
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const obj = decoded(req) as JWTPayload;
  if (obj.role === "ADMIN" || obj.role === "SUPERADMIN") next();
  else
    return res
      .status(401)
      .send({ type: "error", message: "this action requires admin role" });
};
const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  const obj = decoded(req) as JWTPayload;
  if (obj.role === "SUPERADMIN") next();
  else
    return res
      .status(401)
      .send({ type: "error", message: "this action requires superadmin role" });
};
export { isAdmin, isSuperAdmin, decoded };
