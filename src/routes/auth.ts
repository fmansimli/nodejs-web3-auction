import { Router } from "express";
import * as auth from "../controllers/auth.controller";

const router = Router();

router.get("/anonymous", auth.anonymous);
router.get("/refresh", auth.refresh);

router.post("/signin", auth.signin);
router.post("/signup", auth.signup);

export default router;
