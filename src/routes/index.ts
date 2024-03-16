import { Router } from "express";

import apiv1 from "./apiv1";
import admin from "./admin";
import auth from "./auth";
import account from "./account";
import users from "./users";
import auctions from "./auctions";

const router = Router();

router.use("/v1", apiv1);
router.use("/admin", admin);
router.use("/account", account);
router.use("/auth", auth);
router.use("/users", users);
router.use("/auctions", auctions);

export default router;
