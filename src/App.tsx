import { useEffect, useState } from "react";
import "./App.css";
import { PokeView } from "./components/poke-view.component";

function App() {
  const [pokemon, setPokemon] = useState(undefined);
  const [pokemons, setPokemons] = useState([]);
  const [index, setIndex] = useState<number>(0);
  const api = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  useEffect(() => {
    // Fetch the initial list of Pokémon
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data has a 'results' array and you want the URL of the first Pokémon
        const firstPokemonUrl = data.results[index].url;
        setPokemons(data.results);

        // Fetch the details of the first Pokémon
        return fetch(firstPokemonUrl);
      })
      .then((response) => response.json())
      .then((pokemonDetails) => {
        setPokemon(pokemonDetails);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, [index]);

  const handleIndex = (next: boolean = true) => {
    setIndex((i) =>
      next ? Math.min(pokemons.length, i + 1) : Math.max(0, i - 1)
    );
  };

  if (!pokemon || !pokemons.length) {
    return <span>Loading ...</span>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20" }}>
      <PokeView pokemon={pokemon} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => handleIndex(false)}> {"<"} </button>
        <span>{pokemons[index].name}</span>
        <button onClick={() => handleIndex()}> {">"} </button>
      </div>
    </div>
  );
}

export default App;
