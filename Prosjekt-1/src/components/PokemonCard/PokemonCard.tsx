import { useNavigate } from 'react-router-dom';
import HeartComponent from '../HeartComponent/HeartComponent';
import './PokemonCard.css';

type PokemonCardProps = {
  name: string;
  type: string;
  imgURL: string;
  setRefresh: (refresh: boolean) => void;
  refresh: boolean;
};

export function PokemonCard({ name, type, imgURL, setRefresh, refresh }: PokemonCardProps) {
  const imgAltText = name + ' sprite';

  const pokemonSprite = <img className="pokemonSprite" src={imgURL} alt={imgAltText} />;

  const typePil = <span className="typePil">{type}</span>;

  const nameTitle = <h1 className="nameTitle">{name}</h1>;
  const navigate = useNavigate();
  const navigateToDetails = () => {
    navigate('/project1/details/' + name);
  };

  const detailsButton = (
    <button className="detailsButton" onClick={navigateToDetails} data-testid={'test-detailsBtn'}>
      Details
    </button>
  );
  const heart = (
    <div className="heartContainer">
      <HeartComponent
        name={name}
        //Passes the setRefresh and refresh states to HeartComponent.
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  );

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
