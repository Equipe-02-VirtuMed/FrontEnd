import Carousel from "react-elastic-carousel";
import Card from "../card";

const MedicosCarousel = () =>{
const data = [
  {
    img: "https://images.squarespace-cdn.com/content/v1/5ca3511f11f78419cf065b0a/1603361899250-RB8XTG82EGSVFPJ4VZLE/20201022_H_Justin+Macdonald+Spiers_021.jpg?format=1000w",
    name: "Dr.Paulo Vasconcelos",
    local: "Campinas - SP",
  },
  {
    img: "https://eyemediastudios.co.uk/wp-content/uploads/2022/09/university-of-strathclyde-Copy.jpg",
    name: "Dr.Alex Guedes Feitosa",
    local: "Recife - PE",
  },
];
    return(
        <Carousel
              className="medicos_carousel"
              transitionMs={300}
              showArrows={false}
              itemsToShow={2}
              itemPadding={[10, 15]}
            >
              {data.map((result, i) => (
                <Card
                key={i}
                  img={result.img}
                  name={result.name}
                  local={result.local}
                />
              ))}
            </Carousel>
    )
}

export default MedicosCarousel;