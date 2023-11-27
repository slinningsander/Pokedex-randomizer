import { useEffect, useState } from 'react';
import { useQueries } from 'react-query';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Pokemon from '../../types/typePokemon';
import '../homePage/homePage.css';

const fetchPokemon = (pokemonName: number | string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => res.json());
};

const FavoritePokemonsPage = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [favoriteArray, setFavoriteArray] = useState<Pokemon[]>([]);
  const favorites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
  const handleStorageChange = () => {
    setRefresh(!refresh);
  };

  window.addEventListener('storage', handleStorageChange);

  const results = useQueries(
    favorites.map((favorite) => ({
      queryKey: ['pokemonData', favorite],
      queryFn: () => fetchPokemon(favorite),
    })),
  );

  useEffect(() => {
    if (results.every((result) => result.isSuccess)) {
      const tempArray = results.map((result) => {
        const data = result.data;
        return {
          name: data.name,
          type: data.types[0].type.name,
          height: data.height,
          sprite: data.sprites.front_default,
          ability1: data.abilities[0].ability.name,
          weight: data.weight,
          hp: data.stats[0].base_stat,
        };
      });
      if (tempArray.length !== favoriteArray.length) {
        setFavoriteArray(tempArray);
      }
    }
  }, [results, favoriteArray]);

  return (
    <>
      <div className="page">
        <h1 className="title">Favorites</h1>
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
          {favoriteArray.length === 0 && <p>You don't have any favorites yet</p>}
        </div>
      </div>
    </>
  );
};

export default FavoritePokemonsPage;
