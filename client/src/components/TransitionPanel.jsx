import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: calc(10px + 1%);
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

  p {
    margin: 10px 0 10px 0;
  }

  hr {
    margin: 10px 0 10px 0;
  }

  div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 5px;

    label {
      font-size: 14px;
      margin: 0 0 0 5px;
    }
  }
`;

const TransitionPanel = ({ onSelectRegion }) => {
  return (
    <Container>
      <h3>Camera Transition</h3>
      <p>
        Select a location on the map to fly to it. You can also use the mouse.
      </p>
      <hr />
      <div>
        <input
          type="radio"
          name="region"
          defaultChecked="North America"
          onClick={() => onSelectRegion({ longitude: -100, latitude: 40 })}
        />
        <label>North America</label>
      </div>
      <div>
        <input
          type="radio"
          name="region"
          onClick={() =>
            onSelectRegion({ longitude: -55.491477, latitude: -8.783195 })
          }
        />
        <label>South America</label>
      </div>
      <div>
        <input
          type="radio"
          name="region"
          onClick={() => onSelectRegion({ longitude: 21.76, latitude: -4.04 })}
        />
        <label>Africa</label>
      </div>
      <div>
        <input
          type="radio"
          name="region"
          onClick={() =>
            onSelectRegion({ longitude: -0.12574, latitude: 51.507351 })
          }
        />
        <label>Europe</label>
      </div>
      <div>
        <input
          type="radio"
          name="region"
          onClick={() =>
            onSelectRegion({ longitude: 104.195396, latitude: 35.86166 })
          }
        />
        <label>Asia</label>
      </div>
      <div>
        <input
          type="radio"
          name="region"
          onClick={() =>
            onSelectRegion({ longitude: 133.775131, latitude: -25.274399 })
          }
        />
        <label>Australia</label>
      </div>
    </Container>
  );
};

export default TransitionPanel;
