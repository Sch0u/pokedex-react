import React, { useEffect, useState } from 'react';
import { PokemonCard } from './pokemonCard';
import logo from '../assets/logo-pixel.gif';

export const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        async function loadPokemons() {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

            const jsonData = await response.json();

            return jsonData.results;
        }

        loadPokemons().then(data => {
            setPokemons(data);
        });
    }, []);

    function addToFav(pokemon) {
        setFavorites(favorites.concat(pokemon));
    }
    function removeFromFav(pokemon) {
        const newFavorites = favorites.filter(fav => fav.name !== pokemon.name);
        setFavorites(newFavorites);
        console.log(newFavorites, favorites);
    }

    return (
        <div>   
            <center>
                 <img src={logo} alt="logo" />
            </center>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Pokemons:</h2>
                            {pokemons.map((pokemon, index) => (
                            <PokemonCard key={index} pokemon={pokemon} onAddToFavorite={addToFav}></PokemonCard>
                        ))}
                    </div> 
                    <div className="col">
                        <h2>Favorite list:</h2>
                            {favorites.map((pokemon, index) => (
                            <PokemonCard key={index} pokemon={pokemon} onRemoveFromFavorite={removeFromFav}></PokemonCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
