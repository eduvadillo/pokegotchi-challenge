import "./Pokegotchi.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { newgame } from "../services/game";
import * as PATHS from "../utils/paths";
import { mypokemons } from "../services/game";

function Pokegotchi(props) {
  const [loading, setLoading] = useState(false);
  const [gameName, setGameName] = useState("");
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  const [myPokemons, setMyPokemons] = useState(`empty`);
  const [pokemonNumber, setPokemonNumber] = useState(0);
  const [pokemonStat, setPokemonStat] = useState(0);
  const { name } = useParams();

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
      setPokemonStat(res.data[0].pokemons[0].pokemonStats[0].base_stat);
      setMyPokemons(res.data);
      setLoading(true);
    });
  }, []);

  /*   useEffect(() => {
    const myIntervalHp = setInterval(myTimer, 10000);

    function myStopFunction() {
      clearInterval(myIntervalHp);
    }

    function myTimer() {
      if (pokemonStat > 14) {
        setPokemonStat(pokemonStat - 15);
      } else {
        myStopFunction();
      }
    }
  }, [pokemonStat]); */

  const handleNextPokemonSubmit = (e) => {
    e.preventDefault();
    if (pokemonNumber < myPokemons[0].pokemons.length - 1) {
      setPokemonNumber(pokemonNumber + 1);
    }
    if (pokemonNumber === myPokemons[0].pokemons.length - 1) {
      setPokemonNumber(0);
    }
  };

  const handleBeforePokemonSubmit = (e) => {
    e.preventDefault();
    if (pokemonNumber < myPokemons[0].pokemons.length) {
      setPokemonNumber(pokemonNumber - 1);
    }
    if (pokemonNumber === myPokemons[0].pokemons.length - myPokemons[0].pokemons.length) {
      setPokemonNumber(myPokemons[0].pokemons.length - 1);
    }
  };

  if (loading === false) {
    return `loading`;
  } else {
    /*  console.log(myPokemons[0]);

    console.log(myPokemons[0].pokemons[pokemonNumber].pokemonStats[0].base_stat, `number pokemons`); */

    return (
      <div className='pokegotchi-container'>
        <div className='left-container-poke'></div>
        <div className='central-container-poke'>
          <div className='pokemon-name'>{myPokemons[0].pokemons[pokemonNumber].pokemonName}</div>
          <div className='pokemon-photo'>
            <img src={myPokemons[0].pokemons[pokemonNumber].pokemonPhotoFront} alt='mypokemon' />
            <img src={myPokemons[0].pokemons[pokemonNumber].pokemonPhotoBack} alt='mypokemon' />
          </div>
          <div className='every-stat-div'>
            {myPokemons[0].pokemons[pokemonNumber].pokemonStats.map((stat) => (
              <>
                <div className='every-stat'>
                  <p>
                    {stat.stat.name} : {stat.base_stat}
                  </p>
                </div>
              </>
            ))}
          </div>
          <div className='div-form-poke'>
            <form onSubmit={handleBeforePokemonSubmit}>
              <button type='submit' className='every-stat'>
                Previous
              </button>
            </form>
            <form onSubmit={handleNextPokemonSubmit}>
              <button type='submit' className='every-stat'>
                Next
              </button>
            </form>
          </div>
        </div>
        <div className='right-container-poke'></div>
      </div>
    );
  }
}

export default Pokegotchi;
