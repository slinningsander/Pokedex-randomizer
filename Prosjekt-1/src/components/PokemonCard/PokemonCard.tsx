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

  return (
    <div className="cardContainer">
      {pokemonSprite}
      {typePil}
      {nameTitle}
      {favoriteIndicator}
    </div>
  );
}
export default PokemonCard;
