import React, { useState, useEffect } from 'react'

export const PokemonCard = ({ pokemon, onAddToFavorite, onRemoveFromFavorite }) => {
    const [pokemonProps, setPokemonProps] = useState();

    useEffect(() => {
        async function loadPokemonProps() {
            const response = await fetch(pokemon.url);
            
            const jsonData = await response.json();
            
            setPokemonProps(jsonData);
            return jsonData;
        }

        loadPokemonProps().then(props => {
            setPokemonProps(props);
        });
    }, []);

    if(!pokemonProps) return null;
    return (
        <div className="card">
            <div className="card-body">
                <a href={pokemonProps.sprites.front_default}>
                    <img src={pokemonProps.sprites.front_default} alt="pokemon"/>
                </a>
                <h5 className="card-title">{pokemonProps.name.toUpperCase()}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    <p>Pokemon abilities:</p>
                </h6>
                <div className="card-continer">
                    <ul>
                        {pokemonProps.abilities.map((ability) => (
                         <li key={ability.ability.name}>{ability.ability.name}</li>
                        ))}
                     </ul>
                    <a href={`https://www.pokemon.com/us/pokedex/${pokemonProps.name}`} target="_blank" rel="noreferrer">Read about {pokemonProps.name}</a>
                 </div>
                 { onAddToFavorite !== undefined ? <button className="btn btn-danger" onClick={()=>onAddToFavorite(pokemon)}>Add to favorites</button> : 
                 <button className="btn btn-danger" onClick={()=>onRemoveFromFavorite(pokemon)}>Remove from favorites</button> }
            </div>
        </div>
    )
}
