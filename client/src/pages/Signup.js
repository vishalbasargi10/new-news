import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled, { keyframes } from 'styled-components';
import { handleError, handleSuccess } from '../utils/utils';

function Signup() {
  const [SignUpInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = SignUpInfo;
    if (!name || !email || !password) {
      return handleError('Enter All Credentials');
    }
    try {
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SignUpInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
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
      <StyledForm onSubmit={handleSignUp}>
        <h1>SignUp</h1>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name'
            value={SignUpInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your mail'
            value={SignUpInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password'
            value={SignUpInfo.password}
          />
        </div>
        <button>Submit</button>
        <span>
          Already have an account? <StyledLink to='/login'>Login</StyledLink>
        </span>
      </StyledForm>
      <ToastContainer />
    </MainContainer>
  );
}

export default Signup;

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
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
  overflow: hidden;
  flex-direction: column;
`;

const StyledForm = styled.form`
  background: #fff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  width: 100%;
  animation: ${fadeIn} 1s ease-in-out;
  margin-top: 20px;

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 25px;
  }

  label {
    display: block;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 16px;
    margin-bottom: 15px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #3498db;
      outline: none;
    }
  }

  button {
    width: 100%;
    padding: 10px;
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
    margin-top: 15px;
    color: #555;
    font-size: 14px;
  }

  @media screen and (max-width: 600px) {
    padding: 20px 15px;
    max-width: 90%;
  }
`;

const StyledLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
