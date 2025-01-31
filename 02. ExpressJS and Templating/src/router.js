import express from "express";
import mongoose from "mongoose";
import newMoviePost from "./controllers/newMoviePost.js";

const router = express.Router();

router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get('/addMovie', (req, res) => res.render('newMovie'));
router.post(`/addMovie`, newMoviePost);
router.get('/search', (req, res) => res.render('search'));
router.get('/details/:id', (req, res) => {
    res.render('details')
});

// Handle not found request
router.use('/*', (req, res) => res.status(404).render('404'));

export default router