import "./HomeLogin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { newgame } from "../services/game";
import * as PATHS from "../utils/paths";

function HomePageLogin(props) {
  const [gameName, setGameName] = useState("");
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  const handleNewGame = (e) => setGameName(e.target.value);

  console.log(`im the props`, props);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log(`he llegado al handle`);

    const propsGame = {
      userName: props.user.username,
      userId: props.user._id,
      gameName: gameName,
    };

    newgame(propsGame).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }

      console.log(`soy el res data de user!`, res.data);
      console.log(`soy el res de user!`, res);

      navigateTo(`/red/${gameName}`);
    });
  };

  return (
    <div className='homepage-container'>
      <div className='left-container-login'>
        <h1>INSTRUCTIONS</h1>
        <h5>
          The objective of the game is to learn about taking care of pokemons and get a legendary
          pokemon
        </h5>
      </div>
      <div className='right-container'>
        <h1>Choose new name for the game</h1>
        <div className='choose-game'>
          <form onSubmit={handleSignupSubmit}>
            <input
              className='input-login-home'
              type='text'
              name='game'
              placeholder='New game name'
              value={gameName}
              onChange={handleNewGame}
            />
            <button type='submit' className='button-submit'>
              Start
            </button>
          </form>
        </div>
        <div className='choose-game'></div>
      </div>
    </div>
  );
}

export default HomePageLogin;
