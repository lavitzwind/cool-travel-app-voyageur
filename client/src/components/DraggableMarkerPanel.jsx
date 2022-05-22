import styled from "styled-components";
import { tablet, mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 320px;
  right: 0;
  max-width: 320px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 12px 24px;
  margin: 20px;
  line-height: 1.3;
  font-size: 13px;
  color: #6b6b76;
  text-transform: uppercase;
  outline: none;
  ${tablet({
    maxWidth: "280px",
    top: "330px",
  })}
  ${mobile({
    maxWidth: "280px",
    top: "calc(100vh - 150px)",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  })}

  p {
    margin: 10px 0 10px 0;
    ${mobile({
      display: "none",
    })}
  }

  hr {
    margin: 10px 0 10px 0;
  }

  button {
    font-size: 14px;
    margin-bottom: 5px;
    padding: 5px;
    background-color: transparent;
    border: 0.5px solid black;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
    font-weight: bold;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({
      width: "90%",
      margin: "0 auto",
    })}

    &:hover {
      background-color: black;
      color: crimson;
      cursor: pointer;
      transform: scale(1);
      transition: all 0.2s ease-in-out;
    }
  }
`;

const DraggableMarkerPanel = ({ handleDraggableMarker }) => {
  const addMarker = () => {
    handleDraggableMarker();
  };

  return (
    <Container>
      <h3>Draggable Marker</h3>
      <p>
        Drag the marker to a location on the map to add it to the map. You can
        also double click on the map to add a marker.
      </p>
      <hr />
      <button onClick={addMarker}>Create a Draggable Marker</button>
    </Container>
  );
};

export default DraggableMarkerPanel;
