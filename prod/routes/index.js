"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiv1_1 = __importDefault(require("./apiv1"));
const admin_1 = __importDefault(require("./admin"));
const auth_1 = __importDefault(require("./auth"));
const account_1 = __importDefault(require("./account"));
const users_1 = __importDefault(require("./users"));
const auctions_1 = __importDefault(require("./auctions"));
const router = (0, express_1.Router)();
router.use("/v1", apiv1_1.default);
router.use("/admin", admin_1.default);
router.use("/account", account_1.default);
router.use("/auth", auth_1.default);
router.use("/users", users_1.default);
router.use("/auctions", auctions_1.default);
exports.default = router;
