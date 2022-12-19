import React, {useContext} from 'react'
import "./Homepage.css"
import {ThemeContext} from "../../contexts/ThemeContext";
import Slider from '../../components/Slider/Slider';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';

function Homepage() {

  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imageBase = process.env.REACT_APP_IMAGE_BASE;

  const pageNumbers = [1,2,3,4,5,6,7,8,9,10];

  //create state to store data
  const [popularMovies, setPopularMovies] = React.useState([])
  const [topRatedMovies, setTopRatedMovies] = React.useState([])
  const [page, setPage] = React.useState(1)

  //https://api.themoviedb.org/3/movie/popular?api_key=0b3e54af5e5d6be761812dcb4d890e4e&language=en-US&page=1
  //https://api.themoviedb.org/3/movie/top_rated?api_key=0b3e54af5e5d6be761812dcb4d890e4e&language=en-US&page=1
  //call api when component loads
  React.useEffect(
    //get popular movies
    ()=> {
      axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
      .then(res =>{
        console.log(res.data.results)
        //store in state
        setPopularMovies(res.data.results)
      })
      .catch(err => console.log(err))
      //get top rated movies
      axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}&page=1`)
      .then(res =>{
        console.log(res.data.results)
        setTopRatedMovies(res.data.results?.slice(0, 10))
      })
      .catch(err => console.log(err))
    }, [page]
  )

  /*}
  React.useEffect(
    ()=>{
      
    }, []
  )
  */

  const {darkMode, setDarkMode} = useContext(ThemeContext);
  return (
    <div className={darkMode?"homepage-container":"homepage-container homepage-light"}>
      <Slider />
      <div className="movies-wrapper">
        <div className="popular-container">
          <h3>Popular Movies</h3>
          <div className="popular-wrapper">
          {
            popularMovies.map(item => <MovieCard 
            key={item.id} movie={item}
              imageUrl ={item.poster_path}
              imgHeight = {"300px"}
              cardStyle = "popular-card"
            />)
          }
          {/*
            popularMovies.map(item => <p>{item.original_title}</p>)
          */}
          </div>
          <div className="page-numbers">
          </div>
          <div className="page-numbers">
            <p>Select Page</p>
            {
              pageNumbers.map(num => <p onClick={()=>setPage(num)}>{num}</p>
              )
            }
          </div>
        </div>
        <div className="top-rated-container">
          <h3>Top Rated Movies</h3>
          <div className="top-rated-wrapper">
          {
            topRatedMovies.map(item => <MovieCard 
              key={item.id} movie={item}
              imageUrl={item.backdrop_path}
              imgHeight={"100px"}
              cardStyle = "top-rated-card"
            />)
          }
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Homepage