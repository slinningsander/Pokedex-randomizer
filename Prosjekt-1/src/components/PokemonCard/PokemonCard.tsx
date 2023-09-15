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

  const heart = <div className = "heartContainer"><HeartComponent/></div>;

 

  return (
    <div className="cardContainer">
      {pokemonSprite}
      {typePil}
      {nameTitle}
      {heart}
    </div>
  );
}
export default PokemonCard;
