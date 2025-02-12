import Movie from "../Models/Movie.js";

async function findMovies(req, res) {
    let { title, genre, year } = req.query;
    let query = {};

    if (title != ``) query.title = { $regex: new RegExp(title, "i") };
    if (genre != ``) query.genre = { $regex: new RegExp(genre, "i") };
    if (year) query.year = year;
    

    let movies = await Movie.find(query).lean();
    
    res.render(`search`, {movies})
}

export default findMovies