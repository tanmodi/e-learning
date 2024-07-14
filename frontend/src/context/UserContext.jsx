import { createContext, useContext,useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();



export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);


    // async function loginUser( email, password,navigate) {
    //     setBtnLoading(true);
    //     try {
    //         const { data } = await axios.post(`${server}/api/user/login`,{email,password});
            
    //         toast.success(data.message);
    //         console.log(data);
    //         localStorage.setItem("token", data.token);
    //         setUser(data.findUser);
    //         // console.log(data.user);
    //         setIsAuth(true);
    //         setBtnLoading(false);
    //         navigate("/");
    //     }
    //     catch (error) {
    //         setBtnLoading(false);
    //         setIsAuth(false);
    //         // Check if error.response exists before trying to access error.response.data.message
    //         toast.error(error.response.data.message);
    //     }
        
    // }
    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/login`, { email, password });
            
            toast.success(data.message);
            console.log(data);
            localStorage.setItem("token", data.token);
            setUser(data.findUser);
            setUserName(data.findUser.name);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error) {
            setBtnLoading(false);
            setIsAuth(false);
            // Check if error.response exists before trying to access error.response.data.message
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }
    
    return (
        <UserContext.Provider value={{ user, setUser, setIsAuth, isAuth, loginUser, btnLoading, userName, setUserName }}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
