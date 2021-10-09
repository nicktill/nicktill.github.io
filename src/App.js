import React from 'react';
import './App.css';
import NavBar from "./components/Navbar/Navbar"

function App() {
  return (
    <div className="App">
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
