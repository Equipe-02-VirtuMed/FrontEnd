import styled from "styled-components";
import camera from "../../assets/camera-off.svg";
import cancel from "../../assets/btn-cancel.svg";
import chat from "../../assets/btn-chat.svg";
import image1 from "../../assets/imagetest-1.png";
import image2 from "../../assets/imagetest-2.png";
import { motion } from "framer-motion";

const transition = {
    hidden: { x: -200, },
    show: {
      x: 0,
    },
  };

const ChatVersion = (props:any) => {


    return (
        <motion.div variants={transition} initial="hidden" animate="show">
        <Container>
        <MainVideo src={image1} />
 
        <ControlButtons>
          <Btn src={camera} />
          <Btn src={cancel} />
          <Btn onClick={() => props.viewChange(true)} src={chat} />
        </ControlButtons>
      </Container>
      </motion.div>
    )
}

export default ChatVersion;

const Container = styled.div`
  transition: 0.3s;
`;

const MainVideo = styled.img`
  width: 100vw;
  height: 100vh;
  display: block;
`;

const SubVideo = styled.img`
  display: block;
  width: 35%;
  height: 22%;
  border-radius: 1rem;
  top: 0.5rem;
  right: 0.5rem;
  position: absolute;
`;

const ControlButtons = styled.div`
  padding: 0.5rem 2rem;

  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  width: fit-content;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2rem;
  bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 3rem;
  grid-row-gap: 0px;
`;

const Btn = styled.img``;
