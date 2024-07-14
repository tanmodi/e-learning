import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ isAuth, userName }) => {
  return (
    <header>
      <div className="logo">E-Learning</div>

      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>about</Link>
        {isAuth ? (
          <Link to={"/account"}>{userName}</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;