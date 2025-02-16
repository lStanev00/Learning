import { Router } from "express";
import homeController from "./controllers/homeController.js";
import registerController from "./controllers/registerCotroller.js";
import loginControleer from "./controllers/loginController.js";
import auth from "./controllers/authMiddleware.js";
import createCtrl from "./controllers/createCtrl.js";
import catalogController from "./controllers/catalogCtrl.js";
import detailsCtrl from "./controllers/detailsCtrl.js";
import editCtrl from "./controllers/editCtrl.js";
import searchCtrl from "./controllers/searchCtrl.js";

const router = Router();

router.use(`/`, auth); // Auth middleware for JWT

router.use(`/`, homeController);
router.use(`/`, registerController);
router.use(`/`, loginControleer);
router.use(`/`, createCtrl);
router.use(`/`, catalogController);
router.use(`/`, detailsCtrl);
router.use(`/`, editCtrl)
router.use(`/`, searchCtrl)

router.use(`/logout`, (req, res) => {
    if(req.user) {
        res.clearCookie(`auth`);
        res.redirect(`/`);
    } else {
        res.locals.error = {messege : `You're not logged in to loggout!`}
        res.render(`home`);
    }
    });

router.use(`/`, (req, res) => res.render(`404`)); // Error route

export default router