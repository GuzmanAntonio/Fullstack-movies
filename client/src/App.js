import React, {Component} from 'react'
import Header from './Header'
import $ from 'jquery'
import MovieList from './MovieList'

class App extends Component {
  state = {
    movies: undefined,
    title: undefined,
    year: undefined
  }

  componentDidMount() {
    this.loadMoviesFromServer()
  }

  loadMoviesFromServer = () => {
    $.ajax({
      url:'/api/movies',
      method: 'GET'
    }).done((response) => {
      console.log(response)
      this.setState({movies: response.movies})
    })
  }

  submitMovieToServer = () => {
    const newMovie = {
      title: this.state.title,
      year: this.state.year
    }
    $.ajax({
      url:'/api/movies',
      method: 'POST',
      data: newMovie
    }).done((response) => {
      console.log(response)
        this.loadMoviesFromServer() // Will refresh movies saved in our state
    })
  }

  updateTitle = (e) => this.setState({title: e.target.value})
  updateYear = (e) => this.setState({year: e.target.value})

  render(){
    return(
      <div>
      <Header />
      <form>
        <label>Insert Movie Title:</label>
        <input type='text' onChange={this.updateTitle} />

        <label>Insert Your Movie</label>
        <input type='number' onChange={this.updateYear} />

        <button type='button' onClick={this.submitMovieToServer}>Submit</button>

      </form>
      {
        this.state.movies
        ? <MovieList movies={this.state.movies} />
        : 'No Movies'
      }
    </div>
    )
  }
}
export default App