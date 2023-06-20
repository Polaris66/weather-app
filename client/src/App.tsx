import { useState } from "react";
import "./App.css";

function App() {
  const [place, setPlace] = useState("");

  const [t, setT] = useState(0);
  const [p, setP] = useState(0);
  const [h, setH] = useState(0);
  const [w, setW] = useState(0);
  const [error, setError] = useState("");
  const APIKey = `910571e1f91f4fdca8571730231906`;
  const getWeather = async () => {
    try {
      const data = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${place}`
      );
      const value = await data.json();
      setError("");
      const current = value["current"];
      setT(current["temp_c"]);
      setP(current["precip_mm"]);
      setH(current["humidity"]);
      setW(current["wind_kph"]);
    } catch (e) {
      setError("Some Error Occured");
    }
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
          {error === "" && (
            <div>
              <p>
                Temperature: {t}&deg; <br />
              </p>
              <p>
                Humidity: {h}%; <br />
              </p>
              <p>
                Precipitation: {p}mm; <br />
              </p>
              <p>
                Wind: {w}kph <br />
              </p>
            </div>
          )}
          {error !== "" && <div>Error Occured</div>}
        </div>
        <div>Made by Polaris66</div>
      </div>
    </>
  );
}

export default App;
