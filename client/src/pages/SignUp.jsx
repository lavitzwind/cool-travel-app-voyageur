import Navbar from "../components/Navbar";
import Register from "../components/Register";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.div``;

const SignUp = () => {
  return (
    <Container>
      <Navbar />
      <Register />
      <Footer />
    </Container>
  );
};

export default SignUp;
