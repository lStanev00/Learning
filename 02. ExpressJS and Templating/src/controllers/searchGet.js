import Movie from "../Models/Movie.js";

async function getSearch(req, res) {
    const movies = await Movie.find().lean();
    res.render(`search`, {movies});
}

export default getSearch;