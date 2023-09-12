import { useNavigate } from "react-router-dom";
import "./PokemonCard.css";

type PokemonCardProps = {
  name: string;
  type: string;
  isFavorite: boolean;
  imgURL: string;
};

export function PokemonCard({
  name,
  type,
  isFavorite,
  imgURL,
}: PokemonCardProps) {
  const imgAltText = name + " sprite";

  const pokemonSprite = (
    <img className="pokemonSprite" src={imgURL} alt={imgAltText} />
  );

  const typePil = <span className="typePil">{type}</span>;

  const nameTitle = <h1 className="nameTitle">{name}</h1>;

  const favoriteIndicator = (
    <button
      type="button"
      className={`favoriteButton ${
        isFavorite ? "isFavorite" : "isNotFavorite"
      }`}
      //this is a placeholder for a component. All apperance changes to
      //favIndicator will be done with useState
    >
      favorite
    </button>
  );
  const navigate = useNavigate();

  const navigateToDetails = () => {
    sessionStorage.setItem("pokemonName", name);
    navigate("/details");
  };
  const detailsButton = <button className="detailsButton" onClick={navigateToDetails}>Details</button>;

  return (
    <div className="cardContainer">
      {pokemonSprite}
      {typePil}
      {nameTitle}
      {favoriteIndicator}
      {detailsButton}
    </div>
  );
}
export default PokemonCard;
