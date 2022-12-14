import { Router } from "express";
import { RegisterHandler } from "../controllers/auth/register.controller";

const auth = Router();

auth.post("/register", RegisterHandler);

export { auth as default };
