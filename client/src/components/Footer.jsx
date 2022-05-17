import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 17vh;
  background-color: #000;
  color: #fff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 25px 0 25px;

  h2 {
    color: #fff;
    font-size: 1.7rem;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: 0.3rem;
    margin-bottom: 20px;

    &:hover {
      color: #fff;
      cursor: pointer;
    }
  }

  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #5f5f5f;
  }

  div {
    font-weight: normal;
    font-size: 0.7rem;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;

    a:first-child {
      color: #fff;
      text-decoration: none;
      letter-spacing: 0.1rem;
      margin-right: 5px;
    }

    a:last-child {
      color: #fff;
      text-decoration: none;
      letter-spacing: 0.1rem;
      margin-left: 5px;
    }
  }
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <h2>Voyageur</h2>
        <hr />
        <div>
          <p>© 2022 Voyageur Technologies, Inc.</p>
          <p>
            <a href="/">Privacy Policy</a> | <a href="/">Term of use</a>
          </p>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Footer;
