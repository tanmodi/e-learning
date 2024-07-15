// import React from "react";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/header/Header";
// import Home from "./pages/home/home";
// import About from "./pages/about/About";
// import Account from "./pages/account/Account";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Verify from "./pages/auth/Verify";
// import Footer from "./components/footer/Footer";
// import { UserData, userVerifyLogin } from "./context/UserContext";

// const App = async () => {
//     let { user, isAuth, userName } = UserData();
//     console.log(isAuth);
//     if (isAuth === false) {
//         console.log("userVerifyLogin"); 
//         const data = await userVerifyLogin();
//         user = data.user;
//         isAuth = data.isAuth;
//         userName = data.userName;
//         console.log(data);
//     }
    
    
//     return (
//         <>
//             <BrowserRouter>
//                 <Header isAuth={isAuth} userName={userName} />

//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route
//                         path="/account"
//                         element={isAuth ? <Account user={user} /> : <Login />}
//                     />
//                     <Route
//                         path="/login"
//                         element={isAuth ? <Home /> : <Login />}
//                     />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/verify" element={<Verify />} />
//                     <Route path="*" element={<h1>Not Found</h1>} />
//                 </Routes>
//                 <Footer />
//             </BrowserRouter>
//         </>
//     );
// };

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./components/footer/Footer";
import { UserData, userVerifyLogin } from "./context/UserContext";

const App = () => {
    const initialData = UserData();
    const [user, setUser] = useState(initialData.user);
    const [isAuth, setIsAuth] = useState(initialData.isAuth);
    const [userName, setUserName] = useState(initialData.userName);

    useEffect(() => {
        const verifyLogin = async () => {
            if (!initialData.isAuth) {
                console.log("userVerifyLogin");
                const data = await userVerifyLogin();
                setUser(data.user);
                setIsAuth(data.isAuth);
                setUserName(data.userName);
                console.log(data);
            }
        };

        verifyLogin();
    }, [initialData]);

    return (
        <>
            <BrowserRouter>
                <Header isAuth={isAuth} userName={userName} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/account"
                        element={isAuth ? <Account user={user} /> : <Login />}
                    />
                    <Route
                        path="/login"
                        element={isAuth ? <Home /> : <Login />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default App;

