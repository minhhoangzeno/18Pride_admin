import React, { useState } from "react";

export const AuthenContext = React.createContext();

export default function AuthenProvider(props) {
    let [user, setUser] = useState(null);

    // useEffect(() => {
    //     if (localStorage.getItem("user"))
    //         loadUser()
    // }, [])



    // let loadUser = async () => {
    //     let value = localStorage.getItem("user")
    //     let { accessToken, tokenType, ...other } = JSON.parse(value)
    //     setUser(other)
    // }

    return <AuthenContext.Provider value={{ user, setUser }} >
        {props.children}
    </AuthenContext.Provider>
}