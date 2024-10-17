import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import { handleError, handleSuccess } from '../utils/utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: 'guest@gmail.com',
    password: '12345',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Enter All Credentials');
    }
    try {
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <MainContainer>
      <StyledForm onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your mail'
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password'
            value={loginInfo.password}
          />
        </div>
        <button type='submit'>Submit</button>
        <span>
          Don't have an account? <StyledLink to='/signup'>SignUp</StyledLink>
        </span>
      </StyledForm>
      
    </MainContainer>
  );
}

export default Login;

// Styled-components

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;  /* Use full height of viewport */
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
  overflow: hidden;  /* Prevent scroll */
`;

const StyledForm = styled.form`
  background: #fff;
  padding: 40px 60px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  animation: ${fadeIn} 1s ease-in-out;
  margin: 0;  /* Ensure no margin causing scroll */

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }

  label {
    display: block;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 16px;
    margin-bottom: 20px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #3498db;
      outline: none;
    }
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #3498db;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }
  }

  span {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #555;
    font-size: 14px;
  }

  @media screen and (max-width: 600px) {
    padding: 30px 20px;
    max-width: 90%;
  }
`;

// Styled Link
const StyledLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
