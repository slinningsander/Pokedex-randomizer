

type PokemonScreenTemplateProps = {
    name: string;
    type: string;
    height: number;
    weight: number;
    abilities: string[];
    moves: string[];
};

const PokemonScreenTemplate = ({ name, type, height, weight, abilities }: PokemonScreenTemplateProps) => {

    const pokemonName = sessionStorage.getItem("pokemonName");

    return (
        <>
            <h1>{name}</h1>
            <h2>{type}</h2>
            <h3>{height}</h3>
            <h3>{weight}</h3>
            <h3>{abilities}</h3>
        </>
    )
};

export default PokemonScreenTemplate;

/*
Name
Type
Height
Weight
Abilities
Moves
*/