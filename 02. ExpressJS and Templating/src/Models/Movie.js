import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    genre: {type: String, required: true},
    director: {type: String, required: true},
    year: { type: Number, required: true, max: new Date().getFullYear(), min: 1888 },
    rating: {type: Number, required: true, min: 0, max: 10},
    description: {type: String, required: true, maxlength: 1000},
    imgURL: {type: String, required: true, validate: function(v){return /^(http|https):\/\/.+/.test(v);}},
    cast: [{type: mongoose.Schema.Types.ObjectId, ref: "Cast"}]
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie