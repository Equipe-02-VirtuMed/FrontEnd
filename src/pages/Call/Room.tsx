import camera from "../../assets/camera-off.svg";
import cancel from "../../assets/btn-cancel.svg";
import chat from "../../assets/btn-chat.svg";
import file from "../../assets/attachment.svg";
import image1 from "../../assets/imagetest-1.png";
import deleteIcon from "../../assets/delete.svg";
import sendIcon from "../../assets/send.svg";
import saveAs from "file-saver";
import { Transition } from "react-transition-group"
import React, { useCallback } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import { ShareScreenButton } from "../../components/ShareScreeenButton";
import { VideoPlayer } from "../../components/VideoPlayer";
import { RoomContext } from "../../context/RoomContext";
import { PeerState } from "../../reducers/peerReducer";
import { colors } from "../../styles/colors";

export const Room = () => {
  //const { id } = useParams();
  const { ws, me, stream, peers, shareScreen, screenSharingId, setRoomId } =
    useContext(RoomContext);

  //chat
  const [socket, setSocket] = useState<Socket>();
  const [messageChat, setMessageChat] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(0);
  const [chatView, setChat] = useState(false);
  let { id } = useParams();
  const transition = {
    hidden: { x: 500 },
    show: {
      x: 0,
    },
  };
  //chat

  //chat
  function Send(value?: string) {
    const num = Math.random() >= 0.5;
    // Replace isPatient by the role inside the cookie
    if (message !== "") {
      var data_msg = {
        username: "",
        isPatient: false,
        body: message,
        filename: null,
        fileDownload: null,
        file: null,
      };
      socket?.emit("message", data_msg);
      setMessage("");
      setFileSelected(null);
      var elementInput = ((
        document.getElementById("sendmessage") as HTMLInputElement
      ).value = "");
    } else if (fileSelected !== undefined && fileSelected !== null) {
      var url = window.URL.createObjectURL(new Blob([fileSelected]));
      var data_file = {
        username: "",
        isPatient: false,
        body: message,
        filename: fileSelected?.name,
        fileDownload: url,
        file: fileSelected,
      };
      socket?.emit("file", data_file);
      setMessage("");
      setFileSelected(null);
    }
  }
  //chat

  //chat
  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
    useCookies;
  }, [setSocket]);

  const messageListener = (data: any) => {
    setMessageChat([...messageChat, JSON.parse(data)]);
    scrollToBottom();
  };

  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket?.on("receive-message", messageListener);
    return () => {
      socket?.off("receive-message", messageListener);
    };
  }, [messageListener]);

  const [animate, setAnimate] = useState(false);

  // Animate on click button and revert after 3000ms.
  const doAnimate = useCallback(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 3000);
  }, []);

  const hiddenFileInput = React.useRef<any>();
  const [fileSelected, setFileSelected] = useState<any>(null);

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    var elementInput = ((
      document.getElementById("uploadFile") as HTMLInputElement
    ).value = "");
    var elementInputMessage = ((
      document.getElementById("sendmessage") as HTMLInputElement
    ).value = "");
    setMessage("");
    setFileSelected(fileUploaded);
  };

  function DeleteFile() {
    var elementInput = ((
      document.getElementById("uploadFile") as HTMLInputElement
    ).value = "");
    setFileSelected(null);
  }

  function Download(data: Blob, filename: string) {
    saveAs(data, "virtumed-" + filename);
  }
  //chat

  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
  }, [id, me, ws]);

  useEffect(() => {
    setRoomId(id);
  }, [id, setRoomId]);

  console.log({ screenSharingId });

  const screenSharingVideo =
    screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;

  const { [screenSharingId]: sharing, ...peersToShow } = peers;

  return (
    <Transition in={chatView} timeout={500}>
      {(state: any) => (
        <Container>
          <VideoContainer state={chatView}>
            <div className="flex flex-col min-h-screen">
              <div className="bg-blue-900 p-4 text-teal-100">Romm id {id}</div>

              <div className="flex grow">
                {screenSharingVideo && (
                  <div className="w-4/5 pr-4">
                    <VideoPlayer stream={screenSharingVideo} />
                  </div>
                )}

                <div
                  className={`grid gap-4 ${
                    screenSharingVideo ? "w-1/5 grid-col-1" : "grid-cols-4"
                  }`}
                >
                  {screenSharingId !== me?.id && (
                    <VideoPlayer stream={stream} />
                  )}

                  {Object.values(peersToShow as PeerState).map((peer) => (
                    <VideoPlayer stream={peer.stream} />
                  ))}
                </div>
              </div>

              <div className="h-28 fixed bottom-0 p-6 w-full flex items-center justify-center border-t-2 bg-white">
                <ShareScreenButton onClick={shareScreen} />
              </div>
            </div>
          </VideoContainer>
          <Chat state={chatView}>
            {messageChat.map((res: any, i: number) => (
              <MessageBox
                ref={messagesEndRef}
                key={i}
                isPacient={res.isPatient}
              >
                <div>
                  <Avatar src={image1} />
                </div>

                {res.file !== null ? (
                  <File
                    onClick={() => Download(res.fileDownload, res.filename)}
                    isPacient={res.isPatient}
                  >
                    {res.filename}
                  </File>
                ) : (
                  <TextMessage isPacient={res.isPatient}>
                    {res.body}
                  </TextMessage>
                )}
              </MessageBox>
            ))}
          </Chat>
          <FileBlock isFile={fileSelected !== null}>
            <BoxIcon style={{ textAlign: "left", padding: 0 }}>
              <Btn onClick={() => DeleteFile()} src={deleteIcon} />
            </BoxIcon>
            <Filename>
              {fileSelected !== null ? fileSelected.name : null}
            </Filename>
          </FileBlock>
          <InputContainer state={chatView}>
            <BoxIcon>
              <Button onClick={handleClick}>
                <img style={{ height: "28px" }} src={file} />
              </Button>
            </BoxIcon>
            <input
              type="file"
              id="uploadFile"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <Input
              id="sendmessage"
              onChange={(e) => setMessage(e.target.value)}
              state={chatView}
              disabled={fileSelected !== null}
            />
            <BoxIcon state={chatView}>
              <Btn onClick={() => Send()} src={sendIcon} />
            </BoxIcon>
          </InputContainer>
          <ControlButtons state={chatView}>
            <BoxIcon>
              <Btn src={camera} />
            </BoxIcon>
            <BoxIcon>
              <Btn src={cancel} />
            </BoxIcon>
            <BoxIcon>
              <Btn onClick={() => setChat(!chatView)} src={chat} />
            </BoxIcon>
          </ControlButtons>
        </Container>
      )}
    </Transition>
  );
};

