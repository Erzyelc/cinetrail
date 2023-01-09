import React, {useContext} from 'react'
import "./Header.css"
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import {ThemeContext} from "../../contexts/ThemeContext";
import {Link, useNavigate} from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';

function Header() {

    //activate navigate
    let navigate = useNavigate();
    //navigate('/signup')
    //const darkMode = true;
    const {user, setUser, token, setToken} = React.useContext(UserContext)
    const [profileOptions, setProfileOptions] = React.useState(false)

    //access the global state
    const {darkMode, setDarkMode} = useContext(ThemeContext);

    const handleTheme = () =>{
        //toggle darkmode
        setDarkMode(!darkMode);
        //send value to local storage
        localStorage.setItem("darkMode", !darkMode);
    }

    const handleLogout = () => {
        //clear local storage
        localStorage.clear()
        //reset user and token global state
        setUser('')
        setToken('')
        //go to homepage
        navigate('/')
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
            <div>
            {
                token?
                <div className="profile-container">
                <img src={user.image_url} className="profile-img"
                onClick={() => setProfileOptions(!profileOptions)}/>
                <p>Welcome {user.username}</p>
                {
                    profileOptions?
                    <div className="fav-div">
                        <Link to='/myfavorites'>My Favorites</Link>
                        <p className="logout" onClick={handleLogout}>Logout</p>
                    </div>
                    : null
                }
                </div>
                :
                <button className="create-account-btn" onClick={() => navigate('/signup')}>Create an Account</button>
            }
            </div>
        </div>
    </div>
  )
}

export default Header