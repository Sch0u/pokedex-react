import React, { useEffect, useState } from 'react';
import { Card } from './card';
import logo from '../assets/logo-pixel.gif'

export const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [favPokemons, setFavPokemons] = useState([]);

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

    // setFavPokemons(JSON.parse(localStorage.getItem("favPokemons")))

    function addTofav(pokemon) {
        localStorage.setItem("favPokemons",JSON.stringify(pokemon))
    }

    function removeFromFav(pokemon) {
        let tmp = JSON.parse(localStorage.getItem("favPokemons"))
        let index = tmp.indexOf(pokemon)
        if (index > -1) {
            tmp.slice(index, 1)
        }
        localStorage.clear()
        localStorage.setItem("favPokemons", tmp)
    }

    return (
        <div>
            <center>
                 <img src={logo}></img>
            </center>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                    {pokemons.map((pokemon, index) => (
                        <div className="card" key={index}>
                            <div className="card-body">
                            <h5 className="card-title">{pokemon.name}</h5>
                                <a href={pokemon.url}>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt="pokemon"/>
                                </a>
                                <Card key="{pokemon.name}" pokemon={pokemon}></Card>
                                <h6 className="card-subtitle mb-2 text-muted"></h6>
                                <button className="btn btn-danger" onClick={() => addTofav(pokemon)}>Add to favorites</button>
                            </div>
                        </div>
                        ))}
                    </div> 
                    <div className="col-md-6">
                    <h2>Favorites</h2>
                    {/* {favPokemons.map((pokemon, index) => (
                        <div className="card" key={index}>
                            <div className="card-body">
                            <h5 className="card-title">{pokemon.name}</h5>
                                <a href={pokemon.url}>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt="pokemon"/>
                                </a>
                                <Card key="{pokemon.name}" pokemon={pokemon}></Card>
                                <h6 className="card-subtitle mb-2 text-muted"></h6>
                                <button className="btn btn-danger" onClick={() => removeFromFav(pokemon)}>Add to favorites</button>
                            </div>
                        </div>
                        ))} */}
                    </div> 
                </div>
            </div>
        </div>
    )
}
