import { Router } from "express";
import { getUserById } from "../controllers/user/user.controller";
import { isLoggedIn } from "../middlewares/authorize";

const user = Router();

user.get("/user/:id", isLoggedIn, getUserById);

export { user as default };
