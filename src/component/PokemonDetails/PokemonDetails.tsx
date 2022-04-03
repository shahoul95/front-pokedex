import React from 'react';

const  PokemonDetails = ({pokemon}:any) =>{
    return (
        <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}} key={pokemon.id}>
            <div className="card-header"><b>{pokemon.name}</b></div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Id: {pokemon.id}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Height: {pokemon.height}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Weight: {pokemon.weight}</h6>
                <img src={pokemon.sprites['front_default']} alt={"pokemonFront"}/>
                <img src={pokemon.sprites['back_default']}alt={"pokemonBack"} />
            </div>
        </div>
    )
};

export default PokemonDetails;