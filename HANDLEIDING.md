HANDLEIDING POKEMON APP:
------------------------

STAP 0 - OPZET :
---

## De applicatie starten
Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de node_modules door het volgende commando in de terminal te runnen:

`npm install`

Wanneer dit klaar is, kun je de applicatie starten met behulp van:

`npm start`

We gaan eerst een simpele basis in App.js maken, die we verder kunnen uitbouwen:

App.js:
-
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/')

  return (
    <div className="poke-deck">
        <>
          <img alt="logo" width="400px" src={logo} />
          <section className="button-bar">
            <Button>
              Vorige
            </Button>
            <Button>
              Volgende
            </Button>
          </section>
        </>
      }
    </div>
  );
}

export default App;

We hebben dus een basis App.js met daarin al het logo en een Vorige en Volgende Button.
Wat hebben we eigenlijk nodig voor deze App?
- Een COMPONENT voor die VORIGE en VOLGENDE BUTTONS natuurlijk!
- MAAR nog belangrijker een COMPONENT die een POKEMON bevat!
LET OP : We hebben dus wel al één USE-STATE in de App.js staan:
  const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
Dit endpoint gebruiken we dus om een pokemon op te halen uit de API

We gaan dus beginnen met dat POKEMON COMPONENT

-----

STAP 1 - OPZET POKEMON.JS :
---

DE VOLGENDE CODE IS DE ABSOLUTE BASIS CODE VOOR DIT COMPONENT:

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';

function Pokemon({ endpoint }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    console.log(endpoint);
    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint);
        setPokemon(data);
      } catch(e) {
        console.error(e);
      }
    }

    fetchData();
  }, [endpoint]);


  return (
    <section className="poke-card">
        <>
        <h2> ? </h2>
        <img
          alt="Afbeelding pokémon"
          src= ?
        />
        <p><strong>Moves: </strong> ? </p>
        <p><strong>Weight: </strong> ? </p>
        <p><strong>Abilities: </strong> ? </p>
        <ul>
             <li> ? </li>
        </ul>
        </>
      }
    </section>
  );
}

export default Pokemon;

Hier hebben we dus de code met lege waarden voor het weergeven en data ophalen
voor een pokemon kaart van de API. Je had dus al de ENDPOINT waarde met een USE-STATE in App.js
  const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
 Die kunnen we nu gebruiken om met axios bij de API een pokemon op te halen en in de
 USE-STATE voor setPokemon te zetten:

  useEffect(() => {
    console.log(endpoint);
    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint);
        setPokemon(data);
      } catch(e) {
        console.error(e);
      }
    }

    fetchData();
  }, [endpoint]);

Bij de useEffect maken we dus een const { data } OBJECT aan met de DATA die we
uit de axios.get op de ENDPOINT https://pokeapi.co/api/v2/pokemon/ halen
en SETTEN als setPokemon zodat in de STATE nu dit individuele pokemon object staat
Dus de UseEffect is GE-UPDATE met de inhoud van dit object.

In de RETURN staan allemaal LEGE ELEMENTEN (met ?) die we kunnen vullen met de
DAT uit ons net UPGEDATE OBJECT pokemon

BIJ DE ONDERSTAANDE CODE HEBBEN WE ALLES INGEVULD
We gaan deze code uit elkaar trekken zodat je kunt zien wat er gebeurd:

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';

function Pokemon({ endpoint }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    console.log(endpoint);
    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint);
        setPokemon(data);
      } catch(e) {
        console.error(e);
      }
    }

    fetchData();
  }, [endpoint]);

  return (
    <section className="poke-card">
      {pokemon &&
        <>
        <h2>{pokemon.name}</h2>
        <img
          alt="Afbeelding pokémon"
          src={pokemon.sprites.front_default}
        />
        <p><strong>Moves: </strong>{pokemon.moves.length}</p>
        <p><strong>Weight: </strong>{pokemon.weight}</p>
        <p><strong>Abilities: </strong></p>
        <ul>
          {pokemon.abilities.map((ability) => {
            return (
              <li key={`${ability.ability.name}-${pokemon.name}`}>
                {ability.ability.name}
              </li>
            )
          })}
        </ul>
        </>
      }
    </section>
  );
}

export default Pokemon;

--- Hieronder dus de uit elkaar getrokken code:
DEEL 1:

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';
// Dit zijn allemaal standaard imports

