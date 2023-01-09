import React, {useState, createContext} from 'react'

export const UserContext = createContext();

function UserContextProvider(props) {

    //create state
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')

    //when component is loaded get values from localStorage
    React.useEffect(
        ()=>{
            //get info from localStorage
            setToken(localStorage.getItem('token'))
            setUser(JSON.parse(localStorage.getItem('userInfo')))

        }, []
    )

  return (
    <UserContext.Provider value={ {user, setUser, token, setToken} }>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider