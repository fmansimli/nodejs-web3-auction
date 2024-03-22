import { Router } from "express";
import * as users from "../controllers/users.controller";

import { access } from "../middlewares/access";
import { Role } from "../enums";

const router = Router();

router.get("/", access(Role.ADMIN), users.getAll);
router.delete("/", access(Role.ADMIN), users.deleteAll);

export default router;
