import { Router } from "express";
import homeController from "./controllers/homeController.js";
import registerController from "./controllers/registerCotroller.js";
import loginControleer from "./controllers/loginController.js";
import auth from "./controllers/authMiddleware.js";
import catalogController from "./controllers/catalogController.js";
import createCtrl from "./controllers/createCtrl.js";
import detailsCtrl from "./controllers/detailsCtrl.js";
import editCtrl from "./controllers/editCtrl.js";

const router = Router();

router.use(`/`, auth); // Auth middleware for JWT

router.use(`/`, createCtrl);
router.use(`/`, homeController);
router.use(`/`, registerController);
router.use(`/`, loginControleer);
router.use(`/`, catalogController);
router.use(`/`, detailsCtrl);
router.use(`/`, editCtrl);

router.get(`/logout`, (req, res) => {if(req.user) res.clearCookie(`auth`); res.redirect(`/`)});

router.use(`/`, (req,res) => res.render(`404`))

export default router