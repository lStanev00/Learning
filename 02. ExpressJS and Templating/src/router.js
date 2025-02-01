import express from "express";
import { DBconnect } from "./Helpers/mongoHelpers.js";
import newMoviePost from "./controllers/newMoviePost.js";
import homeGet from "./controllers/homeGet.js";
import detailsGet from "./controllers/detailsGet.js";

await DBconnect();
const router = express.Router();

router.get('/', homeGet);
router.get('/about', (req, res) => res.render('about'));
router.get('/addMovie', (req, res) => res.render('newMovie'));
router.post(`/addMovie`, newMoviePost);
router.get('/search', (req, res) => res.render('search'));
router.get('/createCast', (req, res) => res.render('createCast'));
router.get('/attachCast/:id', (req, res) => res.render('attachCast'));
router.get('/details/:id', detailsGet);


// Handle not found request
router.use('/*', (req, res) => res.status(404).render('404'));

export default router