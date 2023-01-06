import React from "react";
import "./style.css";
import VideoChat from "./videochat";


const Video = () => {
  return (
    <div className="video">
      <header>
        <h1>Teleconsulta</h1>
      </header>
      <main>
        <VideoChat />
      </main>
    </div>
  );
};

export default Video;
