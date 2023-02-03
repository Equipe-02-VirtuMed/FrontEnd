import { useUser } from "../context/UserContext";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { SocialIcons } from "../pages/Login";
import logout from '../assets/logout.svg'
import { LocalStorageHelper } from "../helpers/LocalStorageHelper";

const NavbarComponent = () => {
    const {user} = useUser()
    function Logout(){
      LocalStorageHelper.clear()
      window.location.href = '/login'
    }
    return ( 
        <>
         <Navbar>
              <Img src="https://i.insider.com/5899ffcf6e09a897008b5c04?width=1000&format=jpeg&auto=webp" />
              <Name>{user.name}</Name>
              <SocialIcons onClick={() => Logout()} src={logout} />
            </Navbar>
        </>
    )
}

export default NavbarComponent

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