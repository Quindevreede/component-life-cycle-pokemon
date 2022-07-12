import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './components/pokemon/Pokemon';
import Button from './components/button/Button';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      toggleLoading(true);
      setError(false);

      try {
        const { data } = await axios.get(endpoint);
        setPokemons(data);
      } catch(e) {
        console.error(e);
        setError(true);
      }

      toggleLoading(false);
    }

    fetchData();
  }, [endpoint]);

  return (
    <div className="poke-deck">
      {pokemons &&
        <>
          <img alt="logo" width="400px" src={logo} />
          <section className="button-bar">
            <Button
              disabled={!pokemons.previous}
              clickHandler={() => setEndpoint(pokemons.previous)}
            >
              Vorige
            </Button>
            <Button
              disabled={!pokemons.next}
              clickHandler={() => setEndpoint(pokemons.next)}
            >
              Volgende
            </Button>
          </section>

          {pokemons.results && pokemons.results.map((pokemon) => {
            return <Pokemon key={pokemon.name} endpoint={pokemon.url} />
          })}
        </>
      }
      {loading && <p>Loading...</p>}
      {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
    </div>
  );
}

export default App;
