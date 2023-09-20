import PokemonCard from '../../components/PokemonCard/PokemonCard';
import './componentTestPage.css';
import { useEffect, useState } from 'react';
import fetchPokemon from '../../services/fetchPokemon';
import { FilerComponent } from '../../components/FilterComponent/FilterComponent';
import Pokemon from '../../types/typePokemon';

export function ComponentTestPage() {
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
  const [filteredPokemonArray, setFilteredPokemonArray] = useState<Pokemon[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(() => {
    // Initialize selectedFilter with the value from sessionStorage, if available.
    const savedFilter = sessionStorage.getItem('selectedFilter');
    return savedFilter || 'all';
  });
  const [refresh, setRefresh] = useState<boolean>(true);
  // const favorites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
  const handleStorageChange = () => {
    setRefresh(!refresh);
  };

  window.addEventListener('storage', handleStorageChange);

  useEffect(() => {
    sessionStorage.setItem('selectedFilter', selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    // Fetches 10 random pokemon from the API and stores them in sessionStorage.
    // sessionStorage is used to avoid fetching the same pokemon multiple times when going to detailsScreen.
    // Also sets the pokemonArray state to the fetched pokemon, which is used to render the PokemonCard-components.
    const FetchPokemonData = async () => {
      const tempArray = [];
      for (let i = 1; i <= 10; i++) {
        const pokemonName = Math.floor(Math.random() * 151) + 1;
        const data = await fetchPokemon(pokemonName);
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
        sessionStorage.setItem(data.name, JSON.stringify(dataToStore));
      }

      setPokemonArray(tempArray);
      setFilteredPokemonArray(tempArray); // Initialize filteredPokemonArray with all Pokémon
    };

    FetchPokemonData();
  }, []);

  // Opens the favorites page in a new tab.
  const navigateToFavorites = () => {
    window.open('/details/favorites', '_blank');
  };
  useEffect(() => {
    function filterPokemon(pokemon: Pokemon) {
      if (selectedFilter === 'all') {
        return true;
      }
      return pokemon.type === selectedFilter;
    }
    const filteredArray = pokemonArray.filter(filterPokemon);
    setFilteredPokemonArray(filteredArray);
  }, [pokemonArray, selectedFilter]);

  return (
    <>
      <div className="page">
        <FilerComponent selectedValue={selectedFilter} onFilterChange={setSelectedFilter} />
        <div className="componentContainer">
          {filteredPokemonArray.map((pokemon) => (
            <PokemonCard
              name={pokemon.name}
              type={pokemon.type}
              imgURL={pokemon.sprite}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
          {filteredPokemonArray.length === 0 && <p>No Pokémon found</p>}
        </div>
        <button onClick={navigateToFavorites}>Favorites</button>
      </div>
    </>
  );
}

export default ComponentTestPage;
