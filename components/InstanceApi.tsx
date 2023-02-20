import axios from "axios";

const instanceApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
   
  });

export default instanceApi

