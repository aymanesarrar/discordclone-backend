import { Router } from "express";
import {
  createProfile,
  updateProfile,
} from "../controllers/user/profile.controller";
import { isLoggedIn } from "../middlewares/authorize";
import { isAdmin } from "../middlewares/isAdmin";

const profile = Router();

profile.post("/profile/create/:id", createProfile);
profile.put("/profile/update/:id", updateProfile);

export { profile as default };
