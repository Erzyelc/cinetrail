import React from 'react'
import axios from 'axios'

function Genres({movieGenres}) {

    const apiKey=process.env.REACT_APP_API_KEY;
    const baseUrl=process.env.REACT_APP_BASE_URL;

    //create state to store genre list
    const [allGenres, setAllGenres] = React.useState([])

    //need to get the array of genre names and ids from api
    //https://api.themoviedb.org/3/genre/movie/list?api_key=c315ba96d8b132c0836df2e55986edc6


    React.useEffect(
        ()=>{
            axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
            .then(res=>{
                console.log(res.data.genres)
                //store in state
                setAllGenres(res.data.genres)
            })
    
            .catch(err => console.log(err))
        }, []
    )

        //create function to generate string with genre names
        const genreList = () =>{
            const glist = []
            //walk through movieGenres using map
            //look for matching id in AllGenres
            //add the name to glist
            movieGenres?.map(id => {
                for (let i= 0; i < allGenres.length; i++){
                    //check for match
                    if (id == allGenres[i].id){
                        //found a match, add name to glist
                        glist.push(allGenres[i].name)
                    }
                }
            })
            console.log(glist)
            return glist.join(", ")       

        }

  return (
    <div>
        <p>Genres:&nbsp;&nbsp;{genreList()}</p>
    </div>
  )
}

export default Genres