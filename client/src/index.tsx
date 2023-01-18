import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RoomProvider } from "./context/RoomContext";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/room/:id" element={<Room/>}/>
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

