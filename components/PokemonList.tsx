import React, {useEffect, useState} from 'react';
import {SafeAreaView, View , Text, FlatList} from 'react-native';
import instanceApi from './InstanceApi';
import instanceDesct from './InstanceDesct';





export default function PokemonList(PokeId:string){
    const [pokemonName, setPokemonName] = useState();
    const [pokemonType, setPokemonType] = useState([]);
    const [pokemonDescription, setPokemonDescription] = useState();
    const [pokemonMoves, setPokemonMoves] = useState();
    const [evolutionChain, setEvolutionChain] = useState([]);

    


    
    useEffect(() => {
        const fetchPokemon = async ()=> {
            try {
                const {data} = await instanceApi.get(`/${PokeId}`);
                setPokemonName(data.name);
                const types = data.types.map(type=> type.type.name);
                setPokemonType(types.join(','));
                const moves = data.moves.map(move => move.move.name).sort();

                setPokemonMoves(moves.join(','))

                instanceDesct.get(`/${PokeId}`).then(datos => {
                    const desc = datos.data.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;
                    setPokemonDescription(desc);
                })

                
                
                console.log(pokemonDescription)


               
            }
            catch(error) {
                console.log(error);
            }
            
        }
        fetchPokemon();
        
    },[PokeId])
    
  
    

    return{
        pokemonName, 
        pokemonType,
        pokemonDescription,
        pokemonMoves,
        evolutionChain
    }

}

