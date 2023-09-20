import { useEffect, useState } from 'react';
import fetchPokemon from '../../services/fetchPokemon';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Pokemon from '../../types/typePokemon';
import '../homePage/homePage.css';

const FavoritePokemonsPage = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [favoriteArray, setFavoriteArray] = useState<Pokemon[]>([]);
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
          const dataToStore = {
            name: data.name,
            type: data.types[0].type.name,
            height: data.height,
            sprite: data.sprites.front_default,
            ability1: data.abilities[0].ability.name,
            ability2: data.abilities[1].ability.name,
            weight: data.weight,
            hp: data.stats[0].base_stat,
          };
          tempArray.push(dataToStore);
        }
        if (tempArray.length !== favoriteArray.length) {
          setFavoriteArray(tempArray);
        }
      }
    };

    FetchFavoritePokemons();
  }, [refresh, favoriteArray, favorites]);

  return (
    <>
      <div className="page">
        <h1>Favorites</h1>
        {/*Favorited pokemon cards */}
        <div className="componentContainer">
          {favoriteArray.map((pokemon) => (
            <div className="component">
              <PokemonCard
                name={pokemon.name}
                type={pokemon.type}
                imgURL={pokemon.sprite}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritePokemonsPage;
