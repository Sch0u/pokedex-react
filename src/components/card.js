import React, { useState, useEffect } from 'react'

export const Card = ({ pokemon }) => {
    const [pokemonAbilties, setPokemonAbilties] = useState([]);

    useEffect(() => {
        async function loadPokemonAbilities() {
            const response = await fetch(pokemon.url);

            const jsonData = await response.json();

            const abilitiesArray = jsonData.abilities;

            setPokemonAbilties(abilitiesArray);
            return abilitiesArray;
        }

        loadPokemonAbilities().then(abilities => {
            setPokemonAbilties(abilities);
        });
    }, []);
    
    return (
        <div className="card-continer">
            <a href={`https://www.pokemon.com/us/pokedex/${pokemon.name}`} target="_blank" rel="noreferrer">Read about {pokemon.name}</a>
            <ul>
                {pokemonAbilties.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>
        </div>
    )
}
