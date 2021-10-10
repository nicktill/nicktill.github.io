import React from 'react';
import './App.css';
import NavBar from "./components/Navbar/Navbar"
import AnimatedCursor from "react-animated-cursor"


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
      <NavBar />
      <header class="wrapper">
        <h1 class="opacity">nicholas tillmann</h1>
        <h5 class="opacity-two">SWE Intern @Leidos | CS @Pitt</h5>
      </header>
      <div class="wrapperText wrapper">
        <div class="typing-demo opacity-two">
          new features soon...
        </div>
      </div>
    </div>
  );
}
export default App;
