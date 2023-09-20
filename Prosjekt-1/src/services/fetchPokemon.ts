
const fetchPokemon = (pokemonName: number|string ) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) =>
    res.json()
  );
};


export default fetchPokemon;
