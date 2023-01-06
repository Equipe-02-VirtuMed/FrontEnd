import React, { useCallback, useState } from "react";
import Lobby from './lobby';
import Room from './room';

const VideoChat = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback ((event:any) => {
    setUsername(event.target.value);
  },[]);

  const handleRoomNameChange = useCallback ((event:any) => {
    setRoomName(event.target.value);
  },[]);

  const handleSubmit = useCallback(async (event:any) => {
    event.preventDefault();
    const data = await fetch('/video/token', {
      method: 'POST',
      body: JSON.stringify({
        identity: username,
        room: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    setToken(data.token);
  }, [username, roomName]);

  const handleLogout = useCallback((event:any) => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  }else {
    render = (
      <Lobby
         username={username}
         roomName={roomName}
         handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}
      />
    );
  }

  return render;
};

export default VideoChat;
