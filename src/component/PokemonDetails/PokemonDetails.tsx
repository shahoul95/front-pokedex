import React, {FC} from 'react';
import PokemonDataType from "../../type/pokemon.type";
const  PokemonDetails: FC<PokemonDataType> = ({id,name,weight,height,sprites}) =>{
    return (
        <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}} key={id}>
            <div className="card-header"><b>{name}</b></div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Id: {id}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Height: {height}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Weight: {weight}</h6>
                <img src={sprites['front_default']} alt={"pokemonFront"}/>
                <img src={sprites['back_default']}alt={"pokemonBack"} />
            </div>
        </div>
    )
};

export default PokemonDetails;