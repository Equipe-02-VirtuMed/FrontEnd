import styled from "styled-components";
import {colors} from "../../../styles/colors";

interface DrPerson {
img:string;
name:string;
local:string;
}

const Card = ({img,name,local}:DrPerson) => {
    return(
        <Container>
            <Image src={img}/>
            <Details>
                <Name>{name}</Name>
                <Local>{local}</Local>
            </Details>
        </Container>
    )
}

export default Card;

const Container = styled.div`
border-radius:10px;
background:${colors.secondBlue};
`;

const Image = styled.img`
width:100%;
height:100px;
border-radius:10px 10px 0 0;
`;

const Details = styled.div`
padding:10px 15px 15px;
text-align:center;
`;

const Name = styled.div`
font-size: 12px;
font-weight:500;
`;
const Local = styled.div`
font-size: 10px;
opacity:0.8;
padding: 0.5rem 0 0;
`;