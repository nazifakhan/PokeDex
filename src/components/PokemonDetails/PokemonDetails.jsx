import { useEffect, useState } from 'react';
import './PokemonDetails.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  async function downloadPokemons() {
    const POKEMON_DETAIL = 'https://pokeapi.co/api/v2/pokemon/';
    try {
      const response = await axios.get(POKEMON_DETAIL + id);
      const data = response.data;
      setPokemon({
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types,
        image: data.sprites.other.dream_world.front_default 
             || data.sprites.front_default
      });
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <>
   <h1 className='pokedex-redirect'>
    <Link to="/">
        Pokedex
    </Link>

   </h1>
      {pokemon && (
        <div className='pokemon-details-wrapper'>
          <div className='pokemon-detail-name'>{pokemon.name}</div>
          <div className='pokemon-image'><img src={pokemon.image} alt={pokemon.name} /></div>
          <div className='pokemon-attr'>
          <div>
              height: {pokemon.height} <br />
          </div>
           <div>
             weight: {pokemon.weight}   
           </div>
          </div>
          <div className='pokemon-types'>
            type: {pokemon.types.map(t => (
              <span key={t.type.name}>{t.type.name} </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonDetails;