//chat
export interface View {
  state?: any;
  isPacient?: boolean;
  isFile?: boolean;
  color?: string;
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  display: flex;
  flex-direction: column;
`;

const MessageBox = styled.div<View>`
  display: flex;
  flex-direction: ${({ isPacient }) => (isPacient ? "row" : "row-reverse")};
  background: ${({ isPacient }) =>
    isPacient ? colors.primaryBlack : colors.secondBlue};
  padding: 12px 24px;
  align-items: center;
`;

const Button = styled.button`
  background: ${colors.primaryWhite};
  border: none;
  width: 32px;
  height: fit-content;
`;

const TextMessage = styled.div<View>`
  padding: 0 12px;
  text-align: ${({ isPacient }) => (isPacient ? "left" : "right")};
  word-break: break-all;
`;

const FileBlock = styled.div<View>`
  display: flex;
  transition: 0.3s;
  visibility: ${({ isFile }) => (isFile ? "visible" : "hidden")};
  background: ${({ isFile }) => (isFile ? colors.primaryWhite : "transparent")};
  padding: ${({ isFile }) => (isFile ? "1rem 20px" : 0)};
  height: ${({ isFile }) => (isFile ? "fit-content" : "0")};
  translatey: ${({ isFile }) => (isFile ? "0" : "20px")};
`;

const File = styled.a<View>`
  width: 100%;
  padding: 8px 16px;
  margin: ${({ isPacient }) => (isPacient ? "0 0 0 1rem" : "0 1rem 0 0")};
  border: 2px dashed ${colors.primaryWhite};
`;

const Filename = styled.div`
  color: ${colors.primaryBlack};
  word-break: break-all;
  padding: 0 12px;
`;

const Avatar = styled.img<View>`
  width: 42px;
  height: 42px;
  display: flex;
  border-radius: 100%;
`;

const Switcher = styled.div<View>`
  border: 2px solid red;
`;

const VideoContainer = styled.div<View>`
  display: ${({ state }) => (state ? "flex" : "block")};
  height: ${({ state }) => (state ? "30%" : "100%")};
`;

const MainVideo = styled.div<View>`
  transition: 0.3s;
  background: purple;
  height: ${({ state }) => (state ? "100%" : "50%")};
  width: ${({ state }) => (state ? "50vw" : "100vw")};
`;

const Chat = styled.div<View>`
  transition: 0.3s;
  overflow: auto;
  visibility: ${({ state }) => (state ? "visible" : "hidden")};
  background: ${({ state }) => (state ? colors.primaryWhite : "transparent")};
  height: ${({ state }) => (state ? "90%" : "0%")};
`;

const SubVideo = styled.div<View>`
  transition: 0.3s;
  background: yellow;
  color: black;
  height: ${({ state }) => (state ? "100%" : "50%")};
  width: ${({ state }) => (state ? "50vw" : "100vw")};
`;

const BoxIcon = styled.div<View>`
  text-align: center;
  height: ${({ state }) => (state ? "100%" : "0%")};
  padding: 0 1rem;
  height: fit-content;
  line-height: 0;
  background: transparent;
`;

const ChatContainer = styled.div`
  grid-area: chatmessages;
`;

const InputContainer = styled.div<View>`
  display: flex;
  width: 100vw;
  height: ${({ state }) => (state ? "fit-content" : "0%")};
  visibility: ${({ state }) => (state ? "visible" : "hidden")};
  background: ${colors.primaryWhite};
  display: flex;
  align-items: center;
`;

const Input = styled.input<View>`
  border: none;
  outline: none;
  margin: 0;
  width: 100%;
  visibility: ${({ state }) => (state ? "visible" : "hidden")};
  height: fit-content;
  padding: 1rem 20px;
  font-size: 18px;
  background: ${colors.primaryWhite};
`;

const ControlButtons = styled.div<View>`
  padding: 0.5rem 2rem;
  box-sizing: border-box;
  background-color: gray;
  width: 100vw;
  margin: 0 auto;
  margin-right: auto;
  bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 3rem;
  grid-row-gap: 0px;
`;

const Btn = styled.img`
  width: 28px;
  height: fit-content;
`;
