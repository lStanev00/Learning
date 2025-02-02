import Movie from "../Models/Movie.js";

export default async function attachCastPost(req, res) {
    const newCastId = req.body.cast;
    const movieID = req.params.id;
    
    const movie = await Movie.findById(movieID);
    movie.cast.push(newCastId);
    await movie.save();
    
}