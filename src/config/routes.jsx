import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import HomePageLogin from "../pages/HomeLogin";
import ProtectedPage from "../pages/ProtectedPage";
import GameRed from "../pages/GameRed";
import Pokegotchi from "../pages/Pokegotchi";
import MyGames from "../pages/MyGames";
import * as PATHS from "../utils/paths";

const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },

    {
      path: PATHS.LOGINPAGE,
      element: <Login {...props} />,
    },
    {
      path: PATHS.PROTECTEDPAGE,
      element: user ? <ProtectedPage {...props} /> : <Navigate to={PATHS.LOGINPAGE} replace />,
    },
    {
      path: PATHS.HOMEPAGELOGIN,
      element: user ? <HomePageLogin {...props} /> : <Navigate to={PATHS.LOGINPAGE} replace />,
    },
    {
      path: PATHS.GAMERED,

      element: user ? <GameRed {...props} /> : <Navigate to={PATHS.LOGINPAGE} replace />,
    },
    {
      path: PATHS.POKEGOTCHI,

      element: user ? <Pokegotchi {...props} /> : <Navigate to={PATHS.LOGINPAGE} replace />,
    },
    {
      path: PATHS.MYGAMES,

      element: user ? <MyGames {...props} /> : <Navigate to={PATHS.LOGINPAGE} replace />,
    },
  ];
};

export default routes;
