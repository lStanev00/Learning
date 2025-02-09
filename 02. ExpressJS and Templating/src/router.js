import express from "express";
import { DBconnect } from "./Helpers/mongoHelpers.js";
import newMoviePost from "./controllers/newMoviePost.js";
import homeGet from "./controllers/homeGet.js";
import getMovie from "./controllers/getMovie.js";
import createCastPost from "./controllers/createCastPost.js"
import attachCastPost from "./controllers/attachCastPost.js";
import { registerPost } from "./controllers/registerPost.js";
import loginPost from "./controllers/loginPost.js";
import auth from "./controllers/authMiddleware.js";
import editController from "./controllers/editController.js";
import 'dotenv/config';

await DBconnect();
const router = express.Router();

router.use(`/`, auth); // Auth middleware

router.get('/', homeGet);
router.get('/about', (req, res) => res.render('about'));
router.get('/addMovie', (req, res) => res.render('newMovie'));
router.post(`/addMovie`, newMoviePost);
router.get('/login', (req, res) => res.render('login'));
router.post('/login', loginPost);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', registerPost);
router.get('/search', (req, res) => {}); // TODO
router.get('/createCast', (req, res) => res.render('createCast'));
router.post('/createCast', createCastPost);
router.get('/attachCast/:id', getMovie);
router.post('/attachCast/:id', attachCastPost);
router.get('/details/:id', getMovie);
router.get(`/logout`, (req, res) => {res.clearCookie(`auth`); res.redirect(`/`)})
router.get(`/edit/:id`, editController)


// Handle not found request
router.use('/*', (req, res) => res.status(404).render('404'));

export default router