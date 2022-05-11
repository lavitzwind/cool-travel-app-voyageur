import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import Star from "@mui/icons-material/Star";

const theme = {
  author: "Crimson",
  users: "DarkBlue",
};

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
    color: ${(props) => props.theme.author};
    border-bottom: 3px solid;
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
  const currentUser = "Marcus";
  const [pins, setPins] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 46,
    zoom: 4,
  });
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setSelectedPin(id);
  };

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/jaruno/cl30wxtir007315p5ut8yvqpp"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
      {pins.map((pin) => (
        <div key={pin._id}>
          <Marker
            theme={theme}
            longitude={pin.lon}
            latitude={pin.lat}
            offsetLeft={-20}
            offsetTop={-10}
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              handleMarkerClick(pin._id);
            }}
          >
            <RoomRoundedIcon
              sx={{
                color: currentUser === pin.name ? theme.author : theme.users,
                fontSize: viewState.zoom * 7,
                "&:hover": {
                  transform: "scale(1.1)",
                  cursor: "pointer",
                  filter: "brightness(1.5)",
                },
              }}
            />
          </Marker>
          {pin._id === selectedPin && (
            <Popup
              longitude={pin.lon}
              latitude={pin.lat}
              anchor="bottom-right"
              focusAfterOpen={false}
              onClose={() => setSelectedPin(null)}
              offsetTop={-10}
              offsetLeft={-20}
            >
              <Card theme={theme}>
                <label>Place</label>
                <h4>{pin.title}</h4>
                <label>Review</label>
                <p>{pin.description}</p>
                <label>Rating</label>
                <div>
                  <Star style={{ color: "gold" }} />
                  <Star style={{ color: "gold" }} />
                  <Star style={{ color: "gold" }} />
                  <Star style={{ color: "gold" }} />
                  <Star style={{ color: "gold" }} />
                </div>
                <Author>
                  Created by<b>&nbsp;{pin.name}</b>
                </Author>
                <span>{format(pin.createdAt)}</span>
              </Card>
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}

export default App;
