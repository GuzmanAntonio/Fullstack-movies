import React from 'react'

const MovieList = ({movies}) => {
  return(
    <div>
      {
        movies.map((item, index) => {
          return <p key={index}>{item.title}</p>
        })
      }
    </div>
  )
}


export default MovieList