import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";

const WS = "http://localhost:8080";
const ws = socketIOClient(WS);

export const RoomContext = createContext<null | any>(null);

interface Props {
  children: React.ReactNode;
}

export const RoomProvider: React.FunctionComponent<Props> = ({ children }) => {
  const navigate = useNavigate();
  const enterRoom = ({ roomId }: { roomId: "string" }) => {
    console.log({ roomId });
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    ws.on("room-created", enterRoom);
  }, []);
  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};
