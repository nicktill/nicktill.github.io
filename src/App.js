import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import Banner from "./components/Banner";
import BackgroundChanger from "./components/BackgroundChanger";

function App() {
  return (
    <div className="App animate__animated animate__fadeIn animate__slow">
      <NavBar />
      <Banner />
      <BackgroundChanger />
    </div>
  );
}

export default App;
