const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie");

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then((moviesFromDB) => {
            console.log('Retrieved movies from DB:', moviesFromDB);
            res.render('movies', { movies: moviesFromDB })
        })
        .catch(error => {
            console.log('error while retrieving movies from DB', error)
            next(error)
        })
})

router.get('/movie-new', (req, res, next) => {
    res.render('movie-new')
})

router.post('/movies', (req, res, next) => {
    const { title, director, description, stars, image, showtimes } = req.body

    Movie.create({title, director, description, stars, image, showtimes})
    .then((createdMovie) => {
           res.redirect('/movies')
    })
    .catch(error => {
        next(error)
    })
})
router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
    .then(movie=> {
        res.render('movie-details', {movie: movie})
    })
    .catch(error => {
        console.log('error while retrieving movies from DB', error)
        next(error)
    })
})

router.get('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
    .then(movieToEdit => {
        res.render('movie-edit', {movie: movieToEdit})
    })
    .catch(error => next(error))
})

router.post('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id
    const { title, director, description, stars, image, showtimes } = req.body

    Movie.findByIdAndUpdate(id, {
        title, director, description, stars, image, showtimes
    },{ new: true })
    .then(updatedMovie => {
        res.redirect(`/movies/${id}`)
    })
    .catch(error => next(error))
})

module.exports = router;