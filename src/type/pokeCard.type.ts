import React from "react";
import PokemonDataType from "./pokemon.type";

export default interface PokeCardType {
    setPokemonDetail? :  React.Dispatch<React.SetStateAction<PokemonDataType[]>>,
    setValueInputSearch?:  React.Dispatch<React.SetStateAction<number>>,
    setOffset?:  React.Dispatch<React.SetStateAction<number>>,
    limit?:number,
    inputSearch?:number,
    pokemonDetails?:PokemonDataType[],
    offset?: number
}