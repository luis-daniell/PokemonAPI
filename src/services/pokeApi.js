
export const getPokemons = async (limit, offSet = 10) => {

    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offSet}`
    );

    const data = await response.json();

    return data.results; 
};