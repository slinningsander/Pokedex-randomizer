import { useQuery } from "react-query";

export default function fetchPokemon(pokemonName: number | string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) =>
        res.json()
      ),
  });
  return { data, isLoading, error };
}
