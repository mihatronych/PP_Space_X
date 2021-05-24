import Dispatcher from "./Dispatcher";


import {
    START_GAME,
    STOP_GAME,
    TIME_TICK,
    PLAYER_MOVE,
    MOUSE_TRIGGER,
    KEY_TRIGGER,
    PLAYER_STOP,
    PLAYER_SHOOT,
    GAME_OVER
} from "./Constants";
import {Context} from "./index";

export default {



    start_game(width, height, N_enemies, cookies) {
        Dispatcher.dispatch({
            actionType: START_GAME,
            width: width,
            height: height,
            N_enemies: N_enemies,
            cookies: cookies
        });
    },

    stop_game() {
        Dispatcher.dispatch({
            actionType: STOP_GAME
        });
    },

    time_tick() {
        Dispatcher.dispatch({
            actionType: TIME_TICK
        });
    },

    player_move(dx, dy) {
        Dispatcher.dispatch({
            actionType: PLAYER_MOVE,
            dx: dx,
            dy: dy,
            type: MOUSE_TRIGGER
        });
    },

    player_key_move(dx, dy) {
        Dispatcher.dispatch({
            actionType: PLAYER_MOVE,
            dx: dx,
            dy: dy,
            type: KEY_TRIGGER
        });
    },

    player_stop() {
        Dispatcher.dispatch({
            actionType: PLAYER_STOP
        });
    },

    player_shoot() {
        Dispatcher.dispatch({
            actionType: PLAYER_SHOOT
        });
    },

    game_over() {
        Dispatcher.dispatch({
            actionType: GAME_OVER
        });
    }
};