function Pokemon({ endpoint }) {
  const [pokemon, setPokemon] = useState(null);
// Je kunt dus bij { endpoint } omdat die een NIVEAU HOGER staat (in App.js)

  useEffect(() => {
    console.log(endpoint);
    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint);
        setPokemon(data);
      } catch(e) {
        console.error(e);
      }
    }

    fetchData();
  }, [endpoint]);

// Je UPDATE dus met USE-EFFECT de STATE van pokemon met setPokemon
   Bij de useEffect maken we dus een const { data } OBJECT aan met de DATA die we
   uit de axios.get op de ENDPOINT https://pokeapi.co/api/v2/pokemon/ halen
   en SETTEN als setPokemon zodat in de STATE nu dit individuele pokemon object staat
   Dus de UseEffect is GE-UPDATE met de inhoud van dit object.

// Side note: wanneer dit component voor het eerst wordt gerenderd,
   zul je de POKEMONS al in de console zien verschijnen,
   ondanks het feit dat je nog op geen enkele knop hebt gedrukt.
   Dit komt omdat het aanmaken van de state, waarin de waarde van pokemon van "niks"
   naar haar initiële waarde (0) wordt veranderd, ook telt als een update.

DEEL 2:

ALS (pokemon &&) er een set pokemon is gevonden en er dus data van de pokemon uit de API
gehaald kon worden maakt de return ELEMENTEN aan in de <section> met de className "poke-card"

 return (
    <section className="poke-card">
      {pokemon &&
        <>
        <h2>{pokemon.name}</h2>
        <img
          alt="Afbeelding pokémon"
          src={pokemon.sprites.front_default}
        />
        <p><strong>Moves: </strong>{pokemon.moves.length}</p>
        <p><strong>Weight: </strong>{pokemon.weight}</p>
        <p><strong>Abilities: </strong></p>
        <ul>
          {pokemon.abilities.map((ability) => {
            return (
              <li key={`${ability.ability.name}-${pokemon.name}`}>
                {ability.ability.name}
              </li>
            )
          })}
        </ul>
        </>
      }
    </section>
  );
}

export default Pokemon;

We halen dan pokemon.name voor de TITEL <h2>{pokemon.name}</h2>
We halen dan pokemon.sprites.front_default voor AFBEELDING <img src=>
We halen dan AANTAL MOVES pokemon.moves.length voor <p> moves
We halen dan WEIGHT pokemon.weight voor <p> weight

