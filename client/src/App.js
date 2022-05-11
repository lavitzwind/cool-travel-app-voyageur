import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";

function App() {
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 46,
    zoom: 4,
  });
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
      >
        <RoomRoundedIcon
          sx={{
            color: "tomato",
            fontSize: viewState.zoom * 7,
            "&:hover": {
              transform: "scale(1.1)",
              cursor: "pointer",
              filter: "brightness(1.5)",
            },
          }}
        />
      </Marker>
    </Map>
  );
}

export default App;
