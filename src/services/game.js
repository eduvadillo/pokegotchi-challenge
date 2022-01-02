import axios from "axios";

const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/`,
});

function internalServerError(err) {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: "Internal server2 error2. Please check2 your server2",
  };
}

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

export function newgame(credentials) {
  return authService.post("/newgame", credentials).then(successStatus).catch(internalServerError);
}

export function addpokemon(credentials) {
  return authService
    .post("/addpokemon", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function mypokemons(credentials) {
  return authService
    .post("/mypokemons", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function myGames(credentials) {
  return authService.post("/mygames", credentials).then(successStatus).catch(internalServerError);
}
