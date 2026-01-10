import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getPokemons } from './services/pokeApi'
import { getPokemonId } from './utils/getPokemonId'
import { isPalindrome } from './utils/isPalindrome'

import { useNavigate } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  //Pokemons 
  const [pokemons, setPokemons] = useState([]);

  //Loading y error 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Debounce 
  const [search, setSearch] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  //Palindrome
  const [palindromeText, setPalindromeText] = useState('');
  const [isResultPalindrome, setResultPalindrome] = useState(null);


  const LIMIT = 15;
  const [offSet, setOffSet] = useState(0);

  const navigate = useNavigate();

  useEffect( () => {
    const fetchPokemons = async () => {

      try {

        setLoading(true);
        const data = await getPokemons(LIMIT, offSet);
        setPokemons(data);
        setFilteredPokemons(data);

      } catch (error) {
        setError(error.message)
      }finally{
        setLoading(false);
      }

    };

    fetchPokemons();
  }, [offSet]); 


  useEffect( () => {

    const timeOut = setTimeout( () => {
      const value = search.toLowerCase();

      const filtered = pokemons.filter ( (pokemon) =>
          pokemon.name.includes(value)
        ) ;

      setFilteredPokemons(filtered);

    }, 1500)

    return () => {
      clearTimeout(timeOut);
    } ;

  }, [search, pokemons]);

  //
  return (
    <>
      
      <h1 className='mb-10'>Pokemons</h1>

      {loading && <p>Cargando pokemons...</p>}

      <div>
        <input
          type='text'
          placeholder='Buscar pokemon...'
          value={search}
          onChange={ (e) => setSearch(e.target.value)}
      />

      </div>
      
    {!loading && !error && filteredPokemons.length === 0 && (
      <p>No se encontraron pokemons</p>
    )}

      {!loading && !error && (
        <ul className='grid justify-center'>

          {filteredPokemons.map( (pokemon) => {

              const id = getPokemonId(pokemon.url);
              return (
                <li
                  key={id}
                  className='mb-10'
                  onClick={ () => navigate(`/pokemon/${id}`)}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  />

                  <p>{pokemon.name}</p>
                </li>
              );

          }) 

          }

        </ul>
        )}


        {error && <p className='text-red-600'>{error}</p>}


        <div>
          <button
            onClick={ () => setOffSet ( (ant) => Math.max(ant - LIMIT, 0))}
            disabled= {offSet === 0}
          >
            Anterior
          </button>

          <p>{offSet}</p>

          <button
            onClick={ () => setOffSet ( (sig) => (sig + LIMIT))}
          >
            Siguiente
          </button>
        </div>


        <div className='mt-10 mb-10'>
          <h2>Verificador de palindromo </h2>

          <input
            type='text'
            placeholder='Escribe una palabra o frase'
            value={palindromeText}
            onChange={ (e) => {
              const value = e.target.value;
              setPalindromeText(value);
              setResultPalindrome(isPalindrome(value));

            }}
          />
        </div>

            {isPalindrome !== null && (
              <p>
                {
                  isResultPalindrome 
                  ? 'Es un palindromo'
                  : 'No es un palindromo'
                }
              </p>
            )}


    </>
  )
}

export default App
