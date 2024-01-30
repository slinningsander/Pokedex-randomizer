import PokemonCard from '../../components/PokemonCard/PokemonCard';
import './HomePage.css';
import { useCallback, useEffect, useState } from 'react';
import { FilerComponent } from '../../components/FilterComponent/FilterComponent';
import Pokemon from '../../types/typePokemon';
import { useQuery } from 'react-query';
import DD0 from '../../assets/DD0.gif';

export function HomePage() {
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>(() => {
    // Retrieve previously stored PokemonArray from session storage or initialize as an empty array
    const storedPokemonArray = sessionStorage.getItem('storedPokemonArray');
    return storedPokemonArray ? JSON.parse(storedPokemonArray) : [];
  });
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [filteredPokemonArray, setFilteredPokemonArray] = useState<Pokemon[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(() => {
    // Initialize selectedFilter with the value from sessionStorage, if available.
    const savedFilter = sessionStorage.getItem('selectedFilter');
    return savedFilter || 'all';
  });
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleStorageChange = () => {
    setRefresh(!refresh);
  };
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  useEffect(() => {
    const types = [...new Set(pokemonArray.map((pokemon) => pokemon.type))];
    setUniqueTypes(types);
  }, [pokemonArray]);

  window.addEventListener('storage', handleStorageChange);

  useEffect(() => {
    sessionStorage.setItem('selectedFilter', selectedFilter);
  }, [selectedFilter]);

  const handleRandomize = useCallback(() => {
    const generateRandomNumber = () => Math.floor(Math.random() * 151) + 1;
    const newRandomNumbers: number[] = [];
    while (newRandomNumbers.length < 10) {
      const randomNumber = generateRandomNumber();
      if (!randomNumbers.includes(randomNumber)) {
        newRandomNumbers.push(randomNumber);
      }
    }
    setRandomNumbers(newRandomNumbers);
    setSelectedFilter('all');
  }, [randomNumbers]); // Include randomNumbers in the dependency array for useCallback

  useEffect(() => {
    if (pokemonArray.length === 0) {
      handleRandomize();
    }
  }, [pokemonArray, handleRandomize]); // Trigger the initial fetch when pokemonArray is empty

  const fetchPokemonFromUrl = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const getRandomPokemon = async () => {
    const promises = randomNumbers.map((number) => fetchPokemonFromUrl(`https://pokeapi.co/api/v2/pokemon/${number}`));
    return Promise.all(promises);
  };

  // Get pokemon using useQuery and store them in pokemonArray
  const { refetch: refetchPokemon, isFetching } = useQuery('pokemon', getRandomPokemon, {
    enabled: !!randomNumbers.length,
    onSuccess: (data) => {
      const tempArray: Pokemon[] = [];
      data.forEach((pokemon) => {
        const dataToStore = {
          name: pokemon.name,
          type: pokemon.types[0].type.name,
          height: pokemon.height,
          sprite: pokemon.sprites.front_default,
          ability1: pokemon.abilities[0].ability.name,
          weight: pokemon.weight,
          hp: pokemon.stats[0].base_stat,
        };
        tempArray.push(dataToStore);
        sessionStorage.setItem(pokemon.name, JSON.stringify(dataToStore));
      });
      setPokemonArray(tempArray);
      setFilteredPokemonArray(tempArray); // Initialize filteredPokemonArray with all Pokémon

      sessionStorage.setItem('storedPokemonArray', JSON.stringify(tempArray));
    },
  });

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

  useEffect(() => {
    if (randomNumbers.length > 0) {
      refetchPokemon();
    }
  }, [randomNumbers, refetchPokemon]);

  return (
    <>
      <div className="page">
        <div className="options">
          <p className="optionText">Filter by type:</p>
          <FilerComponent selectedValue={selectedFilter} onFilterChange={setSelectedFilter} types={uniqueTypes} />
          <p className="optionText">Generate random Pokémon:</p>
          <button onClick={handleRandomize} className="button">
            <p>Generate</p>
          </button>
        </div>
        <div className="componentContainer">
          {isFetching ? (
            <div className="loadingBox">
              <img src={DD0} alt="Loading..." height={60} width={60} />
              <p>Generating new Pokémon...</p>
            </div>
          ) : (
            <>
              {filteredPokemonArray.map((pokemon) => (
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
              {filteredPokemonArray.length === 0 && (
                <p>No Pokémon found. Try changing the filter or generate new Pokemón.</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
