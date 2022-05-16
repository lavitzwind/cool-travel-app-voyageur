import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.div``;

const SignUp = () => {
  return (
    <Container>
      <Navbar />
      <Login />
      <Footer />
    </Container>
  );
};

export default SignUp;
