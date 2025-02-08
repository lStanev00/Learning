import Movie from "../Models/Movie.js";

export default async function newMoviePost(req, res){
    req.body.year = Number(req.body.year);
    req.body.rating = Number(req.body.rating);
    try {
        req.body.creatorID = req.user._id;
        
        const newMovie = new Movie(req.body);
        
        await newMovie.save();

        res.status(201).json({ message: "Movie added successfully", data: newMovie });
    } catch (err) {
        if (err.message == `Movie already exists!`) {
            res.status(400).json(`Movie already exists!`);
            return
        }
        let erroring = err.message.replace(`Movie validation failed: `, ``).split(`, `);
        for (let line of erroring) {
            let index = erroring.indexOf(line);
            const [ element, caseError ] = line.split(`: `);
            erroring[index] = caseError;
        }
        
        
        res.status(400).json(erroring);
    }
}