import React, {useContext} from 'react'
import "./Homepage.css"
import {ThemeContext} from "../../contexts/ThemeContext";

function Homepage() {

  const {darkMode, setDarkMode} = useContext(ThemeContext);
  return (
    <div className={darkMode?"homepage-container":"homepage-container homepage-light"}>Homepage</div>
  )
}

export default Homepage