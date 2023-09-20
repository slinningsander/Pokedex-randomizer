import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './pokemonScreenTemplate.css';
// type PokemonScreenTemplateProps = {
//     name: string;
//     type: string;
//     height: number;
//     weight: number;
//     abilities: string[];
//     moves: string[];
// };

const PokemonScreenTemplate = () => {
  const { pokemon } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState<string | null>('');
  const [parsedPokemonInfo, setParsedPokemoninfo] = useState<any>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setPokemonInfo(sessionStorage.getItem(pokemon || ''));
    if (pokemonInfo !== null) {
      try {
        setParsedPokemoninfo(JSON.parse(pokemonInfo));
        console.log(parsedPokemonInfo);
        console.log(parsedPokemonInfo.abilities[0].ability.name);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      console.log('pokemonInfo is null or undefined');
    }
  }, [pokemonInfo]);

  useEffect(() => {
    if (parsedPokemonInfo !== '') {
      setName(parsedPokemonInfo.name.charAt(0).toUpperCase() + parsedPokemonInfo.name.slice(1));
    }
  }, [parsedPokemonInfo]);

  return (
    <div className="page">
      <div className="pokemonCard">
        <h1>{name} </h1>
        <img src={parsedPokemonInfo.sprite} className="img"></img>
        <div className="infoBox">
          <h4>Type: {parsedPokemonInfo.type}</h4>
          <h4>Ability: {parsedPokemonInfo.ability1}</h4>
          <h4>Height: {parsedPokemonInfo.height}</h4>
          <h4>Weight: {parsedPokemonInfo.weight}</h4>
          <h4>HP: {parsedPokemonInfo.hp}</h4>
        </div>
      </div>
    </div>
  );
};

export default PokemonScreenTemplate;

/*
Name
Type
Height
Weight
Abilities
Moves
*/
