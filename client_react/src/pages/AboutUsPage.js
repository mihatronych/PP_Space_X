import React from "react";
import {Container, Nav} from "react-bootstrap";
import '../styles.css';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";

const AboutUsPage = () => {

    return (
        <Container className="d-flex justify-content-center align-items-center "
                   style={{height: window.innerHeight - 70}}>
            <div className="flex-column text-center">
                <h1>
                    The best team from the capital of villages!
                </h1>
                <h2>Members:</h2>
                <h2>Mikhail Dolgushin</h2>
                <h2>Ismakova Dayana</h2>
                <Nav.Link className="h2" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
            </div>
        </Container>
    );
}

export default AboutUsPage;
