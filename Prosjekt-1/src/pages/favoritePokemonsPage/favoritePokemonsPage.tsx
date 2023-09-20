import { useEffect, useState } from 'react';
import fetchPokemon from '../../services/fetchPokemon';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const FavoritePokemonsPage = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [favoriteArray, setFavoriteArray] = useState<any[]>([]);
  const favorites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
  const handleStorageChange = () => {
    setRefresh(!refresh);
  };

  //Runs the handleStorageChange function when a storage event occurs.
  //This is used to update the favoriteArray state when a pokemon is favorited/unfavorited.
  window.addEventListener('storage', handleStorageChange);

  useEffect(() => {
    // Looks up the names of the favorited pokemon in the favorites array and fetches the data for each pokemon.
    // Sets the favoriteArray state to the fetched pokemon, which is used to render the PokemonCard-components.
    const FetchFavoritePokemons = async () => {
      const tempArray = [];

      if (favorites !== null) {
        for (let i = 0; i < favorites.length; i++) {
          const data = await fetchPokemon(favorites[i]);
          tempArray.push(data);
        }
        if (tempArray.length !== favoriteArray.length) {
          setFavoriteArray(tempArray);
        }
      }
    };

    FetchFavoritePokemons();
    console.log('UE2 brukes');
  }, [refresh, favoriteArray, favorites]);

  return (
    <>
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
    </>
  );
};

export default FavoritePokemonsPage;
