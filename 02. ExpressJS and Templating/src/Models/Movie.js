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
        max: [5, "Rating cannot be more than 5"] 
    },
    description: { type: String, required: [true, "Description is required"], maxlength: [500, "Description is too long (max 500 characters)"] },
    imgURL: { 
        type: String, 
        required: [true, "Movie Poster URL is required"], 
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/.+/.test(v);
            },
            message: "Movie Poster invalid image URL format"
        }
    },
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cast" }]
});

MovieSchema.pre("save", async function (next) {
    try {
        const exist = await mongoose.model("Movie").findOne({ title: this.title, year: this.year });

        if (exist) {
            // ✅ If only the cast is different, allow saving
            if (!arraysEqual(exist.cast, this.cast)) {
                return next();
            }
            return next(new Error("Movie already exists!"));
        }

        next();
    } catch (error) {
        next(error);
    }
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie


function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every(item => arr2.includes(item.toString()));
}