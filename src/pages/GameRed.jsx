import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Pokedex from "pokedex-promise-v2";
import "./GameRed.css";
import fire from "./assets/images/fire.png";
import electric from "./assets/images/electric.png";
import normal from "./assets/images/normal.png";
import water from "./assets/images/water.png";
import psychic from "./assets/images/psychic.png";
import rock from "./assets/images/rock.png";
import bug from "./assets/images/bug.png";
import dark from "./assets/images/dark.png";
import dragon from "./assets/images/dragon.png";
import ghost from "./assets/images/ghost.png";
import grass from "./assets/images/Grass.png";
import ground from "./assets/images/ground.png";
import ice from "./assets/images/ice.png";
import poison from "./assets/images/poison.png";
import steel from "./assets/images/steel.png";
import fairy from "./assets/images/fairy.png";
import flying from "./assets/images/flying.png";
import fighting from "./assets/images/fighting.png";
import { addpokemon, mypokemons } from "../services/game";
import * as PATHS from "../utils/paths";
import { useParams, useNavigate } from "react-router-dom";

const P = new Pokedex();

function GameRed(props) {
  /*  const API_URL = process.env.REACT_APP_API_URL; */

  const { name } = useParams();

  const [pokemons, setPokemons] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemonSearch, setPokemonSearch] = useState(``);
  const [pokemonFind, setPokemonFind] = useState(true);
  const [pokemonFindStats, setPokemonFindStats] = useState(true);
  const [pokemonAdded, setPokemonAdded] = useState(false);
  const [myPokemons, setMyPokemons] = useState(`empty`);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    P.getPokedexByName("kanto")
      .then((response) => {
        setPokemons(response.pokemon_entries);
        setLoading(true);
      })
      .catch((error) => {
        console.log("There was an ERROR: ", error);
      });
  }, []);

  const handlePokemonSearchValue = (e) => {
    setPokemonSearch(e.target.value);
  };

  useEffect(() => {
    let pokemonLowerCase = pokemonSearch.toLowerCase();

    P.getPokemonByName(`${pokemonLowerCase}`)
      .then((response) => {
        setPokemonFind(response);
        setPokemonFindStats(response.stats);
      })
      .catch((error) => {
        console.log("There was an ERROR: ", error);
      });
  }, [pokemonSearch]);

  const handlePokemonSearchSubmit = (e) => {
    e.preventDefault();

    P.getPokemonByName(`${pokemonSearch}`)
      .then((response) => {
        setPokemonFind(response);
      })
      .catch((error) => {
        console.log("There was an ERROR: ", error);
      });
  };

  const handleAddPokemonSubmit = (e) => {
    e.preventDefault();

    const propsNewPokemon = {
      userName: props.user.username,
      userId: props.user._id,
      gameName: name,
      pokemonName: pokemonFind.name,
      pokemonStats: pokemonFindStats,
      pokemonPhotoFront: pokemonFind.sprites.front_default,
      pokemonPhotoBack: pokemonFind.sprites.back_default,
    };

    addpokemon(propsNewPokemon).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      setPokemonAdded(`active`);
    });
  };

  const handleStartGameSubmit = (e) => {
    e.preventDefault();

    const propsNewPokemon = {
      userName: props.user.username,
      userId: props.user._id,
      gameName: name,
      pokemonName: pokemonFind.name,
      pokemonStats: pokemonFindStats,
      pokemonPhotoFront: pokemonFind.sprites.front_default,
      pokemonPhotoBack: pokemonFind.sprites.back_default,
    };

    navigateTo(`/pokegotchi/${name}`);
  };

  useEffect(() => {
    const getMyPokemons = {
      userName: props.user.username,
      userId: props.user._id,
      gameName: name,
    };

    mypokemons(getMyPokemons).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }

      setMyPokemons(res.data);
      setPokemonAdded(`inactive`);
    });
  }, [pokemonAdded]);

  if (loading === false) {
    return `loading`;
  } else {
    return (
      <div className='game-red-container'>
        {/*  {pokemons.map((pokemon) => (
          <>
            <div className='info-league-container'>
              <h4>{pokemon.pokemon_species.name}</h4>
            </div>
          </>
        ))} */}
        <div className='left-container'>
          <div className='search-pokemon-div'>
            <h2>Search pokemons and find your favorites to play</h2>
            <form className='search-pokemon-form' onSubmit={handlePokemonSearchSubmit}>
              <input
                className='input-pokemon-form'
                type='text'
                name='email'
                value={pokemonSearch}
                placeholder='Name Pokemon'
                onChange={handlePokemonSearchValue}
              />
              {/*               <button className='button-pokemon-form' type='submit'>
                Find
              </button> */}
            </form>
            {pokemonFind === true ? (
              <></>
            ) : (
              <div className='pokemon-find-div'>
                <div>
                  {pokemonFind.types.map((type) => (
                    <>
                      <div className='pokemon-type'>
                        {type.type.name === `fire` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={fire} alt='type-fire' />
                          </>
                        ) : type.type.name === `electric` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={electric} alt='type-fire' />
                          </>
                        ) : type.type.name === `water` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={water} alt='type-fire' />
                          </>
                        ) : type.type.name === `rock` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={rock} alt='type-fire' />
                          </>
                        ) : type.type.name === `dragon` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={dragon} alt='type-fire' />
                          </>
                        ) : type.type.name === `ghost` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={ghost} alt='type-fire' />
                          </>
                        ) : type.type.name === `grass` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={grass} alt='type-fire' />
                          </>
                        ) : type.type.name === `ice` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={ice} alt='type-fire' />
                          </>
                        ) : type.type.name === `psychic` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={psychic} alt='type-fire' />
                          </>
                        ) : type.type.name === `normal` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={normal} alt='type-fire' />
                          </>
                        ) : type.type.name === `bug` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={bug} alt='type-fire' />
                          </>
                        ) : type.type.name === `dark` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={dark} alt='type-fire' />
                          </>
                        ) : type.type.name === `steel` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={steel} alt='type-fire' />
                          </>
                        ) : type.type.name === `fighting` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={fighting} alt='type-fire' />
                          </>
                        ) : type.type.name === `poison` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={poison} alt='type-fire' />
                          </>
                        ) : type.type.name === `flying` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={flying} alt='type-fire' />
                          </>
                        ) : type.type.name === `fairy` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={fairy} alt='type-fire' />
                          </>
                        ) : type.type.name === `ground` ? (
                          <>
                            <h2>{pokemonFind.name} </h2> <img src={ground} alt='type-fire' />
                          </>
                        ) : (
                          <></>
                        )}{" "}
                      </div>
                    </>
                  ))}{" "}
                </div>
                <div className='pokemon-photos'>
                  <img src={pokemonFind.sprites.front_default} alt='new' />
                  <img src={pokemonFind.sprites.back_default} alt='new' />
                </div>
                <div className='pokemon-stats'>
                  {pokemonFind.stats.map((stat) => (
                    <>
                      <div className='every-stat'>
                        <p>
                          {stat.stat.name} : {stat.base_stat}
                        </p>
                      </div>
                    </>
                  ))}
                </div>
                <div className='add-pokemon-to-play'>
                  <form onSubmit={handleAddPokemonSubmit}>
                    <button type='submit' className='every-stat'>
                      Add pokemon
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='right-container'>
          <div className='title-game-name'>
            <h2>My pokemons for {myPokemons[0].gameName} are:</h2>
          </div>
          <div className='my-pokemons-div'>
            {myPokemons !== "empty" ? (
              myPokemons[0].pokemons.map((pokemon) => (
                <>
                  <div className='every-stat'>
                    <p>{pokemon.pokemonName}</p>
                    <img src={pokemon.pokemonPhotoFront} alt='mypokemon' />
                    <img src={pokemon.pokemonPhotoBack} alt='mypokemon' />
                  </div>
                </>
              ))
            ) : (
              <></>
            )}
          </div>
          <div>
            {myPokemons !== "empty" ? (
              <form onSubmit={handleStartGameSubmit}>
                <button className='every-stat' type='submit'>
                  Start Game
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GameRed;
