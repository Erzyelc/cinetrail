import React from 'react'
import './MovieDetails.css'
import {useParams} from 'react-router-dom'
import axios from 'axios'
//import { MdArrowBackIos } from 'react-icons/md';
import ReactPlayer from 'react-player'
import Rating from '../../components/Rating/Rating';
import Review from '../../components/Review/Review';
import { UserContext } from '../../contexts/UserContext';


function MovieDetails() {

    const serverUrl = "https://cinetrail-server.herokuapp.com";

    const {user, setUser, token, setToken} = React.useContext(UserContext)

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

    //create state to keep track of added or not to favorites
    const [added, setAdded] = React.useState(false)

    //need to get param from url
    const {movieId} = useParams();
    console.log(movieId);

    //${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}

    React.useEffect(
      ()=>{
          //make request to see if this movie has been 
          //added by this user
          axios.post(`${serverUrl}/favoriteMovies/search`,
          {
              user_id: user?._id,
              tmdb_id: movie?.id
          })
          .then(res =>{
              console.log('search result')
              console.log(res.data)
              //change added if necessary
              if (res.data){
                  setAdded(true)
              }
          })

      }, [user, movie]
  )

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
        }, [user]
    )

    const addToFavorites = () => {
        //check if user is logged in
        if (!token) {
          alert('Please login to save favorites')
        }else{
          //make a request to save movie
          axios.post(`${serverUrl}/favoriteMovies`, {
            movie_id: movie.id,
            user_id: user._id
          })
          .then(res => {
            console.log(res.data)
            setAdded(true)
          })
        }
    }
    
    const removeFromFavorites = () => {
        //make delete request
        axios.delete(`${serverUrl}/favoriteMovies/${user._id}/${movie.id}`)
        .then(res => {
          console.log(res)
          setAdded(false)
        })
        .catch(err => console.log(err))
    }


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
    {
      added?
      <button className="btn-remove" onClick={removeFromFavorites}>Remove from favorites</button>
      :
      <button className="btn-add" onClick={addToFavorites}>Add to favorites</button>
    }
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