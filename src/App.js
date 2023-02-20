import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Info from "./components/Info";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Info />
    </div>
  );
}

export default App;
