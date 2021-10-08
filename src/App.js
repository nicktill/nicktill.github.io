import React from 'react';
import './App.css';
import NavBar from "./components/Navbar/Navbar"

function App() {
  return (
    <div className="App">
      <NavBar />
      <header class="wrapper">
        <h1>nicholas tillmann</h1>
        <h2>personal website</h2>
      </header>
      <div class="wrapperText wrapper">
        <div class="typing-demo">
          website coming soon...
        </div>
      </div>
    </div>
  );
}
export default App;
