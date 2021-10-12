import React from 'react';
import './App.css';
import NavBar from "./components/Navbar/Navbar"
import AnimatedCursor from "react-animated-cursor"
// import Jobcard from "./components/Jobcard/Jobcard"


function App() {
  return (
    <div className="App">
      <AnimatedCursor
        innerSize={8}
        outerSize={24}
        color='255,255,255'
        outerAlpha={0}
        innerScale={0.7}
        outerScale={5}
        trailingSpeed={0}
      />
      {/* <Jobcard /> */}
      <NavBar />
      <header class="wrapper">
        <h1>nicholas tillmann</h1>
        <h5>SWE Intern @Leidos | CS @Pitt</h5>
      </header>
      <div class="wrapper">
        <div class="typing-demo">
          new features soon...
        </div>
      </div>
    </div>
  );
}
export default App;
