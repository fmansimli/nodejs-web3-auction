import { Router } from "express";
import * as users from "../controllers/users.controller";

const router = Router();

router.get("/", users.getAll);
router.delete("/", users.deleteAll);

export default router;
