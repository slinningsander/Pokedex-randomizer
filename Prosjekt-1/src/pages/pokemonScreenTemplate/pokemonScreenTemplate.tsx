import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  useEffect(() => {
    setPokemonInfo(sessionStorage.getItem(pokemon || ''));
    console.log(pokemonInfo);
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

  return (
    <>
      <h1>Name: {parsedPokemonInfo.name}</h1>
      <img src={parsedPokemonInfo.sprite}></img>
      <h2>Type: {parsedPokemonInfo.type}</h2>
      <h2>Ability 1: {parsedPokemonInfo.ability1}</h2>
      <h2>Ability 2: {parsedPokemonInfo.ability2}</h2>
      <h2>Height: {parsedPokemonInfo.height}</h2>
      <h2>Weight: {parsedPokemonInfo.weight}</h2>
      <h2>HP: {parsedPokemonInfo.hp}</h2>
    </>
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
