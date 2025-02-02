import Movie from "../Models/Movie.js";
import Cast from "../Models/Cast.js";

export default async function getMovie(req, res) {
    const movieID = req.params.id;

    try {
        const movie = await Movie.findById(movieID).populate(`cast`).lean();
        
        if (!movie){
            return res.status(404).send(`Movie not found`);
        }

        if (req.url.includes(`/details/`)){
            res.render(`details`, { movie });

        } else if (req.url.includes(`/attachCast/`)) {
            const castList = await Cast.find().lean();

            res.render(`attachCast`, { movie, castList });

        }

    } catch (error) {
        res.status(500).send(`Error retrieving movie details`);
    }
}