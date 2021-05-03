import {
    GAME_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_ROUTE
} from "./utils/consts";

import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import GamePage from "./pages/GamePage";

export const authRoutes = [

    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    },
    {
        path: GAME_ROUTE,
        Component: GamePage
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]


