import React from 'react';
import './App.css';
import NavBar from "./components/Navbar/Navbar"
import AnimatedCursor from "react-animated-cursor"
// import Jobcard from "./components/Jobcard/Jobcard"
// import morphCard from './components/morphCard/morphCard';


let emailHandler = 'new features soon...';

const copyEmail = () => {
  // // add code to copy email
  // var link = "ntillmann1439@gmail.com"
  //   + "?cc=myCCaddress@example.com"
  //   + "&subject=" + encodeURIComponent("")
  //   + "&body=" + encodeURIComponent(document.getElementById('').value)
  //   ;

  // window.location.href = link;
}

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
          <h4>Incoming SWE Intern @IBM</h4>
          <h4>CS @Pitt</h4>
          <div onClick={copyEmail} class="typing-demo">
            {emailHandler}
          </div>
        </div>
      </header>
    </div >
  );
}

export default App;
