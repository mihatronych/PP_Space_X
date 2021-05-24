import React, {useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import SpaceInvaders from "../components/SpaceInvaders";
import {useCookies} from "react-cookie";
import {createSession, fetchGamer, fetchSession} from "../http/space_x_api";
import Store from "../Store";
import {observer} from "mobx-react-lite";


const MainPage = observer(() => {
    const [cookies] = useCookies(['id'])


    const addSession = () => {
        const score = document.getElementById('score').value;
        // let now = new Date();
        // let nowDateTime = now.toISOString();
        // let nowDate = nowDateTime.split('T')[0];
        let time = document.getElementById('time').value;
        // let target = new Date(nowDate + time );
        createSession({gamerId: parseInt(cookies.id), score: parseInt(score), time_session: time  }).then()

    }
    this.state = Store.getGameState();

    return (
        <Container className="d-flex justify-content-center align-items-center flex-column"
                   style={{height: window.innerHeight - 40}}>
            <div className="d-inline-flex">
                <div id="hour"></div>
                :
                <div id="mins"></div>
                :
                <div id="secs">< /div>
            </div>
            <input className="invisible" id="time"/>
            <Button onClick={addSession}> Save result</Button>
            <SpaceInvaders width={800} height={600} initialEnemies={40}/>


        </Container>
    );
});

export default MainPage;
