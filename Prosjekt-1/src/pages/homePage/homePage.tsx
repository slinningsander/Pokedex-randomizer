import PokemonCard from '../../components/PokemonCard/PokemonCard';
import './homePage.css';
import { useCallback, useEffect, useState } from 'react';
import { FilerComponent } from '../../components/FilterComponent/FilterComponent';
import Pokemon from '../../types/typePokemon';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export function ComponentTestPage() {
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
  // const favorites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
  const handleStorageChange = () => {
    setRefresh(!refresh);
  };
  const navigate = useNavigate();

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
  const { refetch: refetchPokemon } = useQuery('pokemon', getRandomPokemon, {
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

  const navigateToFavorites = () => {
    navigate('/project1/details/favorites');
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
          <FilerComponent selectedValue={selectedFilter} onFilterChange={setSelectedFilter} />
          <p className="optionText">Go to favorites:</p>
          <button onClick={navigateToFavorites} className="button">
            <p>Favorites</p>
          </button>
          <p className="optionText">Generate random Pokémon:</p>
          <button onClick={handleRandomize} className="button">
            <p>Generate</p>
          </button>
        </div>
        <div className="componentContainer">
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
          {filteredPokemonArray.length === 0 && <p>No Pokémon found</p>}
        </div>
      </div>
    </>
  );
}

export default ComponentTestPage;
