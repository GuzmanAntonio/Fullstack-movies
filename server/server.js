const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Movie = require('./models/Movie')

const port = 3001
app.set('trust proxy', '127.0.0.1')

mongoose.connect('mongodb://localhost/MOVIES_DB')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./config/error-handler'))

const ourFirstMovie = {title: 'Jaws', year: 1965}

//const createMovie = () => {
app.post('/api/movies', (req, res) => {

  const {title, year} = req.body
  const newMovie = {title, year}

  Movie(newMovie).save((err, savedMovie) => {
    if (err) {
      res.json({error: err})
    } else {
      res.json({msg: 'SUCCESS', data: savedMovie})
    }
  })
})

//createMovie()

app.get('/api/movies', (req, res) => {
  Movie.find((err, movies) => {
    if (err) {
      res.json({error: err})
    } else {
      res.json({msg: 'success', movies})
    }
  })
})

app.post('/api/movies/:movies_id', (req, res) => {
  const movieId = req.params.movieId
  Movie.findById({_id: movieId}, (err, movie) => {
    if(err) {
      res.json({error: err})
    } else {
      res.json({msg: `Found ${movie.title}`, movie: movie})
    }
  //res.json({ data: req.params.movie_id})
  })
})

app.get('/api/random-movie', (req, res) => {
  // Return a random movie from the DB
  // Have it return all movies first
  Movie.find((err, data) => {
    if (err){
      res.json({error: err})
    } else {
      const allMoviesArray = data
      const randomItem = allMoviesArray[Math.floor(Math.random() * allMoviesArray.length)]
      res.json({msg: 'Random Item Retrived', data: randomItem})
    }
  })
})

const server = app.listen(port, () => console.log(`Running on port: ${port} 💩`))

module.exports = server
