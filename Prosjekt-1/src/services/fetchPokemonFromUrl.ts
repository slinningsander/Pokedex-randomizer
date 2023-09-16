import { useQuery } from "react-query";

export default function fetchPokemonFromUrl(url: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: [url],
    queryFn: () => fetch(url).then((res) => res.json()),
  });
  return { data, isLoading, error };
}
