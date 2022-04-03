import React, {useEffect} from 'react';
import './PokeCard.css';
import PokemonDataService from "../../service/pokemon.service";
export function PokeCard() : JSX.Element {

    useEffect(() => {
        getMorePokemon();
    });

    const getMorePokemon = () => {
      PokemonDataService.getPokemon(3,3).
      then(function (res:any) {
        console.log(res.data.results);
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

