import React, {useContext} from 'react'
import "./Header.css"
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import {ThemeContext} from "../../contexts/ThemeContext";
import {Link} from "react-router-dom";

function Header() {

    //const darkMode = true;

    //access the global state
    const {darkMode, setDarkMode} = useContext(ThemeContext);

    const handleTheme = () =>{
        //toggle darkmode
        setDarkMode(!darkMode);
        //send value to local storage
        localStorage.setItem("darkMode", !darkMode);
    }

  return (
    <div className={darkMode?"header-container":"header-container header-light"}>
        <a href="/"className="logo">Cinetrail</a>
        <input placeholder="Search Movies..." className="search-input" type="text" />
        <div className="header-buttons-container">
            {
                darkMode?
                <div className="theme-buttons">
                    <MdOutlineLightMode className="theme-icon"
                        onClick={handleTheme}
                    />
                    <MdOutlineDarkMode className="theme-icon
                    theme-icon-active" />
                </div>
                :
                <div className="theme-buttons">
                    <MdOutlineLightMode className="theme-icon 
                    theme-icon-active"/>
                    <MdOutlineDarkMode className="theme-icon" 
                        onClick={handleTheme}
                    />
                </div>
            }
            <button className="create-account-btn">Create an Account</button>
        </div>
    </div>
  )
}

export default Header