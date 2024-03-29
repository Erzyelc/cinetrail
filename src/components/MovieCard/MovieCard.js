import React from 'react'
import Rating from '../Rating/Rating';
import './MovieCard.css'
import {Link} from 'react-router-dom';

function MovieCard({movie, imageUrl, imgHeight, cardStyle, bdrRadius}) {

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
        margin: "10px",
        borderRadius: bdrRadius
    }


  return (
    <Link style={{ textDecoration: 'none', color: 'white' }} to={`/moviedetails/${movie.id}`} className={cardStyle}>
        <div style={imageStyle}>
            <div className="movie-info-top">
                <Rating stars={movie.vote_average /2}/>
            </div>
             <div className="movie-info-bottom">
                <p>{movie.original_title}</p>
            </div>
        </div>
        {cardStyle==="top-rated-card"?
        <p>{movie.title}</p>
        :
        null}
    </Link>
  )
}

export default MovieCard