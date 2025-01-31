import mongoose from "mongoose";

const Movie = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    genre: {type: String, required: true},
    director: {type: String, required: true},
    year: { type: Number, required: true, max: new Date().getFullYear(), min: 1888 },
    rateing: {type: Number, required: true, min: 0, max: 10},
    description: {type: String, required: true, maxlength: 200},
    imgURL: {type: String, requered: true, validate: function(v){return /^(http|https):\/\/.+/.test(v);}},
    cast: [{type: mongoose.Schema.Types.ObjectId, ref: "Cast"}]
});

export default Movie