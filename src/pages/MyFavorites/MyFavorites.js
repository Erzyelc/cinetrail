import React from 'react'
import "./MyFavorites.css"
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios'
import MovieCard from '../../components/MovieCard/MovieCard';


function MyFavorites() {

  const serverUrl="https://cinetrail-server.herokuapp.com"

   //set up global state use CURLY BRACKETS here
   const { user, setUser, token, setToken} = React.useContext(UserContext)

   //create state for the list of favorite movies
   const [movies, setMovies] = React.useState([])

  //when page loads, get list of favorite movies for this user
  //"/favoriteMovies/user/:userid"
  React.useEffect(
    ()=>{
      //make request to get list of favorites
      axios.get(`${serverUrl}/favoriteMovies/user/${user?._id}`)
      .then(res =>{
        console.log(res.data.favorites)
        //set state with this data
        setMovies(res.data.favorites)
      })
      .catch(err => console.log(err))

    }, [user]
  )
  return (
    <div className="favorites-container">
      {
        token?
        movies.map(item =><MovieCard key={item.movie[0].id}
                            movie={item.movie[0]}
                            imageUrl={item.movie[0].poster_path}
                            imgHeight="300px"
                            cardStyle="popular-card" />)
        // movies.map(item => <p>{item.movie[0].title}</p>)
        :
        <p>Sign in to save movies</p>

      }
      
    </div>
  )
}

export default MyFavorites