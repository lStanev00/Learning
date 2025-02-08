import Movie from "../Models/Movie.js";

async function editController(req, res) {
    const movie = await Movie.findById(req.params.id).lean();

    if (req.user._id != movie.creatorID || !movie) return res.redirect(`/`);
    
    res.render(`edit`, movie);
}

export default editController