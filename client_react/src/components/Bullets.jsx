
import React, { Component } from 'react';

import SpaceX_Points from './SpaceX_Points';

export default class Bullets extends Component {
    render() {
        let pointsData = this.props.bullets.map((bullet) => {

            return bullet;
        });

        return (
            <SpaceX_Points points={pointsData} />
        );
    }
}
