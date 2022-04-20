import React, { useEffect, useState } from 'react';
import { PokemonCard } from './pokemonCard';
import logo from '../assets/logo-pixel.gif';

export const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // UseEffect to fetch the data from the API
    useEffect(() => {
        async function loadPokemons() {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');

            const jsonData = await response.json();

            return jsonData.results;
        }

        loadPokemons().then(data => {
            setPokemons(data);
        });
    }, []);

    // UseEffect to load favorites
    useEffect(() => {
        if (localStorage.getItem('favorites') !== null) {
            setFavorites(JSON.parse(localStorage.getItem('favorites')));
        }
        else {
            setFavorites([]);
        }
    }, []);


    // Function to add pokemon to favorite
    function addToFav(pokemon) {
        console.log(pokemon)
        favorites.push(pokemon);

        setFavorites(favorites);

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Function to remove pokemon from favorite
    function removeFromFav(pokemon) {
        const index = favorites.findIndex(fav => fav.name === pokemon.name);

        favorites.splice(index, 1);

        setFavorites(favorites);

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Display of the two lists (Pokemon & Favorites)
    return (
        <div>   
            <center>
                 <img src={logo} alt="logo" />
            </center>
            <div className="container-fluid">
                <div className="row">
                    {/* Mapping of the pokemon list */}
                    <div className="col-md-6">
                        <h2>Pokemons:</h2>
                            {pokemons.map((pokemon, index) => (
                            <PokemonCard key={index} pokemon={pokemon} onAddToFavorite={addToFav}></PokemonCard>
                        ))}
                    </div> 
                    {/* Mapping of the favorit list */}
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
