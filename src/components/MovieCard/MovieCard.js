import React from 'react'
import './MovieCard.css'

function MovieCard({movie, imageUrl, imgHeight, cardStyle}) {

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imageBase = process.env.REACT_APP_IMAGE_BASE;

    const imageStyle={
        //backgroundImage: `url("${imageBase}${movie?.poster_path}")`,
        backgroundImage: `url("${imageBase}${imageUrl}")`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        height: imgHeight,
        width: "200px",
        position: "relative",
        margin: "10px"
    }


  return (
    <div className={cardStyle}>
        <div style={imageStyle}>
            <div className="movie-info-top">
                <p>{movie.vote_average}</p>
            </div>
             <div className="movie-info-bottom">
                <p>{movie.original_title}</p>
                <p>Rating: {movie.vote_average}</p>
            </div>
        </div>
        {cardStyle==="top-rated-card"?
        <p>{movie.title}</p>
        :
        null}
    </div>
  )
}

export default MovieCard