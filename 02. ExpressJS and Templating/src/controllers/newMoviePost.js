import Movie from "../Models/Movie.js";

export default async function newMoviePost(req, res){
    req.body.year = Number(req.body.year);
    req.body.rating = Number(req.body.rating);
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();

        res.status(201).json({ message: "Movie added successfully", data: newMovie });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}