import React, {Component} from "react";
import d3 from "d3";
import Actions from "../Actions";
import '../styles.css';
import tesla from '../img/tesla.png';


export default class Player extends Component {
    componentDidMount() {
        let node = this.refs.player,
            drag = d3.behavior.drag();

        drag.on("drag", () => {
            Actions.player_move(d3.event.dx, d3.event.dy);
        });

        d3.select(node).call(drag);


    }

    render() {
        let position = "translate(" + this.props.x + ", " + this.props.y + ")";
        return (
            <g transform={position} ref="player">
                <image xlinkHref={tesla}
                       x={-this.props.w / 2}
                       y={-this.props.h-20}
                       width={this.props.w + 50}
                       height={this.props.h + 30}
                />
            </g>
        );
    }
}
