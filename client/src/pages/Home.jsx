import { useState, useEffect, useRef, useContext, useCallback } from "react";
import axios from "axios";
import { format } from "timeago.js";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import Star from "@mui/icons-material/Star";
import { AuthContext } from "../context/AuthContext";
import TransitionPanel from "../components/TransitionPanel";
import DraggableMarkerPanel from "../components/DraggableMarkerPanel";
import { CircularProgress } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const theme = {
  author: "Crimson",
  users: "DarkBlue",
  rating: "Gold",
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

  button {
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    color: ${(props) => props.theme.author};
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0;

    &:hover {
      color: ${(props) => props.theme.author};
      cursor: pointer;
    }
  }
`;

const Author = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;

  label {
    font-size: 14px;
    margin-bottom: 5px;
    color: crimson;
    border-bottom: 3px solid;
  }

  input {
    font-size: 14px;
    border: none;
    outline: none;
    margin-bottom: 5px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-content: center;
  }

  textarea {
    font-size: 14px;
    outline: none;
    padding: 5px;
  }

  Select {
    font-size: 14px;
    border: none;
    outline: none;
    margin-bottom: 5px;
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

    &:hover {
      background-color: black;
      color: crimson;
      cursor: pointer;
      transform: scale(1);
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Logout = styled.button`
  position: absolute;
  top: 0;
  right: 0;
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

  &:hover {
    background-color: black;
    color: crimson;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.2s ease-in-out;
  }
`;

const MoreIcon = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 28px;
  height: 28px;
  top: 40px;
  right: 10px;
  color: #000;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: #ccc;
    color: #000;
    border-radius: 50px;
    transform: scale(1.1);
    transition: all 0.5s ease-in-out;
  }

  @media only screen and (max-width: 769px) {
    display: flex;
  }
`;

function Home() {
  const { user } = useContext(AuthContext);
  const currentUser = user.username;
  const userId = parseInt(user._id);
  const [pins, setPins] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: -39.462891,
    latitude: 35.746512,
    zoom: 3,
  });
  const [selectedPin, setSelectedPin] = useState(null);
  const [location, setLocation] = useState(null);
  const [draggableMarker, setDraggableMarker] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const mapRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const ratingRef = useRef();

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

  const handleMarkerClick = (id, lat, lon) => {
    setSelectedPin(id);
    mapRef.current?.flyTo({ center: [lon, lat], duration: 2002 });
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setLocation({ lat: lat, lon: lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      name: currentUser,
      title: titleRef.current.value,
      description: descRef.current.value,
      rating: ratingRef.current.value,
      lat: location.lat,
      lon: location.lon,
      userId: userId,
    };
    try {
      setIsLoading(true);
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setLocation(null);
      setSelectedPin(res.data._id);
      mapRef.current?.flyTo({
        center: [location.lon, location.lat],
        duration: 2002,
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleDraggableMarker = () => {
    setDraggableMarker(!draggableMarker);
  };

  const onSelectRegion = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);

  return (
    <>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={(e) => handleAddClick(e)}
        ref={mapRef}
      >
        {pins.map((pin) => (
          <div key={pin._id}>
            <Marker
              theme={theme}
              longitude={pin.lon}
              latitude={pin.lat}
              offset={[-viewState.zoom * 0, -viewState.zoom * 3]}
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                handleMarkerClick(pin._id, pin.lat, pin.lon);
              }}
            >
              <RoomRoundedIcon
                sx={{
                  color:
                    currentUser === pin.name && userId === pin.userId
                      ? theme.author
                      : theme.users,
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
                closeOnClick={true}
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
                    {[...Array(pin.rating)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          color: theme.rating,
                          "&:hover": {
                            transform: "scale(1.1)",
                            cursor: "pointer",
                            filter: "brightness(1.5)",
                          },
                        }}
                      />
                    ))}
                  </div>
                  <Author>
                    Created by<b>&nbsp;{pin.name}</b>
                  </Author>
                  <span>{format(pin.createdAt)}</span>
                  {currentUser === pin.name && userId === pin.userId && (
                    <button
                      onClick={async () => {
                        try {
                          setIsLoading(true);
                          await axios.delete(`/pins/${pin._id}`);
                          setPins(pins.filter((p) => p._id !== pin._id));
                          setIsLoading(false);
                        } catch (err) {
                          console.log(err);
                          setIsLoading(false);
                        }
                      }}
                    >
                      {isloading && (
                        <CircularProgress
                          size={20}
                          style={{ color: `${theme.author}` }}
                        />
                      )}
                      Delete Location
                    </button>
                  )}
                </Card>
              </Popup>
            )}
          </div>
        ))}
        {location && (
          <Popup
            longitude={location.lon}
            latitude={location.lat}
            anchor="bottom-right"
            focusAfterOpen={false}
            closeOnClick={true}
            onClose={() => setLocation(null)}
            offsetTop={-10}
            offsetLeft={-20}
          >
            <Form onSubmit={handleSubmit}>
              <label>Title</label>
              <input placeholder="Enter a title" ref={titleRef} />
              <label>Review</label>
              <textarea
                placeholder="Say us something about this place."
                rows="5"
                cols="25"
                ref={descRef}
              />
              <label>Rating</label>
              <select ref={ratingRef}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit">
                {isloading && (
                  <CircularProgress
                    size={20}
                    style={{ color: `${theme.author}` }}
                  />
                )}
                Add Pin
              </button>
            </Form>
          </Popup>
        )}
        {draggableMarker && (
          <Marker
            latitude={viewState.latitude}
            longitude={viewState.longitude}
            draggable={true}
            color={theme.author}
            onDragEnd={(e) => {
              const { lng, lat } = e.lngLat;
              setLocation({ lat: lat, lon: lng });
              setDraggableMarker(false);
            }}
          ></Marker>
        )}
      </Map>
      <Logout onClick={handleLogout}>Log out</Logout>
      <MoreIcon onClick={() => setOpen(!open)}>
        <MoreVertIcon />
      </MoreIcon>
      {!open && (
        <>
          <TransitionPanel onSelectRegion={onSelectRegion} />
          <DraggableMarkerPanel handleDraggableMarker={handleDraggableMarker} />
        </>
      )}
    </>
  );
}

export default Home;
