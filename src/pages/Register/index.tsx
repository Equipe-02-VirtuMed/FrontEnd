import logo from "../../assets/logo.svg";
import lock from "../../assets/lock.svg";
import eye from "../../assets/eye.svg";
import eyeClosed from "../../assets/eye-closed.svg";
import gmail from "../../assets/gmail.svg";
import facebook from "../../assets/facebook.svg";
import apple from "../../assets/apple.svg";
import { motion } from "framer-motion";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import Link, { useState } from "react";
import Image from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../types/routes";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { AuthService } from "../../services/AuthServices";
import { LocalStorageKeys } from "../../types/LocalStorageKeys";
import { LocalStorageHelper } from "../../helpers/LocalStorageHelper";
import { LoginResponse } from "../../types/api-types/login";
import { ErrorResponse } from "../../types/api-types/error";
import { User } from "../../types/api-types/user";
import { createUser } from "../../helpers/endpoint/user";
import { useUser } from "../../context/UserContext";
import { options } from "./static";

const mobile: string = "600px";
const desktop: string = "1024px";
const tablet: string = "825px";

const Register = () => {
 const navigate = useNavigate();
 const {onChangeNewUser, newUser,registerUser} = useUser()
 const [isDoctor,setTypeDoctor] = useState<boolean>(true)

  const transition = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

    // Eye icon ( hidden and open ) logic
    const [eyeLogic, setEyeLogic] = useState(true);
    const eyeChange = () => {
      if (eyeLogic) {
        setEyeLogic(false);
      } else {
        setEyeLogic(true);
      }
    };

    function Submit(){
      onChangeNewUser('image','')
      if(isDoctor){
        onChangeNewUser('crm','')
        onChangeNewUser('residency','')
        onChangeNewUser('role','Pacient')
        console.log(newUser[0])
        registerUser(newUser[0])
      }else{
        console.log(newUser[0])
        onChangeNewUser('role','Doctor')
        registerUser(newUser[0])
      }
    }


  return (
    <Container>
      <motion.div variants={transition} initial="hidden" animate="show">
        <Subcontainer>
          <LogoContainer>
            <Logo src={logo} height={18} />
          </LogoContainer>
          <TextImg>
            <TitleContainer>
              <Text>Registre-se</Text>
            </TitleContainer>
            <Description>
              Já possui uma conta ? <Strong onClick={() => navigate(RoutePath.LOGIN)}>Entrar</Strong>
            </Description>
          </TextImg>
            
          <InputGrid>
    
          <Toogle>
            {options.map((item) => 
            <Item onClick={() => {isDoctor !== item.value ? setTypeDoctor(!isDoctor) : null}} isDoctorType={isDoctor === item.value}>{item.label}</Item>
            )}
          </Toogle>
       
          <InputContainer>
              <Input
                id={"id1"}
                onChange={(e) => onChangeNewUser('name',e.target.value)}
                placeholder="Nome"
                type="text"
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              <Input
                id={"id1"}
                onChange={(e) => onChangeNewUser('uf',e.target.value)}
                placeholder="UF"
                type="text"
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              <Input
                id={"id1"}
                placeholder="Insira seu email"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  onChangeNewUser(
                    'email',
                    e.target.value
                  )
                }
              />
            </InputContainer>
            {isDoctor ? 
            null :
             <>
             <InputContainer>
              <Input
                id={"id1"}
                placeholder="Insira seu CRM"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  onChangeNewUser(
                    'crm',
                    e.target.value
                  )
                }
              />
            </InputContainer>
            <InputContainer>
              <Input
                id={"id1"}
                placeholder="Insira sua residencia"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  onChangeNewUser(
                    'residency',
                    e.target.value
                  )
                }
              />
            </InputContainer>
             </>
            } 
            <InputContainer>
              <Input
                id={"id2"}
                placeholder="Insira sua senha"
                type="password"
                autoComplete="off"
                onChange={(e) =>
                  onChangeNewUser(
                    'password',
                    e.target.value
                  )
                }
              />
            </InputContainer>
            <InputContainer>
              <Input
                id={"id4"}
                placeholder="Repita sua senha"
                type="password"
                autoComplete="off"
                onChange={(e) =>
                  onChangeNewUser(
                    'confirmPassword',
                    e.target.value
                  )
                }
              />
            </InputContainer>
            <EnterBtn onClick={() => Submit()}>Criar conta</EnterBtn>
          </InputGrid>
          <SocialContainer>
            Ou criar com
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

export default Register

interface ComponentProps{
  isDoctorType?:boolean
}

const Item = styled.div<ComponentProps>`
display:flex;
align-items:center;
background:${(props) => (props.isDoctorType ? colors.primaryBlack : 'transparent')};
justify-content:center;
`

const Toogle = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 24px;
grid-row-gap: 0px;
`

const EyeIcon = styled.img`
  width: 26px;
  height: 26px;
  padding-right:1rem;
`;
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
  align-items:center;
  border-radius: 8px;
  background: ${colors.primaryWhite};
  -webkit-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
-moz-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
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
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
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
  font-size: 22px;
  color: ${colors.primaryWhite};
  font-weight: 700;
   // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    font-size: 28px;
  }
`;

const Strong = styled.div`
  color: #136a9a;
  font-weight: 700;
  padding-left: 0.5rem;
`;

const Description = styled.div`
  color: ${colors.primaryWhite};
  font-size: 12px;
  font-weight: 400;
  padding: 1.25rem 0 0;
  width: fit-content;
  display: flex;
  margin: 0 auto;
  text-align: center;
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    padding: 1.25rem 0 0;
    font-size: 14px;
  }

  button {
    border: none;
    background-color: ${colors.primaryBlue};
    cursor: pointer;
    color: #136a9a;
    font-weight: 700;
    padding-left: 0.5rem;
    font-weight: 800;
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
    color: ${colors.primaryBlue};
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
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    padding: 0 2rem;
    width: 60%;
    margin:0 auto;
    box-sizing: border-box;
    display: block;
    background: transparent;
  }
    // mobile
  @media screen and (min-width: 0) and (max-width: ${mobile}) {
    width: 100%;
  }
`;

export const SubTextContainer = styled.div``;

export const TextImg = styled.div`
  width: 100%;
  margin: 5% auto;
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    padding: 10% 0 25% 0;
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
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
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
function setErrorMessage(message: any) {
  throw new Error("Function not implemented.");
}

