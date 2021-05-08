
import React, { Component } from 'react';

import Points from './Points';
import { ENEMY_RADIUS } from '../Constants';
import img from '../img/rogozin.png';

export default class Enemies extends Component {
    render() {
        let pointsData = this.props.enemies
                             .filter((e) => e.alive)
                             .map((enemy) => {
                                 return enemy;
                             });

        return (

            <Points points={pointsData} />
        );
    }
}
