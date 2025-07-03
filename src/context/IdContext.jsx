import React,{ useState, useContext, createContext } from "react";

export const IdContext = createContext()

export const IdContextProvider = ({children}) => {
    const [id,setId] = useState()

    return(
        <IdContext.Provider value={{id,setId}}>{children}</IdContext.Provider>
    )
}