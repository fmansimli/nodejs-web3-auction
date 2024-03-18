import { Router } from "express";
import * as auction from "../controllers/auction.controller";
import { access } from "../middlewares/access";
import { Role } from "../enums";

const router = Router();

router.get("/", access(Role.ANON), auction.getAll);
router.get("/:id", access(Role.ANON), auction.getById);

router.post("/", access(Role.USER), auction.create);
router.post("/bulk", access(Role.USER), auction.createBulk);

router.delete("/", access(Role.USER), auction.deleteAll);

export default router;
