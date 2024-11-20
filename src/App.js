import logo from './logo.svg';
import './App.css';
import React from "react";

function App() {
  const sendCommand = async (command) => {
    try {
      const response = await fetch(`http://<YOUR_PC_IP>:5000/${command}`, {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending command:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img src={logo} className="App-logo" alt="logo" />
       <h1>Huss is a bitcht</h1>
       <p>This is your media sharing platform!</p>
      
      <h1>Media Controller</h1>
      <button onClick={() => sendCommand("play-pause")} style={{ margin: "10px" }}>
        Play/Pause
      </button>
      <button onClick={() => sendCommand("next")} style={{ margin: "10px" }}>
        Next
      </button>
      <button onClick={() => sendCommand("previous")} style={{ margin: "10px" }}>
        Previous
      </button>
    </div>
  );
}

export default App;
