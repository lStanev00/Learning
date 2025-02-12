import { Router } from "express";
import homeController from "./controllers/homeController.js";

const router = Router();

// router.get(`/`, (req, res) => res.send(`Hello world`));
router.use(`/`, homeController)

export default router