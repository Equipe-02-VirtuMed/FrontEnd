import Carousel from "react-elastic-carousel";
import styled from "styled-components";

function Thiscarousel (){
  return (
    <Carousel itemsToShow={1}>
      <Button>Perfil</Button>
      <Button>Consultas</Button>
      <Button>Meus médicos</Button>
    </Carousel>
  );
};

export default Thiscarousel ;

const Button = styled.div`
  background: ${colors.secondBlue};
  width: fit-content;

  border-radius: 10px;
  font-weight:600;
`;
