const mongoose =  require('mongoose');

const movieSchema = new mongoose.Schema({
    title:String,
    description:String,
    releaseDate:String,
    category:String,
    actors: [{ name: String }],
    image:String,
    ratings: [{value:Number }],
    comments: [{text: String}],
    addedBy: String,
})

const movies = mongoose.model("movies",movieSchema)

module.exports ={movies}