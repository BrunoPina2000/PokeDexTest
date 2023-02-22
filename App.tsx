import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import PokemonList from './components/PokemonList';

export default function App() {
  const [pokeId, setPokeId] = useState('');

  const {
    pokemonName,
    pokemonType,
    pokemonDescription,
    pokemonMoves,
    pokemonEvolution,
    pokemonDamageRelations,
  } = PokemonList(pokeId);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ingresa Dato"
        onChangeText={setPokeId}
        value={pokeId}
      />

      {pokeId === '' ? (
        <Text></Text>
      ) : (
        <View>
          <Text>{pokemonName}</Text>
          <Text></Text>
          <Text>{pokemonType}</Text>
          <Text></Text>
          <Text>{pokemonDescription}</Text>
          <Text></Text>
          <Text>{JSON.stringify(pokemonDamageRelations)}</Text>
          <Text></Text>
          <Text>{pokemonMoves}</Text>
          <Text></Text>
          <Text>{pokemonEvolution}</Text>
          
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});