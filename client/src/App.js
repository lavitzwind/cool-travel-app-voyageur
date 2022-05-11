import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import Star from "@mui/icons-material/Star";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 200px;
  height: 100%;

  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #1d5c63;
    border-bottom: 3px solid #1d5c63;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    margin-bottom: 5px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20px;
    margin-bottom: 5px;
  }
`;

const Author = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

function App() {
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 46,
    zoom: 4,
  });
  const [showPopup, setShowPopup] = useState(false);
  return (
    <Map
      initialViewState={viewState}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/jaruno/cl30wxtir007315p5ut8yvqpp"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
      <Marker
        longitude={2.294694}
        latitude={48.858093}
        offsetLeft={-20}
        offsetTop={-10}
        onClick={() => setShowPopup(true)}
      >
        <RoomRoundedIcon
          sx={{
            color: "#417D7A",
            fontSize: viewState.zoom * 7,
            "&:hover": {
              transform: "scale(1.1)",
              cursor: "pointer",
              filter: "brightness(1.5)",
            },
          }}
        />
      </Marker>
      <Popup
        longitude={2.294694}
        latitude={48.858093}
        anchor="bottom-right"
        onClose={() => setShowPopup(true)}
        focusAfterOpen={false}
        closeOnClick={true}
        visible={showPopup}
        offsetTop={-10}
        offsetLeft={-20}
      >
        <Card>
          <label>Place</label>
          <h4>Eiffell Tower</h4>
          <label>Review</label>
          <p>Beautiful place. I like it.</p>
          <label>Rating</label>
          <div>
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
          </div>
          <Author>
            Created by<b>&nbsp;Mille</b>
          </Author>
          <span>1 hour ago</span>
        </Card>
      </Popup>
    </Map>
  );
}

export default App;
