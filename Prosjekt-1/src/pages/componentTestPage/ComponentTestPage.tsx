import PokemonCard from '../../components/PokemonCard/PokemonCard';
import './componentTestPage.css';
import { useEffect, useState } from 'react';
import fetchPokemon from '../../services/fetchPokemon';

export function ComponentTestPage() {
  const [pokemonArray, setPokemonArray] = useState<any[]>([]);
  const [favoriteArray, setFavoriteArray] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const favorites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');

  useEffect(() => {
    const FetchPokemonData = async () => {
      const tempArray = [];
      for (let i = 1; i <= 10; i++) {
        const pokemonName = Math.floor(Math.random() * 151) + 1;
        const data = await fetchPokemon(pokemonName);
        tempArray.push(data);
        const dataToStore = {
          name: data.name,
          type: data.types[0].type.name,
          height: data.height,
          sprite: data.sprites.front_default,
          ability1: data.abilities[0].ability.name,
          ability2: data.abilities[1].ability.name,
        };
        sessionStorage.setItem(data.name, JSON.stringify(dataToStore));
      }
      setPokemonArray(tempArray);
      console.log('UE1 brukes');
    };

    FetchPokemonData();
  }, []);

  useEffect(() => {
    const FetchFavoritePokemons = async () => {
      const tempArray = [];

      if (favorites !== null) {
        for (let i = 0; i < favorites.length; i++) {
          const data = await fetchPokemon(favorites[i]);
          tempArray.push(data);
        }
        setFavoriteArray(tempArray);
      }
    };

    FetchFavoritePokemons();
    console.log('UE2 brukes');
  }, [refresh]);

  return (
    <>
      <div className="page">
        {/* PokemonCard component */}
        <div className="componentContainer">
          {pokemonArray.map((pokemon) => (
            <PokemonCard
              name={pokemon.name}
              type={pokemon.types[0].type.name}
              imgURL={pokemon.sprites.front_default}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
        </div>

        {/*Favorited pokemon cards */}
        <div className="componentContainer">
          <h1>Favorites</h1>
          {favoriteArray.map((pokemon) => (
            <PokemonCard
              name={pokemon.name}
              type={pokemon.types[0].type.name}
              imgURL={pokemon.sprites.front_default}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default ComponentTestPage;
