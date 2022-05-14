import Navbar from "../components/Navbar";
import Login from "../components/Login";
import styled from "styled-components";

const Container = styled.div``;

const SignUp = () => {
  return (
    <Container>
      <Navbar />
      <Login />
    </Container>
  );
};

export default SignUp;
