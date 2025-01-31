import mongoose from "mongoose";

export const Cast = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true, Min:0, Max: 110},
    born: {type: String, required: true},
    nameInMovie: {type: String, required: true},
    castImgURL: {type: String, requered: true, validate: function(v){return /^(http|https):\/\/.+/.test(v);}},
    movie: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}],
});