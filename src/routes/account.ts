import { Router } from "express";
import * as account from "../controllers/account.controller";
import { access } from "../middlewares/access";

const router = Router();

router.get("/profile", access(), account.profile);

export default router;
