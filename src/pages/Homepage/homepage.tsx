import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import "./styles.css";
import { Navigate } from "react-router-dom";
import { colors } from "../../styles/colors";
import Carousel from "react-elastic-carousel";
import MedicosCarousel from "./components/medicosCarousel/medicos_carousel";
import CategoriasCarousel from "./components/categoriasCarousel/categorias_carousel";
import { useUser } from "../../context/UserContext";
import { LocalStorageHelper } from "../../helpers/LocalStorageHelper";
import { LocalStorageKeys } from "../../types/LocalStorageKeys";
import { useEffect } from "react";
import NavbarComponent from "../../components/navbar";

const transition = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const Homepage = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 820px)" });
  const {user,getSchedule,schedules} = useUser()

  useEffect(() => {
   getSchedule(user.email,user.role)
  },[])


  if (isTabletOrMobile) {
    return (
      <>
        <motion.div variants={transition} initial="hidden" animate="show">
          <Container>
          <NavbarComponent/>
            <SecondContainer>
              <TextIntro>Olá {user.name}, que bom te ver por aqui...😊</TextIntro>
              <Button href="/criar-consulta">Criar consulta</Button>
            </SecondContainer>
            <TopicContainer>
              <TextIntro style={{ fontWeight: 700 }}>Minhas consultas</TextIntro>
              <SeeMore>
                <TopicText>ver mais</TopicText>
              </SeeMore>
            </TopicContainer>
            <CategoriasCarousel />
            <TopicContainer>
              <TextIntro style={{ fontWeight: 700 }}>Médicos</TextIntro>
              <SeeMore>
                <TopicText>ver mais</TopicText>
              </SeeMore>
            </TopicContainer>
            <MedicosCarousel />
          </Container>
        </motion.div>
      </>
    );
  } else {
    return (
      <>
        <motion.div variants={transition} initial="hidden" animate="show">
          <ContainerError>
            <ErrorBox>
              Poxa...ainda estamos desenvolvendo a versão para desktop
              <br />
              volte mais tarde 😀
            </ErrorBox>
          </ContainerError>
        </motion.div>
      </>
    );
  }
};

export default Homepage;

// DESKTOP MESSAGE
const ErrorBox = styled.div`
  width: fit-content;
  height: fit-content;
  text-align: center;
`;

const ContainerError = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${colors.primaryBlack};
`;

// MOBILE / TABLET
const Container = styled.div``;

const Navbar = styled.div`
  padding: 15px 25px;
  display: flex;
  align-items: center;
  background: ${colors.secondBlue};
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const Name = styled.div`
  width: 100%;
  padding-left: 1.25rem;
  font-weight: 500;
`;

// Second component

const SecondContainer = styled.div`
  padding: 30px 25px 10px 25px;
`;

const TextIntro = styled.div`width: 100%;`;

const BtnContainer = styled.div`
  display: flex;
`;

const Button = styled.a`
  background: ${colors.secondBlue};
  color: ${colors.primaryWhite};
  font-weight: 500;
  font-size: 14px;
  padding: 0.5rem 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 1rem 0;
  width: 100%;
`;

const Button2 = styled.div`
  background: red;
  width: 100%;
`;

const TopicContainer = styled(SecondContainer)`
  padding-top: 10px;
  display: flex;
`;

const SeeMore = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

const TopicText = styled.div`
  width: fit-content;
  opacity: 0.85;
  :hover {
    opacity: 1;
  }
`;
