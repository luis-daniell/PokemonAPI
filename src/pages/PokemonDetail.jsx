import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PokemonDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect ( () => {

        const fetchPokemon = async() => {
            try {
                
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );

                if(!response.ok) throw new Error ('Error al cargar el pokemon');

                const data =  await response.json();
                setPokemon(data);
                console.log(data);
            } catch (error) {
                setError(error.message)
            }finally{
                setLoading(false);

            }

        }

        fetchPokemon();
    }, [id]);

     if (loading) return <p>cargando...</p>;
        if (error) return <p>{error}</p>;

    
     return (
        <div>
            <button
                onClick={ () => navigate(-1)}
            >
                Volver
            </button>

            <div>
                <h1>
                    {pokemon.name}
                </h1>
            </div>

        </div>
    ); 

}

export default PokemonDetail;