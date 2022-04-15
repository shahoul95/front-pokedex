import PokemonDataType from "../type/pokemon.type";
import {AxiosResponse} from "axios";
export default interface ApiResponsePokemon {
    data:AxiosResponse<PokemonDataType>
}