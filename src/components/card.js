import React from 'react'

export const Card = props  => (
    <div className="card-continer">
        <a href={`https://www.pokemon.com/us/pokedex/${props.pokemon.name}`} target="_blank" rel="noreferrer">Read about {props.pokemon.name}</a>
    </div>
)

export default Card;