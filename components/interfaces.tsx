 
  export interface IEvolutionObject {
    evolves_to: [],
    species: {
      name: string,
      url: string
    }
  }

  export interface IPokemon {
    name: string,
  }

  export interface IPokemonMove {
    move: {
      name: string,
      url: string
    }
  }

  export interface IPokemonType {
    type: {
      name: string,
      url: string
    }
  }

  export interface IFlavorTextEntries {
    flavor_text:string,
    language: {
      name: string,
      url: string
    },
    version: {
      name: string,
      url: string
    },
  }

  export interface IDamageName {
    name: string
}

export interface IDamageRelation {
    name: string,
    double_damage_from:Array<IDamageName>,
    double_damage_to:Array<IDamageName>,
    half_damage_from:Array<IDamageName>,
    half_damage_to:Array<IDamageName>,
    no_damage_from:Array<IDamageName>,
    no_damage_to:Array<IDamageName>,
}