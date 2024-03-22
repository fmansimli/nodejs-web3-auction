import { Router } from "express";
import * as admin from "../controllers/admin.controller";

import { access } from "../middlewares/access";
import { Role } from "../enums";

const router = Router();

router.post("/sign-jwt", access(Role.ADMIN), admin.createJwtKey);
router.get("/test", access(Role.ADMIN), admin.test);

export default router;
