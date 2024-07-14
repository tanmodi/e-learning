import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import SuccessStory from '../../components/successStory/successStory';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to our e-learning</h1>
          <p>
            This is a MERN stack authentication app with
            registration, login, and logout features. It uses React,
            Node.js, Express, MongoDB, and JWT.
          </p>
          <p>Learn, Grow, Excel</p>
          <button
            onClick={() => navigate('/courses')}
            className="common-btn"
          >
            Getting Started
          </button>
        </div>
      </div>
      <SuccessStory />
    </div>
  );
};

export default Home;
