import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

export const Join: React.FC = () => {
  const { ws } = useContext(RoomContext);
  const createRoom = () => {
    ws.emit("create-room");
  };
  return (
    <button onClick={createRoom} className="bg-blue-900 py-2 px-4 rounded-lg text-xl hover:bg-cyan-400 text-teal-200 hover:text-sky-900">
      Iniciar vídeo chamada
    </button>
  );
};
