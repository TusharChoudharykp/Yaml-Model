import express from "express";

import { deployModel } from "../controllers/deploy-controller";

import { isAuthenticated } from "../middlewares/auth-middleware";

const router = express.Router();

router.post("/", isAuthenticated, deployModel);

export default router;


