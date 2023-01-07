import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/response";
import { decoded } from "./isAdmin";
const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  const token: string | undefined = bearer?.split(" ")[1];
  if (!token || !bearer) {
    return res.status(401).send({ type: "error", message: "token not found" });
  }
  try {
    const isValid = jwt.verify(
      token as string,
      process.env.JWTSECRET as string
    );
    if (!isValid) {
      return res.status(401).send({ type: "error", message: "unauthorized" });
    }
    const decodedJWT = decoded(req) as JWTPayload;
    if (Date.now() >= decodedJWT?.exp * 1000) {
      return res.status(401).send({ type: "error", message: "unauthorized" });
    }
    next();
  } catch (error: any) {
    return res.status(401).send({ type: "error", message: error.message });
  }
};
export { isLoggedIn };
