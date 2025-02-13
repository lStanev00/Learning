import { Router } from "express";
import homeController from "./controllers/homeController.js";
import auth from "./controllers/authMiddleware.js";

const router = Router();

router.use(`/`, auth); // Auth middleware for JWT

router.use(`/`, homeController);

export default router