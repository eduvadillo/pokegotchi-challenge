import "./MyGames.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { newgame } from "../services/game";
import * as PATHS from "../utils/paths";
import { myGames } from "../services/game";

function Mygames(props) {
  const [allGames, setAllGames] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  console.log(`im the props`, props);

  useEffect(() => {
    console.log(`desde el useEffect de my pokemons`);
    const getMyGames = {
      userName: props.user.username,
      userId: props.user._id,
    };

    myGames(getMyGames).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }

      setAllGames(res.data);
      setLoading(true);
    });
  }, []);

  if (loading === false) {
    return `loading`;
  } else {
    console.log(allGames[0].opengames[0]);
    return (
      <div className='my-games-container'>
        {allGames[0].opengames.map((game) => (
          <>
            <div className='every-game-container'>
              <p>Name: {game.gameName}</p>
              <p>Status: {game.status}</p>

              <button
                className='button-game'
                type='submit'
                onClick={() => {
                  navigateTo(`/pokegotchi/${game.gameName}`);
                }}
              >
                Play
              </button>
            </div>
          </>
        ))}
      </div>
    );
  }
}

export default Mygames;
