import { Router } from "express";
import {
  createProfile,
  getProfileByUserId,
  updateProfile,
} from "../controllers/user/profile.controller";
import { isLoggedIn } from "../middlewares/authorize";
import { isAdmin } from "../middlewares/isAdmin";

const profile = Router();

profile.post("/profile/create/:id", isLoggedIn, createProfile);
profile.put("/profile/update/:id", isLoggedIn, updateProfile);
profile.get("/profile/:id", isLoggedIn, getProfileByUserId);

export { profile as default };
