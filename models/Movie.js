const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema ({
    title: String,
    director: String,
    stars: [ String ],
    image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
},
    description: String,
    showtimes: [ String]
}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie;