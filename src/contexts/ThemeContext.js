import React, {useState, createContext, useEffect} from 'react'
export const ThemeContext = createContext();

export default function ThemeContextProvider(props){
    //create the state
    const [darkMode, setDarkMode] = useState(true);

    //get value from localstorage when context loads
    useEffect(
        () => {
            //get theme from local storage
            const theme = localStorage.getItem("darkMode");
            console.log("Theme is " + theme);
            //make sure it is not null
            if(theme != null) {
                //use it
                //localStorage store everything as a string
                //we need it to be a boolean value
                //use JSON.parse if not a string
                setDarkMode(JSON.parse(theme))
            }

        }, []
    )

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

