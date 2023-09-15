import { useQuery } from "react-query";

export default function fetch151Pokemon() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allpokemon"],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`).then((res) =>
        res.json()
      ),
  });
  return { data, isLoading, error };
}
