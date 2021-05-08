
import React, { Component } from 'react';
import img from '../img/spacex.png';
import {ENEMY_RADIUS} from "../Constants";


class Point2 extends Component {
    render() {
        return (
        <image xlinkHref={img}
               x={this.props.x}
               y={this.props.y}
               width={ENEMY_RADIUS}
               height={ENEMY_RADIUS}
        />
        );
    }
};

export default class SpaceX_Points extends Component {
    render() {
        return (
            <g>
                {this.props.points.map((point) => {
                    return (<Point2 {...point} key={point.id} />);
                })}
            </g>
        );
    }
}
