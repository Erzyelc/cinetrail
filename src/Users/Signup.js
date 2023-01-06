import React from 'react'
import './Sign.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Signup() {

    //create state tfor user info
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [success, setSuccess] = React.useState(false)

    const serverUrl = "https://cinetrail-server.herokuapp.com";

    const handleSignup = (e) =>{
        //have to prevent default on form
        e.preventDefault();
        console.log(email, password, username)
        axios.post(`${serverUrl}/users/signup`, 
        {email, password, username})
        .then( res => {
            console.log(res.data)
            //check for errors
            if(res.data.status === 409){
                alert("email already exists")
            }
            else{
                //user was created
                //clear textboxes
                setEmail('')
                setPassword('')
                setUsername('')
                setSuccess(true)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="sign-container">
        <form className="signup-form" onSubmit={handleSignup}>
            <div className="title-container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account</p>
            </div>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} id="email" required />
            </div>
            <div className="input-wrapper">
                <label htmlFor="pwd">Password</label>
                <input type="password" placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} id="pwd" required />
            </div>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username} id="username" required />
            </div>
            <div className="button-container">
                <button type="reset" className="cancel-btn">Cancel</button>
                <button type="submit" className="sign-btn">Sign up</button>
            </div>
            {
                success?
                <p>You are signed up successfully
                    <Link to="/signin" className="red-text">
                        Sign In
                    </Link>
                </p>
                :
                <p>Already have an account?</p>
            }
        </form>
    </div>
  )
}

export default Signup