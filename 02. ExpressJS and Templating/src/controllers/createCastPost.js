import Movie from "../Models/Movie.js";
import Cast from "../Models/Cast.js";

export default async function createCastPost(req, res) {
    console.log(req.body);
    req.body.age = Number(req.body.age);
    
    try {
        const newCast = new Cast(req.body);
        
        await newCast.save();
        try {
            await newMovie.validate();
            console.log("Validation Passed!");
        } catch (err) {
            console.error("Validation Error:", err.errors);
            return res.status(400).json({ error: err.errors });
        }

        res.status(201).json({ message: "Movie added successfully", data: newCast });
    } catch (err) {
        console.log(err.message);
        
        if (err.message.includes(`Actor `)) {
            res.status(400).json(err.message);
            return
        }
        let erroring = err.message.replace(`Cast validation failed: `, ``).split(`, `);
        for (let line of erroring) {
            let index = erroring.indexOf(line);
            const [ element, caseError ] = line.split(`: `);
            erroring[index] = caseError;
        }
        
        
        res.status(400).json(erroring);
    }
}