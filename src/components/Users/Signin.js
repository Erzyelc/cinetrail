import React from 'react'
import './Sign.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext';
import {useNavigate} from 'react-router-dom'

function Signin() {

    let navigate = useNavigate();

    const serverUrl = "https://cinetrail-server.herokuapp.com";

    //set up global state use CRULY BRACKETS here
    const {user, setUser, token, setToken} = React.useContext(UserContext)

    //create state for form inputs
    const [email, setEmail] = React.useState("")
    const[password, setPassword] = React.useState('')

    const handleSignin = (e)=>{
        e.preventDefault();
        console.log(email, password)
        //make api call to login
        axios.post(`${serverUrl}/users/login`, {email, password})
        .then(res=>{
            console.log(res.data)
            //save user data and token
            setUser(res.data)
            setToken(res.data.token)
            //save values to local storage
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userInfo', JSON.stringify(res.data))
        })
        .catch(err => console.log(err))
        //navigate to homepage
        navigate('/')

    }
  return (
    <div className="sign-container">
        <form className="signup-form" onSubmit={handleSignin}>
            <div className="title-container">
                <h1>Sign In</h1>
                <p>Please fill in this form to login.</p>
            </div>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter email" 
                       onChange={(e)=>setEmail(e.target.value)}
                       value={email} id="email" required />
            </div>
            <div className="input-wrapper">
                <label htmlFor="psw">Password</label>
                <input type="password" placeholder="Enter password" 
                onChange={(e)=>setPassword(e.target.value)}
                value={password} id="psw" required />
            </div>
            
            <div className="button-container">
                <button type="reset" className="cancel-btn">Cancel</button>
                <button type="submit" className="sign-btn">Sign in</button>
            </div>
            <p className="sign-message">Don't have an account? &nbsp;
                <Link to="/signup" className="red-text">Signup</Link></p>
           
        </form>
    </div>
  )
}

export default Signin