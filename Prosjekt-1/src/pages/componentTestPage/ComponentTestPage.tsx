import PokemonCard from '../../components/PokemonCard/PokemonCard';
import './componentTestPage.css';
import { useEffect, useState } from 'react';
import fetchPokemon from '../../services/fetchPokemon';
import { FilerComponent } from '../../components/FilterComponent/FilterComponent';

export function ComponentTestPage() {
  const [pokemonArray, setPokemonArray] = useState<any[]>([]);
  const [filteredPokemonArray, setFilteredPokemonArray] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(() => {
    // Initialize selectedFilter with the value from sessionStorage, if available.
    const savedFilter = sessionStorage.getItem('selectedFilter');
    return savedFilter || 'all';
  });

  useEffect(() => {
    sessionStorage.setItem('selectedFilter', selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
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
        };
        tempArray.push(dataToStore);
        sessionStorage.setItem(data.name, JSON.stringify(dataToStore));
      }

      setPokemonArray(tempArray);
      setFilteredPokemonArray(tempArray); // Initialize filteredPokemonArray with all Pokémon
    };

    FetchPokemonData();
  }, []);

  useEffect(() => {
    function filterPokemon(pokemon: any) {
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
            <PokemonCard name={pokemon.name} type={pokemon.type} imgURL={pokemon.sprite} />
          ))}
          {filteredPokemonArray.length === 0 && <p>No Pokémon found</p>}
        </div>
      </div>
    </>
  );
}
export default ComponentTestPage;
