import styled, { keyframes } from "styled-components";
import camera from "../../assets/camera-off.svg";
import cancel from "../../assets/btn-cancel.svg";
import chat from "../../assets/btn-chat.svg";
import send from "../../assets/send.svg";
import image2 from "../../assets/imagetest-2.png";
import { useCallback, useState } from "react";
import { Transition } from "react-transition-group"
import { motion } from "framer-motion";
import { colors } from "../../styles/colors";
import { messages } from './statics'

const Call = () => {
  const [chatView, setChat] = useState(false);
  const transition = {
    hidden: { x: 500 },
    show: {
      x: 0,
    },
  };

  function Change() {
    setChat(!chatView)
    doAnimate()
  }


  const [animate, setAnimate] = useState(false)

  // Animate on click button and revert after 3000ms.
  const doAnimate = useCallback(() => {
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
    }, 3000)
  }, [])

  return (

    <Transition in={chatView} timeout={500}>
      {(state: any) => (
        <Container>
          <Switcher state={chatView}>
            <MainVideo state={chatView} />
            <SubVideo state={chatView} />
          </Switcher>
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
          <Chat state={chatView}>
            <MessageContainer>
              {messages.map((res) =>
                <Content isPacient={res.isPatient}>
                  <div>{res.username}</div>
                  <div>{res.body}</div>
                </Content>
              )}
            </MessageContainer>
            <InputContainer>
              <Input />
              <BoxIcon>
                <Btn src={send} />
              </BoxIcon>
            </InputContainer>

          </Chat>
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

export const Animation = styled.div<View>`
  transition: 0.5s;
  width: 300px;
  height: 200px;
  /* example for move item */
  transform: translateX(
    ${({ state }) => (state === "entering" || state === "entered" ? 400 : 0)}px
  );
  /* change color*/
  background: ${({ state }) => {
    switch (state) {
      case "entering":
        return "red"
      case "entered":
        return "blue"
      case "exiting":
        return "green"
      case "exited":
        return "yellow"
    }
  }};
`

const fadeIn = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const MessageContainer = styled.div`
overflow: auto;
width:100vw;
height: 100%;
`;

const Container = styled.div`
  transition: 0.3s;
  width:100vw;
  height:100vh;
`;

const Content = styled.div<View>`
background: ${({ isPacient }) => (isPacient ? colors.primaryWhite : colors.secondBlue)};
color: ${({ isPacient }) => (isPacient ? colors.primaryBlack : colors.primaryWhite)};
padding: 10px 15px;
box-sizing:border-box;
`;

const Message = styled.div``;

const Chat = styled.div<View>`
width:100vw;
height:55vh;
flex:1;
background:green;
visibility: ${({ state }) => (state ? 'visible' : 'hidden')};
animation: ${({ state }) => state ? fadeOut : fadeIn} 0.3s linear;
display: ${({ state }) => (state ? 'absolute' : 'none')};
position: ${({ state }) => (state ? 'absolute' : null)};
bottom:0;
`;

const InputContainer = styled.div`
display:flex;
width:100vw;
`;

const Input = styled.input`

border:none;
outline: none;
margin:0;
padding:1rem 20px;
font-size:18px;
`

const Switcher = styled.div<View>`
transition: 0.5s;
height: ${({ state }) => (state ? '300px' : `${window.innerHeight}px`)};
`;

const MainVideo = styled.div<View>`
transition: 0.5s;
background:green;
width: ${({ state }) => (state ? '50vw' : '100vw')};
height: ${({ state }) => (state ? '300px' : `${window.innerHeight}px`)};
`;

const SubVideo = styled.div<View>`
display:absolute;
background:red;
width: 50vw;
height: 300px;
transition: 0.5s;
  position: absolute;
  top:0;
  right:0;
  border-radius:0;
`;

const ControlButtons = styled.div<View>`
  transition: 0.5s;
  position: ${({ state }) => (state ? 'relative' : 'absolute')};
  padding-bottom: ${({ state }) => (state ? '20px' : 0)};
  width:100vw;
  transform: translateY(
    ${({ state }) => (state ? 1 : -4)}rem
  );
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 3rem;
  grid-row-gap: 0px;
`;

const BoxIcon = styled.div`
text-align:center;
`

const Btn = styled.img``;
