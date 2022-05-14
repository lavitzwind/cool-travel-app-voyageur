import Navbar from "../components/Navbar";
import Register from "../components/Register";
import styled from "styled-components";

const Container = styled.div``;

const SignUp = () => {
  return (
    <Container>
      <Navbar />
      <Register />
    </Container>
  );
};

export default SignUp;
