import { useState } from "react";
import "./App.css";

function App() {
  const [place, setPlace] = useState("");

  const [temperature, setTemperature] = useState(0);
  const APIKey = `910571e1f91f4fdca8571730231906`;
  const getWeather = async () => {
    const data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${place}`
    );
    const value = await data.json();
    setTemperature(value["current"]["temp_c"]);
  };

  return (
    <>
      <div className="container">
        <div className="search">
          <input
            type="text"
            placeholder="Enter Place"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
          <button
            onClick={() => {
              getWeather();
            }}
          >
            Get Weather
          </button>
        </div>

        <div className="result">
          <p>Temperature: {temperature}&deg;</p>
        </div>
      </div>
    </>
  );
}

export default App;
