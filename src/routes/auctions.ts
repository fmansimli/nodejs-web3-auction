import { Router } from "express";
import * as auction from "../controllers/auction.controller";

const router = Router();

router.get("/", auction.getAll);
router.get("/:id", auction.getById);

router.post("/", auction.create);
router.post("/bulk", auction.createBulk);

router.delete("/", auction.deleteAll);

export default router;
