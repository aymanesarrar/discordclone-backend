import { Router } from "express";
import { createProfile } from "../controllers/user/profile.controller";
import { isLoggedIn } from "../middlewares/authorize";
import { isAdmin } from "../middlewares/isAdmin";

const profile = Router();

profile.post("/profile/create/:id", createProfile);

export { profile as default };
