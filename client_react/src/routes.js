import {
    ABOUT_US_ROUTE,
    GAME_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE, STANDINGS_ROUTE,
    USER_ROUTE
} from "./utils/consts";

import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import GamePage from "./pages/GamePage";
import StandingsPage from "./pages/StandingsPage";
import AboutUsPage from "./pages/AboutUsPage";

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
    },
    {
        path: STANDINGS_ROUTE,
        Component: StandingsPage
    },
    {
        path: ABOUT_US_ROUTE,
        Component: AboutUsPage
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


