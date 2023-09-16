import PokemonCard from "../../components/PokemonCard/PokemonCard";
import "./componentTestPage.css";
import { useEffect, useState } from "react";
import fetchPokemon from "../../services/fetchPokemon";

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
    };

    FetchPokemonData();

    
  }, []);
  

  return (
    <>
      <div className="page">

        {/* PokemonCard component */}
          <div className="componentContainer">
            {pokemonArray.map((pokemon) => (
              <PokemonCard
                
                name={pokemon.name}
                type={pokemon.types[0].type.name}
                isFavorite={false}
                imgURL={pokemon.sprites.front_default}
                
              />
            ))
            }
          </div>
          <div className="componentContainer">
            {/*Some component*/}
          </div>
      </div>
    </>
  );
}
export default ComponentTestPage;
