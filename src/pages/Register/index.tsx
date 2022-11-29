import logo from "../../assets/logo.svg";
import lock from "../../assets/lock.svg";
import gmail from "../../assets/gmail.svg";
import facebook from "../../assets/facebook.svg";
import apple from "../../assets/apple.svg";
import { motion } from "framer-motion";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import Link from "react";
import Image from "react";

const mobile: string = "600px";
const desktop: string = "1024px";
const tablet: string = "825px";

const Register = () => {
  const transition = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  return (
    <Container>
      <motion.div variants={transition} initial="hidden" animate="show">
        <Subcontainer>
          <LogoContainer>
            <Logo src={logo} height={18} />
          </LogoContainer>
          <TextImg>
            <TitleContainer>
              <Text>Login </Text>
            </TitleContainer>
            <Description>
              Não tem uma conta ? <Strong>Criar conta</Strong>
            </Description>
          </TextImg>

          <InputGrid>
            <InputContainer>
              <Input
                id={"id1"}
                placeholder="Insira seu email"
                type="text"
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              <Input
                id={"id2"}
                placeholder="Insira sua senha"
                type="password"
                autoComplete="off"
              />
            </InputContainer>
            <ForgetPassword>Esqueceu a senha ?</ForgetPassword>
            <EnterBtn>Entrar</EnterBtn>
          </InputGrid>
          <SocialContainer>
            Ou entre com
            <SocialSubContainer>
              <SocialIcons src={facebook} />
              <SocialIcons src={gmail} />
              <SocialIcons src={apple} />
            </SocialSubContainer>
          </SocialContainer>
        </Subcontainer>
      </motion.div>
    </Container>
  );
};

export default Register;

const InputGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
border-radius: 0;
display: flex;
font-size: 12px;
padding: 0.75rem 1.3rem ;
text-shadow: none;
background: ${colors.primaryWhite};
border: 0;
border-radius: 8px;
flex: 1 1 auto;
transition:0.3s;
order: 2;
color:${colors.primaryBlack};
line-height:25px;
-webkit-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
-moz-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
&:focus {
  outline:none;
}

&:not(:focus) {
  color: ${colors.primaryBlue};
}
}
::placeholder {
    font-weight:400;
    opacity:0.5;
    color:${colors.primaryBlack};
}
`;

export const EnterBtn = styled.div`
  color: ${colors.primaryWhite};
  background: ${colors.secondBlue};
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 1rem 0;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  margin: 2rem auto 0 auto;

  :hover {
    color: ${colors.secondBlue};
    background: transparent;
    outline: 1px solid ${colors.secondBlue};
  }
`;

export const Container = styled.div`
  height: fit-content;
  width: 100vw;
  background: ${colors.primaryBlue};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // Mobile
  @media screen and (min-width: 0) and (max-width: ${mobile}) {
    display: block;
    padding: 4rem 0 0 0;
  }
`;

const ForgetPassword = styled.div`
  color: ${colors.primaryWhite};
  margin-left: auto;
  margin-right: 0;
  width: fit-content;
  text-align: right;
  font-size: 0.7rem;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export const Icon = styled.img`
  width: fit-content;
  height: 8px;
  background: transparent;
  padding-right: 0.5rem;
`;

const Icondiv = styled.div`
  line-height: 0;
`;

const Text = styled.div`
  font-size: 28px;
  color: ${colors.primaryWhite};
  font-weight: 700;
`;

const Strong = styled.div`
  color: #136a9a;
  font-weight: 700;
  padding-left: 0.5rem;
`;

const Description = styled.div`
  color: ${colors.primaryWhite};
  font-size: 14px;
  font-weight: 400;
  padding: 1.25rem 0 0;
  width: fit-content;
  display: flex;
  margin: 0 auto;
  text-align: center;
  // Mobile
  @media screen and (min-width: 0) and (max-width: ${mobile}) {
    padding: 1.25rem 0 0;
  }
`;

export const Input2 = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 1rem;
  font-size: 0.9rem;
  margin: 0 auto;
  border-radius: 4px;
  border: none;
  background-color: #f0efff;
  color: black;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.1);
  text-shadow: 0px 0px 12px rgba(255, 255, 255, 0.1);
  ::placeholder {
    color: color: ${colors.primaryBlue};
    font-weight: 300;
    opacity: 0.5;
    font-size: 0.9rem;
    @media (max-width: ${tablet}) and (min-width: 0) {
      font-size: 1rem;
    }
  }
  &:focus {
    outline: none;
  }
`;

export const Subcontainer = styled.div`
  width: 260px;
  border-radius: 8px;
  text-align: center;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 35px;
  background: ${colors.primaryBlue};
  padding: 2rem 2rem 0 2rem;
  -webkit-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
  // Mobile
  @media screen and (min-width: 0) and (max-width: ${mobile}) {
    padding: 0 2rem;
    width: 100%;
    box-sizing: border-box;
    display: block;
    background: transparent;
    box-shadow: none;
  }
`;

export const SubTextContainer = styled.div``;

export const TextImg = styled.div`
  width: 100%;
  margin: 0 auto;
  // Mobile
  @media screen and (min-width: 0) and (max-width: ${mobile}) {
    padding: 30% 0 15% 0;
  }
`;

export const TitleContainer = styled.div`
  width: fit-content;
  display: flex;
  margin: 0 auto;
`;

export const SubDescription = styled.div`
background:green;
color: ${colors.primaryWhite}
font-weight:700;
position:relative;
`;

export const SocialContainer = styled.div`
  width: 100%;
  color: ${colors.primaryWhite};
  font-size: smaller;
  text-align: center;
  // Mobile
  @media screen and (min-width: 0) and (max-width: ${mobile}) {
    padding: 25% 0 0;
  }
`;

export const SocialSubContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 1.5rem 2rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 0px;
`;

export const SocialIcons = styled.img`
  background: transparent;
  margin: 0 auto;
  opacity: 0.5;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    opacity: 1;
  }
`;

export const Logo = styled.img`
  width: fit-content;
  height: 18px;
  margin: 0 auto;
  display: block;
  background: transparent;
`;

export const LinkBtn = styled.img`
  font-family: "Sora", sans-serif;
  color: red;
`;

// IMAGE LOGO _____________________________________________
export const LogoContainer = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  line-height: 0;
`;
