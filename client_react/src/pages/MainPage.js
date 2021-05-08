import React, {useContext} from "react";
import {Container, Nav} from "react-bootstrap";
import '../styles.css';
import {Link, useHistory} from "react-router-dom";
import {ABOUT_US_ROUTE, GAME_ROUTE, LOGIN_ROUTE, STANDINGS_ROUTE, USER_ROUTE} from "../utils/consts";
import {Context} from "../index";

const MainPage = () => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Container className="d-flex justify-content-center align-items-center "
                   style={{height: window.innerHeight - 70}}>

            <Nav className="flex-column menu">
                <Nav.Link className="my-3" as={Link} to={GAME_ROUTE} > Start game</Nav.Link>
                <Nav.Link className="my-3" as={Link} to={STANDINGS_ROUTE}> Standings </Nav.Link>
                <Nav.Link className="my-3" as={Link} to={USER_ROUTE}> My page</Nav.Link>
                <Nav.Link className="my-3" as={Link} to={ABOUT_US_ROUTE}> About us</Nav.Link>
                <Nav.Link className="my-3" as={Link} to={LOGIN_ROUTE} onClick={() => logOut()} > Exit</Nav.Link>
            </Nav>
        </Container>
    );
}

export default MainPage;
