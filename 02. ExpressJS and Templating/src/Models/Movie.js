import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title is required"] },
    category: { type: String, required: [true, "Category is required"] },
    genre: { type: String, required: [true, "Genre is required"] },
    director: { type: String, required: [true, "Director is required"] },
    year: { 
        type: Number, 
        required: [true, "Year is required"], 
        max: [new Date().getFullYear(), "Year cannot be in the future"], 
        min: [1888, "Year cannot be before 1888"] 
    },
    rating: { 
        type: Number, 
        required: [true, "Rating is required"], 
        min: [0, "Rating must be at least 0"], 
        max: [10, "Rating cannot be more than 10"] 
    },
    description: { type: String, required: [true, "Description is required"], maxlength: [1000, "Description is too long (max 1000 characters)"] },
    imgURL: { 
        type: String, 
        required: [true, "Image URL is required"], 
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/.+/.test(v);
            },
            message: "Movie Poster invalid image URL format"
        }
    },
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cast" }]
});

MovieSchema.pre("save", async function (next) {// Check if the movie exist already
    const exist = await mongoose.model("Movie").findOne({ title: this.title, year: this.year});

    if (exist) {
        return next(new Error("Movie already exists!"));
    }

    next();
})

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie