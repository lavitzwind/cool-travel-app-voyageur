import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  video {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.4);
    z-index: 0;
  }
`;

const SignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 400px;
  max-height: 350px;
  padding: 40px;
  border-radius: 10px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 1px 1px 2.5px #000;
  backdrop-filter: blur(10px);
  visibility: visible;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    letter-spacing: 0.3rem;
    cursor: pointer;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 0 0;
    width: 100%;
    height: 100%;

    input {
      width: 80%;
      border: none;
      outline: none;
      background: none;
      border-bottom: 1px solid #000;
      font-size: 1.2rem;
      padding: 10px 5px;
      margin: 1px 0;

      ::placeholder {
        color: #444;
      }
    }

    button {
      width: 60%;
      border: none;
      outline: none;
      background: transparent;
      border-radius: 20px;
      font-size: 1.2rem;
      padding: 7px 5px;
      margin: 20px 0 5px 0;

      &:hover {
        background-color: #ccc;
        cursor: pointer;
        transition: 0.2s ease-in-out;
      }
    }

    span {
      color: rgb(203, 56, 11);
      font-size: 0.8rem;
      font-weight: bold;
      text-align: center;
    }
  }
`;

const Register = () => {
  const [loginError, setLoginError] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      setIsLoading(true);
      await axios.post("/users/register", newUser);
      setLoginError(false);
      setUserExists(false);
      setPasswordError(false);
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      if (err.response.data === "User already exists") {
        setUserExists(true);
        setPasswordError(false);
        setLoginError(false);
      } else if (
        err.response.data === "Password must be at least 6 characters"
      ) {
        setPasswordError(true);
        setUserExists(false);
        setLoginError(false);
      } else {
        setLoginError(true);
        setPasswordError(false);
        setUserExists(false);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <video autoPlay loop muted>
          <source src="assets/bg.mp4" type="video/mp4" />
        </video>
        <SignUp>
          <h2>Voyageur</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              autoComplete="off"
              ref={usernameRef}
            />
            <input
              type="email"
              placeholder="email"
              autoComplete="off"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="off"
              ref={passwordRef}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading ? (
                <CircularProgress size={20} style={{ color: "black" }} />
              ) : (
                "Register"
              )}
            </button>
            {loginError && (
              <span>
                Something went wrong. Please check for typos and try again.
              </span>
            )}
            {userExists && <span>User already exist</span>}
            {passwordError && (
              <span>Password must be at least 6 characters</span>
            )}
          </form>
        </SignUp>
      </Wrapper>
    </Container>
  );
};

export default Register;
