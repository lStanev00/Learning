import Cast from "../Models/Cast.js";
import Movie from "../Models/Movie.js";

export default async function attachCastPost(req, res) {
    const newCastId = req.body.cast;
    const movieID = req.params.id;
    console.log(movieID);
    
    const movie = await Movie.findById(movieID);
    movie.cast.push(newCastId);
    console.log(movie);
    await movie.save();
    
}