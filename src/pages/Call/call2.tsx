import styled from "styled-components";
import camera from "../../assets/camera-off.svg";
import cancel from "../../assets/btn-cancel.svg";
import chat from "../../assets/btn-chat.svg";
import image1 from "../../assets/imagetest-1.png";
import image2 from "../../assets/imagetest-2.png";
import sendIcon from "../../assets/send.svg";
import { useCallback, useState } from "react";
import ChatVersion from "./chatVersion";
import { motion } from "framer-motion";
import { colors } from "../../styles/colors";
import { Transition } from "react-transition-group"

const Call = () => {
  const [chatView, setChat] = useState(false);
  const transition = {
    hidden: { x: 500 },
    show: {
      x: 0,
    },
  };

  const [animate, setAnimate] = useState(false)

  // Animate on click button and revert after 3000ms.
  const doAnimate = useCallback(() => {
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
    }, 3000)
  }, [])

  function Change() {
    setChat(!chatView)
    console.log(chatView)
  }


  return (
    <Transition in={chatView} timeout={500}>
      {(state: any) => (
        <Container>
          <VideoContainer state={chatView}>
            <MainVideo state={chatView}>MAIN VIDEO</MainVideo>
            <SubVideo state={chatView}>SUB VIDEO</SubVideo>
          </VideoContainer>
          <Chat state={chatView}>CHAT HERE</Chat>
          <InputContainer state={chatView}>
            <Input state={chatView} />
            <BoxIcon state={chatView}>
              <Btn onClick={() => Change} src={sendIcon} />
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
              <Btn onClick={() => Change()} src={chat} />
            </BoxIcon>
          </ControlButtons>
        </Container>
      )
      }
    </Transition >

  )
};

export default Call;

export interface View {
  state?: any;
  isPacient?: boolean
}

const Container = styled.div`
height: 100vh;
  width: 100vw;
  background:black;
  display:flex;
  flex-direction:column;
`;

const Switcher = styled.div<View>`
border:2px solid red;
`;

const VideoContainer = styled.div<View>`
display:${({ state }) => (state ? 'flex' : 'block')};
height:${({ state }) => (state ? '30%' : '100%')};
`

const MainVideo = styled.div<View>`
transition:0.3s;
background:purple;
height:${({ state }) => (state ? '100%' : '50%')};
width:${({ state }) => (state ? '50vw' : '100vw')};
`;

const Chat = styled.div<View>`
transition:0.3s;
visibility: ${({ state }) => (state ? 'visible' : 'hidden')};
background:${({ state }) => (state ? 'red' : 'transparent')};
height: ${({ state }) => (state ? '90%' : '0%')};
`;


const SubVideo = styled.div<View>`
transition:0.3s;
background:yellow;
height:${({ state }) => (state ? '100%' : '50%')};
width:${({ state }) => (state ? '50vw' : '100vw')};
`;

const BoxIcon = styled.div<View>`
text-align:center;
height: ${({ state }) => (state ? '100%' : '0%')};
padding: 0 1rem;
height:fit-content;
line-height:0;

`

const ChatContainer = styled.div`
grid-area: chatmessages; 
`;

const InputContainer = styled.div<View>`
display:flex;
width:100vw;
height: ${({ state }) => (state ? 'fit-content' : '0%')};
visibility: ${({ state }) => (state ? 'visible' : 'hidden')};
background:${({ state }) => (state ? colors.primaryBlack : 'transparent')};
display:flex;
align-items:center;
`;

const Input = styled.input<View>`
border:none;
outline: none;
margin:0;
width:100%;
visibility: ${({ state }) => (state ? 'visible' : 'hidden')};
height: fit-content;
padding:1rem 20px;
font-size:18px;
`

const ControlButtons = styled.div<View>`
  padding: 0.5rem 2rem;
  box-sizing:border-box;
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
width:32px;
height:fit-content;
`;
