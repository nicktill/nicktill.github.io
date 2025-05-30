import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner";
import BackgroundChanger from "./components/BackgroundChanger";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <BackgroundChanger />
    </div>
  );
}

export default App;
