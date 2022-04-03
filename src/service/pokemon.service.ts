import axios from 'axios';
import PokemonDataType from "../type/pokemon.type"
class PokemonDataService {
    getPokemon(offset:number,limit:number) {
        return axios.get<PokemonDataType>(`http://localhost:8080/pokedata/pokemon/${offset}/${limit}`);
    }
}
export default new PokemonDataService();