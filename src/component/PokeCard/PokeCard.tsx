import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import './PokeCard.css';
import PokemonDataService from "../../service/pokemon.service";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

export function PokeCard() : JSX.Element {
    const [pokemonDetails,setPokemonDetails] = useState<Array<any>>([]);
    const [inputSearch, setValueInputSearch] = useState<String>("");

    const getMorePokemon = useCallback(() => {
        PokemonDataService.getPokemon(0,24).
        then(function (res:any) {
            if(res){
                getPokemonByUrl(res.data.results);
            }
        })
            .catch(function (error) {
                throw error;
            });
    },[])

    useEffect(() => {
        getMorePokemon();
    },[getMorePokemon]);

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

    const handleChange = (event: ChangeEvent<{ value: string }>) => {
        setValueInputSearch(event.target.value)
    }

    const renderedPokemonList = pokemonDetails.filter((pokemon) => {
        if(!inputSearch){
            return pokemon;
        } else if (pokemon.name.toLocaleLowerCase().includes(inputSearch.toLowerCase())){
            return pokemon;
        } else {
            return false;
        }
    }).map(pokemon=>{
        return (<PokemonDetails pokemon={pokemon} />);
    });

    return (
        <div className="container">
            <div className="row d-flex justify-content-center pb-2">
                <div>
                    <input type="text" className="form-control" onChange={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="card-columns">
                    {renderedPokemonList}
                </div>
            </div>
        </div>
    );
}

