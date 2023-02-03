import Carousel from "react-elastic-carousel";
import styled from 'styled-components'
import { useUser } from "../../../../context/UserContext";
import {colors} from '../../../../styles/colors'

function CategoriasCarousel(){
 const {schedules} = useUser()
    return(
        <Container>
              {schedules?.map((result, i) => (
                <Card>{result.day} | {result.pacientemail}</Card>
              ))}
            </Container>
    )
}

export default CategoriasCarousel;


const Container = styled.div`

`

const Card = styled.div`
padding: 12px 24px;
background: ${colors.primaryBlack};
text-align:center;
`

