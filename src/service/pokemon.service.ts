import axios from 'axios';
import PokemonDataType from "../type/pokemon.type"
class PokemonDataService {
    getPokemon(offset:number,limit:number) {
        try {
            return axios.get<PokemonDataType>(`http://localhost:8080/pokemon/${offset}/${limit}`);
        } catch (error) {
            throw error
        }
    }
    getPokemonByUrl(url : string){
        try {
            return axios.get<PokemonDataType>(url);
        } catch (error) {
            throw error;
        }
    }
}
export default new PokemonDataService();