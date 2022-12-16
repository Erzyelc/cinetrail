import React, {useContext} from 'react'
import "./Homepage.css"
import {ThemeContext} from "../../contexts/ThemeContext";
import Slider from '../../components/Slider/Slider';

function Homepage() {

  const {darkMode, setDarkMode} = useContext(ThemeContext);
  return (
    <div className={darkMode?"homepage-container":"homepage-container homepage-light"}>
      <Slider />
    </div>
  )
}

export default Homepage