import { useState} from 'react'
import { StyleSheet, Text, View ,TextInput} from 'react-native';
import PokemonList from './components/PokemonList';

export default function App() {
  const [pokeId, setPokeId] = useState('')
  

  const {pokemonName,pokemonType,pokemonDescription,pokemonMoves} = PokemonList(pokeId)
  //const upDateSearchBar = (value:string) =>(setPokeId(value))
  return (
    <View style = {styles.container}>
      <TextInput
      placeholder="Ingresa Dato"
      onChangeText={setPokeId}
      value = {pokeId}
      />
      
      <Text>{pokemonName}</Text>
      <Text>{pokemonType}</Text>
      <Text>{pokemonDescription}</Text>
      <Text>{pokemonMoves}</Text>
      
     
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:80,
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
