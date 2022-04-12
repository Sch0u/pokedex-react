import React, { useEffect, useState } from 'react';
import Card from '../components/card';

export const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function loadPokemons() {
            var response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

            var jsonData = await response.json();

            var pokemons = jsonData.results 

            jsonData.results.forEach(async (pokemon, index) => {
                var res = await fetch(pokemon.url);
            
                var resJsonData = await res.json();
      
                pokemons[index].abilities = resJsonData.abilities;
      
              });

            return pokemons;
        }

        loadPokemons().then(res => setPokemons(res));
    }, []);

    function addTofav(pokemon) {
        return null
    }

    return (
        <div>
            <center>
                 <h1> Pokemons</h1> 
            </center>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                    {pokemons.map((pokemon, index) => (
                        <div className="card" key={index}>
                            <div className="card-body">
                            <a href={pokemon.url}>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt="pokemon"/>
                            </a>
                            <Card key="{pokemon.name}" pokemon={pokemon}></Card>
                            <h5 className="card-title">{pokemon.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                <p>Pokemon abilities:</p>
                                {pokemon.abilities.map((ability, index) => (
                                    <p key={index}>{ability.ability.name}</p>
                                ))}
                            </h6>
                            <button className="btn btn-danger" onClick={() => addTofav(pokemon)}>Add to favorites</button>
                            </div>
                        </div>
                        ))}
                    </div> 
                    <div className="col">
                        <h2>Favorite list</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
