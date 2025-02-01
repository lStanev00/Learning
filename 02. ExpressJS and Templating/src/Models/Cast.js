import mongoose from "mongoose";

const CastSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Actor name is required"], trim: true },
    age: { type: Number, required: [true, "Age is required"], min: [0, "Age must be 0 or greater"], max: [110, "Age must be 110 or less"] },
    born: { type: String, required: [true, "Birthplace is required"], trim: true },
    nameInMovie: { type: String, required: [true, "Character name in the movie is required"], trim: true },
    castImgURL: { 
        type: String, 
        required: [true, "Actor Image URL is required"], 
        validate: {
            validator: (v) => /^(http|https):\/\/.+/.test(v),
            message: "Invalid actor image URL format"
        }
    },
    movie: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

// Prevent Duplicate Actors in the Same Movie
CastSchema.pre("save", async function (next) {
    const existingCast = await mongoose.model("Cast").findOne({ 
        name: this.name, 
        nameInMovie: this.nameInMovie, 
        movie: { $in: this.movie }
    });

    if (existingCast) {
        return next(new Error(`Actor "${this.name}" already exists in this movie as "${this.nameInMovie}"!`));
    }
    
    next();
});

const Cast = mongoose.model("Cast", CastSchema);
export default Cast;
