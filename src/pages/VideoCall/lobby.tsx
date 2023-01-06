import React from 'react';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}:any) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Entre na sala</h2>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Nome da sala:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Lobby;
