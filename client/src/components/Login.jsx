import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

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
    filter: brightness(0.5);
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

  div {
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
      margin: 20px 0;

      &:hover {
        background-color: #ccc;
        transition: 0.2s ease-in-out;
      }
    }
  }
`;

const Login = () => {
  const { isFetching, dispatch, error } = useContext(AuthContext);
  const username = useRef();
  const password = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <Container>
      <Wrapper>
        <video autoPlay loop muted>
          <source src="assets/bg.mp4" type="video/mp4" />
        </video>
        <SignUp>
          <div>Voyageur</div>
          <form onSubmit={handleClick}>
            <input type="text" placeholder="username" ref={username} />
            <input type="password" placeholder="password" ref={password} />
            <button
              type="submit"
              disabled={isFetching}
              style={{ cursor: isFetching ? "not-allowed" : "pointer" }}
            >
              {isFetching ? (
                <CircularProgress size={20} style={{ color: "black" }} />
              ) : (
                "Login"
              )}
            </button>
          </form>
          {error && (
            <span style={{ color: "red", margin: "0 0 20px 10px" }}>
              Username or password is incorrect
            </span>
          )}
          <p>
            Don't have an account?
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "lightblue",
                fontWeight: "bold",
                letterSpacing: "0.1rem",
                transition: "0.3s ease-in-out",
                marginLeft: "5px",
              }}
            >
              Sign up
            </Link>
          </p>
        </SignUp>
      </Wrapper>
    </Container>
  );
};

export default Login;
