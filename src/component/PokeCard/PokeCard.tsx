import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import './PokeCard.css';
import PokemonDataService from "../../service/pokemon.service";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import PokemonDataType from "../../type/pokemon.type";
import PokeCardType from "../../type/pokeCard.type"
import {AxiosResponse} from "axios";

const  PokeCard: FC<PokeCardType> = () => {
    const [pokemonDetails,setPokemonDetails] = useState<Array<PokemonDataType>>([]);
    const [inputSearch, setValueInputSearch] = useState<number>(0);
    const [offset,setOffset] = useState<number>(0);
    const [limit] = useState<number>(3);

    const getPokemonByUrl = async (url:Array<{url:string}>) :  Promise<void | PokemonDataType[]>=> {
        const pokemonUrls = url.map(pokemon=>{
            return PokemonDataService.getPokemonByUrl(pokemon.url).then((res : AxiosResponse<PokemonDataType>) => {return res.data})
        })
        return await Promise.all<PokemonDataType>(pokemonUrls).then(pokemon=>{setPokemonDetails(pokemon)});
    }

    const getMorePokemon = useCallback(() => {
        PokemonDataService.getPokemon(offset,limit)
        .then(function (res:any) {
            if(res){
               return getPokemonByUrl(res.data.results);
            }
        })
            .catch(function (error) {
                throw error;
            });
    },[offset,limit])

    useEffect(() => {
        getMorePokemon();
    },[getMorePokemon]);

    const handleChange = (event: ChangeEvent<{ value: string }>) => {
        const id = parseInt(event.target.value);
        setValueInputSearch(id)
    }

    const renderedPokemonList = pokemonDetails.filter((pokemon : PokemonDataType) => {
        if(!inputSearch){
            return pokemon;
        } else if (pokemon.id === inputSearch){
            return pokemon;
        } else {
            return false;
        }
    }).map(pokemon=>{
        return (<PokemonDetails key={pokemon.id} id={pokemon.id} name={pokemon.name}
                                height={pokemon.height} weight={pokemon.weight}
                                sprites={pokemon.sprites}  />);
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
                        <label form="idPokemon"> Numéro ID :</label>
                        <input type="text" name="idPokemon" className="form-control" onChange={handleChange}/>
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
export default PokeCard;

