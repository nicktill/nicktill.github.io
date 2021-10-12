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


      <header>
        <div class="positionContent">
          <h1 class="coolAnimation small">nicktill</h1>
          <h3>nicholas tillmann</h3>
          <div positionContentInfo></div>
          <h4>SWE Intern @Leidos | CS @Pitt</h4>
          <div class="typing-demo">
            new features soon...
          </div>
        </div>
      </header>
    </div >
  );
}
export default App;
