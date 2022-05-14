import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
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
    margin: 20px 0;
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
        cursor: pointer;
        transition: 0.2s ease-in-out;
      }
    }
  }
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <video autoPlay loop muted>
          <source src="assets/bg.mp4" type="video/mp4" />
        </video>
        <SignUp>
          <div>Voyageur</div>
          <form>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>Login</button>
          </form>
        </SignUp>
      </Wrapper>
    </Container>
  );
};

export default Register;
