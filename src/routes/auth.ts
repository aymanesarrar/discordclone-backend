import { Router } from "express";
import { LoginHandler } from "../controllers/auth/login.controller";
import { RegisterHandler } from "../controllers/auth/register.controller";

const auth = Router();

auth.post("/register", RegisterHandler);
auth.post("/login", LoginHandler);

export { auth as default };
