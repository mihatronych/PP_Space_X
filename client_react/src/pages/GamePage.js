import React, {useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import SpaceInvaders from "../components/SpaceInvaders";
import {useCookies} from "react-cookie";
import {createSession, fetchGamer, fetchSession} from "../http/space_x_api";
import Store from "../Store";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";


const MainPage = observer(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken){
        let decodedData = jwt_decode(storedToken, { header: true });
        let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
    }

    //const cookies = jwt_decode(localStorage.getItem('token'))
    this.state = Store.getGameState();

    return (
        <Container className="d-flex justify-content-center align-items-center flex-column"
                   style={{height: window.innerHeight - 40}}>
            <div className="d-inline-flex">
                <div id="hour"></div>
                :
                <div id="mins"></div>
                :
                <div id="secs"></div>
            </div>
            <input className="invisible" id="time"/>
            <SpaceInvaders width={800} height={600} initialEnemies={40}/>


        </Container>
    );
});

export default MainPage;
