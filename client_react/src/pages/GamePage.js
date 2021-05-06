import React from "react";
import {Container} from "react-bootstrap";
import SpaceInvaders from "../components/SpaceInvaders";



const MainPage = () => {

    return (
        <Container className="">
            <SpaceInvaders width={640} height={480} initialEnemies={40} />
        </Container>
    );
}

export default MainPage;
