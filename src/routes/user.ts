import { Router } from "express";
import {
  getUserById,
  changePassword,
} from "../controllers/user/user.controller";
import { isLoggedIn } from "../middlewares/authorize";

const user = Router();

user.get("/user/:id", isLoggedIn, getUserById);
user.put("/user/changepwd", isLoggedIn, changePassword);

export { user as default };
