import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer";
import { RoomContext } from "../context/RoomContext";

export const Room = () => {
  const { id } = useParams();
  const { ws, me, stream } = useContext(RoomContext);

  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
  }, [id]);

  return (
    <>
      Room.id {id}
      <div>
        <VideoPlayer stream={stream} />
      </div>
    </>
  );
};