We halen dan ABILITIES op en zetten deze in een <ul> Unordered LIST
We geven de <ul> een MAP METHODE mee die <li> LIST items erin zet en
ZORGT met li KEY dat er een KEY per <li> instaat zodat WEBSTORM deze
niet door elkaar haalt. IN de LIST ITEMS wordt dus met MAP de beschikbare
ability.ability.name <li>'s erin gezet. Soms is dat er één soms twee soms drie

        <ul>
          {pokemon.abilities.map((ability) => {
            return (
              <li key={`${ability.ability.name}-${pokemon.name}`}>
                {ability.ability.name}
              </li>

-----

STAP 2 - OPZET BUTTON.JS :
---

import React from 'react';
import './Button.css';

function Button({ children, clickHandler, disabled }) {
  return (
    <button
      type="button"
      className="nav-button"
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

We hebben hier dus de volgende dingen in de function meegegeven:
function Button({ children, clickHandler, disabled }) {

Dus een EVENT lISTENER (clickhandler)
    een OFF SETTING (disabled)
    access tussen >< van BUTTON (children)

Je hebt nu dus een STANDAARD BUTTON COMPONENT

-----

STAP 3 - OPZET APP.JS :
---

We geven hieronder de volledige code voor App.js en halen die vervolgens uit
elkaar en geven hier uitleg bij:

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
-

DEEL 1:

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './components/pokemon/Pokemon';
import Button from './components/button/Button';
import logo from './assets/logo.png';
import './App.css';

// We maken dus IMPORTS,
   - we hebben useState en useEffect nodig van 'react'
   - we hebben axios nodig om DATA uit de API te kunnen halen
   - we hebben de COMPONENTS
     > Pokemon.js
     > Button.js nodig
   - we hebben het LOGO (img) nodig bovenaan onze pagina
   - we hebben de CSS nodig

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState(false);

// We maken ook de USE-STATES,
   - we hebben setPokemons voor een STATE van pokemons
   (LET OP de s, dus andere useState dan [pokemon, usePokemon] uit Pokemon.js!!!)
   - we hebben setEndpoint voor een STATE van endpoint,
     die we gebruiken om voor elke pokemon kaart een endpoint te geven
   - we hebben toggleLoading voor een STATE loading,
     deze gaan we gebruiken om op de pagina weer te geven als de pagina nog bezig is met laden
   - we hebben setError voor een STATE error,
     die we gebruiken om een ERROR op de pagina weer te geven

DEEL 2:

  useEffect(() => {
    async function fetchData() {
      toggleLoading(true);
      setError(false);

// We maken dus een useEffect met [endpoint] (dus een UPDATE useEffect)
   deze geven we een async function fetchData() mee die dus wacht tot er een UPDATE plaatsvind
   We zetten de toggleLoading op TRUE, dus ZOLANG de function LOOPT staat loading op TRUE
   We zetten de setError op FALSE, dus ALS de Function begint gaat de ERROR op FALSE (tot we error tegenkomen)

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

// We maken een VARIABLE aan waar we de { data } uit de API inzetten
   We gebruiken dit DATA OBJECT om setPokemons mee te vullen
   ALS er iets FOUT GAAT geeft de CATCH een ERROR in de CONSOLE en setError gaat op TRUE
   Als alles tot nu toe goed is gegaan is het PROCES klaar en kan de LOADING OFF(toggleLoading false)
   We halen nu met fetchData() op
   en zorgen dat met [endpoint] dat er geen INFINITE LOOP ontstaat

DEEL 3:

  return (
    <div className="poke-deck">
      {pokemons &&
        <>
          <img alt="logo" width="400px" src={logo} />

// We maken hier dus een RETURN met daarin een <div> met class "poke-deck"
   ALS er pokemons gevonden zijn en met setPokemon in de STATE zijn gezet {pokemons &&
   DAN maken we de rest van de ELEMENTEN aan <> t/m </> en ook </div> aan het eind
   Ook zetten we de IMG uit onze ASSETS MAP erin

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

// Vervolgens maken we een BUTTON BAR aan
   Eerst de VORIGE BUTTON
   Deze staat op DISABLED als er GEEN previous is (!pokemons.previous)
   We zetten de TEXT "Vorige" erop

   Daarna de VOLGENDE BUTTON
   Deze staat op DISABLED als er GEEN next is (!pokemons.next)
   We zetten de TEXT "Volgende" erop

          {pokemons.results && pokemons.results.map((pokemon) => {
            return <Pokemon key={pokemon.name} endpoint={pokemon.url} />
          })}
        </>
      }
      {loading && <p>Loading...</p>}
      {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
    </div>

// Nu gaan we de pokemon kaarten op de page weergeven
   ALS er pokemons.results zijn DAN (&&) gaan we met MAP METHOD de pokemon kaarten op de Site zetten
   Het COMPONENT Pokemon wordt nu aangesproken
   LET OP deze krijgen een KEY mee (met pokemon.name) zodat WEBSTORM de kaarten uit elkaar kan houden
   LET OP deze krijgen ook een ENDPOINT mee die met de URL van de volledige API page meegeeft in het COMPONENT Pokemon.js
   UITLEG:
   'https://pokeapi.co/api/v2/pokemon/' dit is de originele ENDPOINT dus dit is page 0 (je hebt geen page -1)
   Dus dit is de page waar je begint en de endpoint die HIER --> return <Pokemon key={pokemon.name} endpoint={pokemon.url} />
   wordt meegegeven en dus deze meegeeft in Pokemon.js ALS je echter op VORIGE of VOLGENDE BUTTON drukt wordt met setEndpoint
   een andere ENDPOINT geSET. dus dan haalt --> return <Pokemon key={pokemon.name} endpoint={pokemon.url} /> uit een andere ENDPOINT

   ----

   DUS ; MEGA SAMENGEVAT:

   We hebben een COMPONENT Pokemon.js die een INDIVIDUELE POKEMON met bijbehorende DATA bevat.
   We hebben een COMPONENT Button.js die een STANDAARD BUTTON bevat

   We hebben in App.js die het COMPONENT BUTTON gebruikt om een vorige of volgende API ENDPOINT instelt
   We hebben in App.js die het COMPONENT POKEMON gebruikt om van de HUIDIGE API ENDPOINT alles weer te geven (Dit zijn er 20 per endpoint)
