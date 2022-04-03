import React, {useEffect, useState} from 'react';
import './PokeCard.css';
import PokemonDataService from "../../service/pokemon.service";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
export function PokeCard() : JSX.Element {
    const [pokemonDetails,setPokemonDetails] = useState<Array<any>>([]);

    useEffect(() => {
        getMorePokemon();
    },[]);

    const getMorePokemon = () => {
        PokemonDataService.getPokemon(0,24).
        then(function (res:any) {
            if(res){
                getPokemonByUrl(res.data.results);
            }
        })
            .catch(function (error) {
                throw error;
            });
    }

    const getPokemonByUrl = (url:Array<any>) => {

       const pokemons = url.map(pokemon=>{
            const pokemonDetails = PokemonDataService.getPokemonByUrl(pokemon.url).then(function (res:any) {
                if(res){
                   return res.data
                }
            }).catch(function (error) {
                    throw error;
            });
            return pokemonDetails;
        })

        Promise.all(pokemons).then(pokemon=>{setPokemonDetails(pokemon)});
    }

    const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
        return (<PokemonDetails pokemon={pokemon} />);
    });

    return (
        <div >
            <div className="card-columns">
                {renderedPokemonList}
            </div>
        </div>
    );
}

