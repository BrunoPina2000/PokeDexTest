import React, { useEffect, useState } from 'react';
import instanceApi from './InstanceApi';
import instanceDesct from './InstanceDesct';
import axios from 'axios';
import { IDamageRelation, IEvolutionObject, IFlavorTextEntries, IPokemonMove, IPokemonType } from './Interfaces';
import { AxiosPromise } from 'axios';

const dmg = async (tipo: string[]) => {
  const result:IDamageRelation[] = await Promise.all(tipo.map(async (url:string) => {
    const { data } = await axios.get(url);
    return data.damage_relations;
  }));
  return result.reduce((acc: any, curr: any) => {
    Object.entries(curr).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (!acc[key]) {
          acc[key] = [];
        }
        value.forEach((val: any) => {
          if (!acc[key].includes(val.name)) {
            acc[key].push(val.name);
          }
        });
      }
    });
    return acc;
  }, {});
};

let pokemones: string[] = [];

function evolution(pokemon: IEvolutionObject[]) {
  if (pokemon.length == 1) {
    pokemones.push(`${pokemon[0].species.name}`);
    evolution(pokemon[0].evolves_to);
  }
  if (pokemon.length > 1) {
    pokemon.forEach((pokemonForEach: IEvolutionObject) => {
      pokemones.push(`${pokemonForEach.species.name}`);
    });
  }
}

export default function PokemonList(PokeId: string) {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonDescription, setPokemonDescription] = useState('');
  const [pokemonMoves, setPokemonMoves] = useState('');
  const [pokemonEvolution, setPokemonEvolution] = useState([]);
  const [pokemonDamageRelations, setPokemonDamageRelations] = useState<IDamageRelation>();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await instanceApi.get(`/${PokeId}`);

        setPokemonName(data.name);

        const types = data.types.map((type: IPokemonType) => type.type.name);
        setPokemonType(types);

        const damageRelations: IDamageRelation = await dmg(data.types.map((type: IPokemonType) => type.type.url));
        setPokemonDamageRelations(damageRelations);

        const moves = data.moves.map((move: IPokemonMove) => move.move.name).sort();
        setPokemonMoves(moves.join(','));

        instanceDesct.get(`/${PokeId}`).then(async (evol:any) => {
          pokemones = [];
          const evolLine = evol.data.evolution_chain.url;
          const {data: chainchEvol} = await axios.get(evolLine);
          const chainchE = chainchEvol.chain;
          pokemones.push(chainchE.species.name);
          await evolution(chainchE.evolves_to);
          setPokemonEvolution(pokemones.join(' => '));
        });

        instanceDesct.get(`/${PokeId}`).then((datos: AxiosPromise) => {
          const desc = datos.data.flavor_text_entries.find((entry: IFlavorTextEntries) => entry.language.name === 'es').flavor_text;
          setPokemonDescription(desc);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, [PokeId]);

  return {
    pokemonName,
    pokemonType,
    pokemonDescription,
    pokemonMoves,
    pokemonEvolution,
    pokemonDamageRelations,
  };
}