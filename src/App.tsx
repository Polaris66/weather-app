import useState from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <div className="search">
          <input type="text" placeholder="Enter Place" />
        </div>
        <div className="result">
          <p>Tempurature: 30&deg;C</p>
        </div>
      </div>
    </>
  );
}

export default App;
