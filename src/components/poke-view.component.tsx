export function PokeView({ pokemon }) {
  console.log(pokemon);
  return (
    <div
      style={{
        backgroundImage: `url(${pokemon.sprites.front_default})`,
        height: 300,
        width: 300,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
}
