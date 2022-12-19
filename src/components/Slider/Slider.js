import React from 'react'
import './Slider.css'
import axios from 'axios'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

function Slider() {
    //Slider needs api key, baseurl, imagebase
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imageUrl = process.env.REACT_APP_IMAGE_BASE;

    //create state for upcoming movies
    const [upcomingMovies, setUpcomingMovies] = React.useState([])

    //create state to keep track of index
    const [index, setIndex] = React.useState(0)

    //call api when this component loads(useeffect for loading)

    //https://api.themoviedb.org/3/movie/upcoming?api_key=0b3e54af5e5d6be761812dcb4d890e4e&language=en-US&page=1

    React.useEffect(
        ()=>{
            axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
            .then(res=>{
                //console.log(res.data.results)
                //store data in state
                setUpcomingMovies(res.data.results)
            })
            .catch(err => console.log(err))
        }, []
    )

    const sliderStyle={
        backgroundImage: `url("${imageUrl}${upcomingMovies[index]?.
        backdrop_path}")`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        height: "60vh",
        position: "relative"
    }

    const handleRight = () =>{
        //increase index
        //when you get to the end, wrap back to 0
        index === upcomingMovies.length - 1 ? 
        setIndex(0)
        :
        setIndex(index +1);
    }

    const handleLeft = () => {
        index === 0 ?
        setIndex(upcomingMovies.length - 1)
        :
        setIndex(index -1);
    }

  return (
    <div style= { sliderStyle }>
        <div className="slider-overlay"></div>
        <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeft}/>
        <MdKeyboardArrowRight className="right-arrow" onClick={handleRight}/>
        <div className="slider-movie-info">
            <h1>{upcomingMovies[index]?.original_title}</h1>
            <p>{upcomingMovies[index]?.overview?.slice(0, 120)}</p>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <p>See Details</p>
        </div>
    </div>
  )
}

export default Slider