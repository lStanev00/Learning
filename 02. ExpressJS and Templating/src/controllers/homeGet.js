import Movie from "../Models/Movie.js";

export default async function homeGet(req, res) {
    const movies = await Movie.find().lean();
    res.render(`home`, { movies });
}
