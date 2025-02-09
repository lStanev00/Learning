import Movie from "../Models/Movie.js";

async function deletePost(req, res) {
    const movie = await Movie.findById(req.params?.id);
    const ownerID = movie.creatorID;
    const logedUser = req.user._id;       

    if (logedUser != ownerID) return res.redirect(`/`);

    let status = Number; 
    let response = {
        message : String
    };
    if(movie) {
        status = 200;
        response.message = `Movie: ${movie.title} deleted!`
        await movie?.deleteOne();
    } else {
        status = 404;
        response.message = `Internal server error!\n${movie.title} cannot be found!`;
    }
    res.status(status).send(response);
}


export default deletePost;