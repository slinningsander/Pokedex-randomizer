/* eslint-disable @typescript-eslint/no-explicit-any */
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import './componentTestPage.css';
import { useEffect, useState } from 'react';
import fetchPokemon from '../../services/fetchPokemon';
import { FilerComponent } from '../../components/FilterComponent/FilterComponent';

// import {catadoze} from "./src/assets/catadoze.jpg";
// import "./src/assets/catadoze.jpg" as catadoze;
//this page is ment to view and develop React components
//eventualy it should be an overview of all components

//There is a dashed border around the component container div
export function ComponentTestPage() {
  // const getPokemonTest = (name: number | string) => {
  //     const data = JSON.stringify(fetchPokemon("charmander").data)
  //     console.log(JSON.stringify(data));
  //     sessionStorage.setItem("listOfPokemon", JSON.stringify(data));
  // };

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
      setFilteredPokemonArray(tempArray); // Initialize filteredPokemonArray with all Pokémon
    };

    FetchPokemonData();
  }, []);

  useEffect(() => {
    const filteredArray = pokemonArray.filter(filterPokemon);
    setFilteredPokemonArray(filteredArray);
  }, [filterPokemon, pokemonArray, selectedFilter]);

  function filterPokemon(pokemon: any) {
    if (selectedFilter === 'all') {
      return true;
    }
    return pokemon.types[0].type.name === selectedFilter;
  }

  return (
    <>
      <div className="page">
        {/* Filter component */}
        <FilerComponent selectedValue={selectedFilter} onFilterChange={setSelectedFilter} />
        {/* PokemonCard component */}
        <div className="componentContainer">
          {filteredPokemonArray.map((pokemon) => (
            <PokemonCard name={pokemon.name} type={pokemon.types[0].type.name} imgURL={pokemon.sprites.front_default} />
          ))}
          {filteredPokemonArray.length === 0 && <p>No Pokémon found</p>}
        </div>
      </div>
    </>
  );
}
export default ComponentTestPage;
