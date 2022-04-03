import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import './PokeCard.css';
import PokemonDataService from "../../service/pokemon.service";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

export function PokeCard() : JSX.Element {
    const [pokemonDetails,setPokemonDetails] = useState<Array<any>>([]);
    const [inputSearch, setValueInputSearch] = useState<number>(0);
    const [offset,setOffset] = useState<number>(0);
    const [limit] = useState<number>(3);

    const getMorePokemon = useCallback(() => {
        PokemonDataService.getPokemon(offset,limit).
        then(function (res:any) {
            if(res){
                getPokemonByUrl(res.data.results);
            }
        })
            .catch(function (error) {
                throw error;
            });
    },[offset,limit])

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
        const id = parseInt(event.target.value);
        setValueInputSearch(id)
    }

    const renderedPokemonList = pokemonDetails.filter((pokemon) => {
        if(!inputSearch){
            return pokemon;
        } else if (pokemon.id === inputSearch){
            return pokemon;
        } else {
            return false;
        }
    }).map(pokemon=>{
        return (<PokemonDetails key={pokemon.id} pokemon={pokemon}  />);
    });

    const  NextItem = () => {
            setOffset(offset + 3);
    }

    const  PreviousItem = () => {
        if(offset < 0 || offset > 1){
            setOffset(offset - 3);
        }
    }

    return (
        <>
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
                <div className="col-md-12 pb-2">
                    <button type="button" className="btn btn-primary btn-sm " key="previous" id="more-button" onClick={NextItem}>Next Item</button>
                </div>
                <div className="col-md-12">
                    <button type="button" className="btn btn-primary btn-sm " key="next" id="more-buttons" onClick={PreviousItem}>Previous Item</button>
                </div>
            </div>

        </>
    );
}

