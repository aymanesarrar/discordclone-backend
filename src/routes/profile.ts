import { Router } from "express";
import { isLoggedIn } from "../middlewares/authorize";
import { isAdmin } from "../middlewares/isAdmin";

const profile = Router();

profile.get("/profile/me", isLoggedIn, () => console.log("test"));

export { profile as default };
