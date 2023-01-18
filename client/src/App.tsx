import React, { useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client"


const WS = "http://localhost:8080";

function App() {
  useEffect(() => {
    socketIOClient(WS);
  }, []);

  return (
    <div className="video">
      <button className="bg-rose-400 py-2 px-8 rounded-lg">Iniciar</button>
    </div>
  );
}

export default App;
