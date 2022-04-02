import React, {useEffect} from 'react';
import './PokeCard.css';
import axios from 'axios';

export function PokeCard() {

    useEffect(() => {
        getMorePokemon();
    });

    const getMorePokemon = () => {
        axios.get(`http://localhost:8080/pokedata/pokemon/3/3`)
            .then(function (res: any) {
              console.log(res);
            })
            .catch(function (error) {
                throw error;
            });
    }

    return (
        <div className="PokeCard">

        </div>
    );
}
