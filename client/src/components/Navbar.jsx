import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 64px;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  color: #fff;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ItemLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    height: 100%;
    margin-left: 20px;
    ${mobile({
      padding: "0 0 0 20px",
    })}

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;
      margin-right: 20px;

      h1 {
        color: #fff;
        font-size: 2rem;
        font-weight: bold;
        text-decoration: none;
        letter-spacing: 0.3rem;
        transition: 0.3s ease-in-out;
        ${mobile({
          fontSize: "1.5rem",
        })}

        &:hover {
          color: #fff;
          mouse: pointer;
          letter-spacing: 0.5rem;
          transform: scale(1.01);
          transition: 0.3s ease-in-out;
        }
      }
    }
  }
`;

const ItemRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-right: 15px;
  ${mobile({
    width: "90%",
  })}

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 25%;
    height: 100%;
    list-style: none;
    gap: 10px;
    ${tablet({
      width: "70%",
    })}
    ${mobile({
      width: "100%",
    })}

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      ${mobile({
        justifyContent: "flex-end",
      })}
    }
  }

  li:first-child {
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      outline: none;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      border-radius: 20px;
      font-weight: bold;
      width: 100%;
      color: #fff;
      padding: 8px 1px;
      font-size: 0.9rem;
      ${mobile({
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
      })}

      &:hover {
        background-color: grey;
        cursor: pointer;
      }
    }
    p {
      color: #fff;
      font-size: 0.8rem;
      font-weight: bold;
      text-decoration: none;
      letter-spacing: 0.1rem;
      transition: 0.3s ease-in-out;
      margin-left: 10px;
      ${mobile({
        display: "none",
      })}
    }
  }

  li:last-child {
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border: none;
      outline: none;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      border-radius: 20px;
      font-weight: bold;
      width: 100%;
      color: #000;
      padding: 9px 1px;
      font-size: 0.9rem;
      ${mobile({
        width: "80px",
        alignItems: "center",
        marginRight: "10px",
        fontSize: "0.8rem",
      })}

      &:hover {
        background-color: #ccc;
        cursor: pointer;
        transform: scale(1.01);
      }
    }

    p {
      color: #000;
      font-size: 0.9rem;
      font-weight: bold;
      text-decoration: none;
      letter-spacing: 0.05rem;
      transition: 0.3s ease-in-out;
      ${mobile({
        fontSize: "0.8rem",
      })}
    }
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <ItemLeft>
          <ul>
            <li>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                }}
              >
                <h1>Voyageur</h1>
              </Link>
            </li>
          </ul>
        </ItemLeft>
        <ItemRight>
          <ul>
            <li>
              <button>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                  }}
                >
                  <LoginIcon />
                  <p>Log in</p>
                </Link>
              </button>
            </li>
            <li>
              <button>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <p>Sign up</p>
                </Link>
              </button>
            </li>
          </ul>
        </ItemRight>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
