import axios from "axios";


const instanceDesct = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon-species',
   
  });

export default instanceDesct