import Movie from "../Models/Movie.js";

export default async function getMovie(req, res) {
    const movieID = req.params.id;

    try {
        const movie = await Movie.findById(movieID).lean();
        if (!movie){
            return res.status(404).send(`Movie not found`);
        }
        
        res.render(req.url.includes(`/details/`) ? `details` : `attachCast`, { movie })
    } catch (error) {
        res.status(500).send(`Error retrieving movie details`);
    }
}