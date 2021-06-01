import React, {Component, useContext} from "react";

import Store from "../Store";
import Actions from "../Actions";

import Enemies from "./Enemies";
import Bullets from "./Bullets";
import Player from "./Player";
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {Nav} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import {createSession} from "../http/space_x_api";
import {Context} from "../index";
import UserStore from "../store/UserStore";

const storedToken = localStorage.getItem("token");
if (storedToken){
    let decodedData = jwt_decode(storedToken, { header: true });
    let expirationDate = decodedData.exp;
    let current_time = Date.now() / 1000;
    if(expirationDate < current_time)
    {
        localStorage.removeItem("token");
    }
}

//let cookies = jwt_decode(localStorage.getItem('token'))


class SpaceInvaders extends Component {
    timer;
    time;

    constructor() {
        super();
        this.state = Store.getGameState();
    }

    componentDidMount() {
        Store.addChangeListener(this._onChange);
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }

    componentWillUnmount() {
        Store.removeChangeListener(this._onChange);
        window.removeEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }

    _onChange = () => {
        this.setState(Store.getGameState());
    };

    start_game = () => {
        this.game_timer();
        Actions.start_game(
            this.props.width,
            this.props.height,
            this.props.initialEnemies
        );

    };

    clear_game = () => {
        this.setState(Store.clearGame());
    };

    game_timer = () => {
        const hour = document.getElementById('hour');
        const mins = document.getElementById('mins');
        const secs = document.getElementById('secs');
        const time = document.getElementById('time');
        let S = '00', M = '00', H = '00';

        this.timer = setInterval(function () {
            //Плюсик перед строкой преобразует его в число
            S = +S + 1;
            //Если результат меньше 10, прибавляем впереди строку '0'
            if (S < 10) {
                S = '0' + S;
            }
            if (S === 60) {
                S = '00';
                //Как только секунд стало 60, добавляем +1 к минутам
                M = +M + 1;
                //Дальше то же самое, что и для секунд
                if (M < 10) {
                    M = '0' + M;
                }
                if (M === 60) {
                    //Как только минут стало 60, добавляем +1 к часам.
                    M = '00';
                    H = +H + 1;
                    if (H < 10) {
                        H = '0' + H;
                    }
                }
            }
            secs.innerText = S;
            mins.innerText = M;
            hour.innerText = H;
            time.value = H+":"+M+":"+S;

            //Тикает всё через одну функцию, раз в секунду.
        }, 1000);

    };


    keydown(event) {
        let key = event.key;
        console.log(key)
        switch (key) {
            case "ArrowRight":
                Actions.player_key_move(1, 0);
                break;
            case "ArrowLeft":
                Actions.player_key_move(-1, 0);
                break;
            case " ":
                Actions.player_shoot();
                break;
            default:
            // no op
        }
    }

    keyup(event) {
        let key = event.key;

        switch (key) {
            case "ArrowRight":
            case "ArrowLeft":
                Actions.player_stop();
                break;
            default:
            // no op
        }
    }

    render() {
        if (this.state.started) {

            return (
                <svg width={this.props.width} height={this.props.height}>
                    <Enemies enemies={this.state.enemies}/>
                    <Bullets bullets={this.state.bullets}/>
                    <Player {...this.state.player} />
                </svg>
            );
        } else if (this.state.ended) {
            clearInterval(this.timer);
            let timer = this.timer;
            let score = this.props.initialEnemies - this.state.enemies.filter(e => e.alive).length;
            let endGameText = "YOU DIED",
                explainerText = "You got shot by an invader or yourself. Score: " + score;

            if (!this.state.enemies.filter(e => e.alive).length) {
                clearInterval(this.timer);
                endGameText = "You win!";
                explainerText =
                    "You shot all the invaders and saved the planet \(^w^)/. Score: " + this.props.initialEnemies;
            }
            let time = document.getElementById('time').value;
            console.log(jwt_decode(storedToken).id)
            createSession({gamerId: parseInt(jwt_decode(storedToken).id), score: score, time_session: time  }).then()
            return (
                <div className="text-center">
                    <h1>{endGameText}</h1>
                    <p className="lead">{explainerText}</p>
                    <form>
                    <input id="score" className="invisible" value={score}/>
                    <input id="timer" className="invisible" value={timer}/>
                    </form>
                    <p>
                        <button
                            onClick={this.start_game}
                            className="btn btn-success btn-lg"
                        >
                            Start Another Game
                        </button>
                    </p>
                    <Nav.Link onClick={this.clear_game} className="h3" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <h1>Space X</h1>
                    <p className="lead">

                        <code>Drag mouse</code> to move tesla,{" "}
                        <code>&lt;space&gt;</code> to shoot.
                    </p>
                    <p>
                        <button
                            onClick={this.start_game}
                            className="btn btn-success btn-lg"
                        >
                            Start Game
                        </button>
                    </p>
                    <p>Good luck LOL</p>
                    <Nav.Link onClick={this.clear_game} className="h3" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
                </div>
            );
        }
    }
}

export default SpaceInvaders;
