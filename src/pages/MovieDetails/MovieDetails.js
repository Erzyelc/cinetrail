import React from 'react'
import './MovieDetails.css'
import {useParams} from 'react-router-dom'
import axios from 'axios'
//import { MdArrowBackIos } from 'react-icons/md';
import ReactPlayer from 'react-player'
import Rating from '../../components/Rating/Rating';
import Review from '../../components/Review/Review'


function MovieDetails() {
    const apiKey=process.env.REACT_APP_API_KEY;
    const baseUrl=process.env.REACT_APP_BASE_URL;
    const imageBase=process.env.REACT_APP_IMAGE_BASE;
    console.log("image base", imageBase);

    //create state for video link
    const [videoLink, setVideoLink] = React.useState('')
    //create state for movie info
    const [movie, setMovie] = React.useState('')
    const [rating, setRating] = React.useState(0)

    //create state for number of reviews displaying
    const [reviewNumber, setReviewNumber] = React.useState(3)
    const [totalReviews, setTotalReviews] = React.useState(0)
    

    //create state for movie reviews
    const [reviews, setReviews] = React.useState([])

    //need to get param from url
    const {movieId} = useParams();
    console.log(movieId);

    //${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}

    //call api to get video info when component loads
    React.useEffect(
        ()=>{
            //get video info
            axios.get(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`)
            .then(res =>{
               // console.log(res.data.results)
                //filter to find site "YouTube" and type "Trailer"
                //console.log(res.data.results.filter(item => item.site === "YouTube" && item.type === "Trailer"))
                const youTubeLinks = res.data.results.filter(item => item.site === "YouTube" && item.type === "Trailer")
                //pick the first one and store in state
                setVideoLink(youTubeLinks[0].key)
                //key is needed to play the video
                //https://www.youtube.com/watch?v=giXco2jaZ_4
            })
            .catch(err => console.log(err))


            //https://api.themoviedb.org/3/movie/724495?api_key=c315ba96d8b132c0836df2e55986edc6&language=en-US
            //get movie info
            axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then(res=>{
                //console.log(res.data)
                setMovie(res.data)
                setRating(res.data.vote_average / 2)
            })
      .catch(err=>console.log(err))

      //get movie reviews
            axios.get(`${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`)
            .then(res => {
              //console.log(res.data.results)
              setReviews(res.data.results)
              setTotalReviews(res.data.total_results)
            })
            .catch(err => console.log(err))
        }, []
    )


  return (
    <div className="details-container">
    {
        videoLink ?
        <div className="trailer-container">
          <ReactPlayer 
            className="trailer-player"
            url={`https://www.youtube.com/watch?v=${videoLink}`}
            width="100%"
            height="100%"  
          />
        </div>
        :
        <div className="trailer-container-blank"
           style={
            {
              backgroundImage:`url("${imageBase}${movie?.backdrop_path}")`,
              backgroundPosition:"center",
              backgroundSize:"cover"
             }}  >
            <p>No trailers released yet</p>
      </div>
    }
    <h1>{movie?.original_title}</h1>
    <Rating stars = {rating} />
    <div className="info-container">
        <img src={`${imageBase}${movie?.poster_path}`} 
             className="details-poster" />
        <div className="movie-details-info">
            <h2>{movie?.tagline}</h2>
            <h4>{movie?.overview}</h4>
            <h4>Status: <span>{movie?.status}</span></h4>
            <h4>Runtime: <span>{movie?.runtime}</span></h4>
            <h4>Budget: <span>{movie?.budget}</span></h4>
        </div>
    </div>
    <div className="review-container">
    {
      reviews.slice(0, reviewNumber).map(item => <Review review={item}/>)
    }
      {/*
        reviews.map(item => <p>{item.author}</p>)
      */}
    </div>
    {
      reviewNumber <= totalReviews ? 
      <p onClick={() => setReviewNumber(reviewNumber + 3)} className="more-reviews">Read more reviews</p>
      :
      <p onClick={() => setReviewNumber(3)} className="more-reviews">End of reviews</p>
    }
    </div>
  )
}

export default MovieDetails