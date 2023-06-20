import { ChangeEvent, useState } from "react";
import "./App.css";

function App() {
  const [place, setPlace] = useState("");
  const [autocomplete, setAutocomplete] = useState("");

  const [t, setT] = useState(0);
  const [p, setP] = useState(0);
  const [h, setH] = useState(0);
  const [w, setW] = useState(0);
  const [error, setError] = useState("");

  const changeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
    const value = await fetch("http://127.0.0.1:5000/autocomplete", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ location: place }),
    });
    const json = await value.json();

    if (json.length === 0) {
      setAutocomplete("");
      return;
    }
    const loc = json[0];
    setAutocomplete(`${loc["name"]}, ${loc["region"]}, ${loc["country"]}`);
  };

  const getWeather = async () => {
    try {
      const value = await fetch("http://127.0.0.1:5000/weather", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ location: place }),
      });
      const json = await value.json();
      const current = json.current;
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
              changeInput(e);
            }}
          />
          {autocomplete !== "" && <p>{autocomplete}</p>}
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
