import PokemonCard from '../../components/PokemonCard/PokemonCard';
import './componentTestPage.css';
import { useEffect, useState } from 'react';
import fetchPokemon from '../../services/fetchPokemon';

export function ComponentTestPage() {
  const [pokemonArray, setPokemonArray] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  // const favorites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
  const handleStorageChange = () => {
    setRefresh(!refresh);
  };

  window.addEventListener('storage', handleStorageChange);

  useEffect(() => {
    // Fetches 10 random pokemon from the API and stores them in sessionStorage.
    // sessionStorage is used to avoid fetching the same pokemon multiple times when going to detailsScreen.
    // Also sets the pokemonArray state to the fetched pokemon, which is used to render the PokemonCard-components.
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

  // Opens the favorites page in a new tab.
  const navigateToFavorites = () => {
    window.open('/details/favorites', '_blank');
  };

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
              //Passes the setRefresh and refresh states to the PokemonCard component.
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
        </div>
        <div>
          <button onClick={navigateToFavorites}>Favorites</button>
        </div>
      </div>
    </>
  );
}
export default ComponentTestPage;
