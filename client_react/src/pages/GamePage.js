import React from "react";
import {Container} from "react-bootstrap";
import SpaceInvaders from "../components/SpaceInvaders";



const MainPage = () => {

    return (
        <Container className="d-flex justify-content-center align-items-center flex-column"
                   style={{height: window.innerHeight - 40}}>
            <div className="d-inline-flex"><div id="hour" > </div>:<div id="mins"> </div>:<div id="secs">< /div> </div>
            <SpaceInvaders width={800} height={600} initialEnemies={40} />

        </Container>
    );
}

export default MainPage;
