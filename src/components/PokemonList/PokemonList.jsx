import './PokemonList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemonList, setPokemonList] = useState([]);
    const [nextUrl, setnextUrl] = useState(DEFAULT_URL);
    const [prevUrl, setprevUrl] = useState(DEFAULT_URL);

  const [pokedexUrl , setpokedexUrl] = useState(DEFAULT_URL);

  async function downloadPokemons() {
    const response = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT_URL);
  
    const pokemonResults = response.data.results;

    setnextUrl(response.data.next);
    setprevUrl(response.data.previous);

    const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
    const pokemonListData = await axios.all(pokemonPromise);

    const pokemonFinalList = pokemonListData.map(pokemonData => {
      const pokemon = pokemonData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types
      }
    });

    setPokemonList(pokemonFinalList);
  }

useEffect(() => {
  downloadPokemons();
}, [pokedexUrl]);


  return (
    <div className='pokemon-list-wrapper'>
      <div id="pokemon-list-header">Pokemon List</div>

    <div className="page-controls">
      <button onClick={() => setpokedexUrl(prevUrl)} >Prev</button>
      <button onClick={() => setpokedexUrl(nextUrl)}>next</button>
    </div>

      <div className='pokemon-list'>
      {pokemonList.map(pokemon => (
        <Pokemon 
          id={pokemon.id}
          name={pokemon.name} 
          key={pokemon.id} 
          url={pokemon.image} 
        />
      ))}
      </div>
    </div>
  );
}

export default PokemonList;
