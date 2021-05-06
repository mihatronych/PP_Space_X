import React, { Component } from "react";

import Store from "../Store";
import Actions from "../Actions";

import Enemies from "./Enemies";
import Bullets from "./Bullets";
import Player from "./Player";
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {Nav} from "react-bootstrap";

class SpaceInvaders extends Component {
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
        Actions.start_game(
            this.props.width,
            this.props.height,
            this.props.initialEnemies
        );
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
                    <Enemies enemies={this.state.enemies} />
                    <Bullets bullets={this.state.bullets} />
                    <Player {...this.state.player} />
                </svg>
            );
        } else if (this.state.ended) {
            let endGameText = "Game over",
                explainerText = "You got shot by an invader or yourself";

            if (!this.state.enemies.filter(e => e.alive).length) {
                endGameText = "You win!";
                explainerText =
                    "You shot all the invaders and saved the planet o/";
            }

            return (
                <div className="text-center">
                    <h1>{endGameText}</h1>
                    <p className="lead">{explainerText}</p>
                    <p>
                        <button
                            onClick={this.start_game}
                            className="btn btn-success btn-lg"
                        >
                            Start Another Game
                        </button>
                    </p>
                    <p>Try again</p>
                    <Nav.Link className="h3" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <h1>Space X</h1>
                    <p className="lead">

                        <code>Arrow keys</code> or mouse drag to move,{" "}
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
                    <Nav.Link className="h3" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
                </div>
            );
        }
    }
}

export default SpaceInvaders;
