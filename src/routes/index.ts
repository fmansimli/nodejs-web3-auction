import { Router } from "express";

import apiv1 from "./apiv1";
import admin from "./admin";
import auth from "./auth";
import account from "./account";
import users from "./users";

const router = Router();

router.use("/v1", apiv1);
router.use("/admin", admin);
router.use("/auth", auth);
router.use("/users", users);
router.use("/account", account);

export default router;
