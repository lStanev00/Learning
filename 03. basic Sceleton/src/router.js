import { Router } from "express";
import homeController from "./controllers/homeController.js";
import registerController from "./controllers/registerCotroller.js";
import loginControleer from "./controllers/loginController.js";
import auth from "./controllers/authMiddleware.js";

const router = Router();

router.use(`/`, auth); // Auth middleware for JWT

router.use(`/`, homeController);
router.use(`/`, registerController);
router.use(`/`, loginControleer);

export default router