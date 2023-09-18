import { useNavigate } from "react-router-dom";
import HeartComponent from "../HeartComponent/HeartComponent";
import "./PokemonCard.css";

type PokemonCardProps = {
  name: string;
  type: string;
  imgURL: string;
};

export function PokemonCard({
  name,
  type,
  imgURL,
}: PokemonCardProps) {

  const imgAltText = name + " sprite";

  const pokemonSprite = (
    <img className="pokemonSprite" src={imgURL} alt={imgAltText} />
  );

  const typePil = <span className="typePil">{type}</span>;

  const nameTitle = <h1 className="nameTitle">{name}</h1>;

  const navigate = useNavigate();

  const navigateToDetails = () => {
    
    navigate("/details/" + name);
  };
  const detailsButton = <button className="detailsButton" onClick={navigateToDetails}>Details</button>;
  const heart = <div className = "heartContainer"><HeartComponent name={name}/></div>;

 

  return (
    <div className="cardContainer">
      {pokemonSprite}
      {typePil}
      {nameTitle}
      {detailsButton}
      {heart}
    </div>
  );
}
export default PokemonCard;
