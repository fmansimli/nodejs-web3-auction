import { Router } from "express";
import * as auth from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { SignInDto } from "../validations/signin-dto";
import { SignUpDto } from "../validations/signup.dto";

const router = Router();

router.get("/anonymous", auth.anonymous);
router.get("/refresh", auth.refresh);

router.post("/signin", validate(SignInDto), auth.signin);
router.post("/signup", validate(SignUpDto), auth.signup);

export default router;
