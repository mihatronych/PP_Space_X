
import React, { Component } from 'react';
import img from '../img/rogozin.png';


class Point extends Component {
    render() {
        return (
        <image xlinkHref={img}
               x={this.props.x}
               y={this.props.y}
               width={55}
               height={55}
        />
        );
    }
};

export default class Points extends Component {
    render() {
        return (
            <g>
                {this.props.points.map((point) => {
                    return (<Point {...point} key={point.id} />);
                })}
            </g>
        );
    }
}
