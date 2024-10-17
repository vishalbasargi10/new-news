import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/utils";


export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user ? user : null);  
  }); 

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setLoggedInUser(null);
 
    setTimeout(() => {
      navigate("/login");
    }, 200);
  };

  return (
    <Container>
      <nav>
        <div className="nav-content">
          <div className="Logo">
            <h1 className="logo">NewsNow</h1>
            {loggedInUser && <h1 className="username">Hey, {loggedInUser.toUpperCase()}</h1>}
          </div>
          <div className="nav-div">
            <ul className="nav-items">
            <li className="nav-ele">
                <NavLink exact="true" to="/saved" activeclassname="active">
                  Saved
                </NavLink>
              </li>
              <li className="nav-ele">
                <NavLink exact="true" to="/" activeclassname="active">
                  Business
                </NavLink>
              </li>
              <li className="nav-ele">
                <NavLink to="/general" activeclassname="active">
                  General
                </NavLink>
              </li>
              <li className="nav-ele">
                <NavLink to="/entertainment" activeclassname="active">
                  Entertainment
                </NavLink>
              </li>
              <li className="nav-ele">
                <NavLink to="/health" activeclassname="active">
                  Health
                </NavLink>
              </li>
              <li className="nav-ele">
                <NavLink to="/science" activeclassname="active">
                  Science
                </NavLink>
              </li>
              <li className="nav-ele">
                <NavLink to="/sports" activeclassname="active">
                  Sports
                </NavLink>
              </li>
              <li className="nav-ele">
                <NavLink to="/chatnow" activeclassname="active">
                  Chat Now
                </NavLink>
              </li>
              {loggedInUser ? (
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              ) : (
                <li className="login-btn">
                  <NavLink to="/login" activeclassname="active" className="login-btn">
                    Login
                  </NavLink>
                </li>
              )}
              
            </ul>
          </div>
          
        </div>
        
      </nav>
      
    </Container>
  );
}

// Styled Components for Navbar
const Container = styled.div`
  background: linear-gradient(45deg, #1f3f6b, #1b2b5b); /* Gradient with more contrast */
  padding: 20px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    @media (max-width: 768px) {
      flex-direction: column; 
      align-items: flex-start;
    }
  }

  .logo {
    font-family: "Poppins", sans-serif;
    color: #fff;
    font-size: 32px; /* Slightly larger */
    font-weight: bold;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
    letter-spacing: 1px;
    margin-right: 15px; 

    @media (max-width: 768px) {
      margin-bottom: 0; 
    }
  }

  .nav-div {
    @media (max-width: 768px) {
      width: 100%; 
      display: flex;
      justify-content: flex-start;
    }
  }

  .nav-items {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
    }
  }

  .nav-ele {
    margin-left: 25px; /* More space between items */
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    color: #fff;
    position: relative;

    a {
      text-decoration: none;
      color: inherit;
      padding: 10px 15px;
      border-radius: 8px;
      transition: background-color 0.4s ease, transform 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
      }
    }

    .active {
      background-color: #ffcc00;
      color: #1f3f6b;
      border-radius: 8px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      margin: 8px 0;
    }
  }

  .logout-btn {
    background-color: #ff4d4f;
    margin-left:20px;
    margin-top:-6px;
    color: white;
    border: none;
    padding: 8px 11px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    transition: background-color 0.4s ease, transform 0.3s ease;

    &:hover {
      background-color: #d9363e;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(1);
    }

    @media (max-width: 768px) {
      margin-top: 10px;
    }
  }
    .login-btn {
    background-color: #90EE90;
    margin-left:8px;
    margin-top:-6px;
    color: white;
    border: none;
    padding: 8px 11px;
    padding-left:-6px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    transition: background-color 0.4s ease, transform 0.3s ease;
    text-decoration: none; 
    &:hover {
      background-color: #90EE90;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(1);
    }

    @media (max-width: 768px) {
      margin-top: 10px;
    }
  }

  .Logo {
    display: flex;
    align-items: center;
  }

  .username {
    font-size: 20px;
    color: #ffcc00; /* Gold color to make it stand out */
    margin-left: 15px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    font-family: "Poppins", sans-serif;

    @media (max-width: 768px) {
      margin-left: 0;
      margin-top: 5px;
    }
  }
`;

