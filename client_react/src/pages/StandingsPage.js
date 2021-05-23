import React, {useContext} from "react";
import {Container, Nav, Table} from "react-bootstrap";
import '../styles.css';
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";

const StandingsPage = () => {
    const {game} = useContext(Context)
    return (
        <Container className="d-flex justify-content-center"
                   style={{height: window.innerHeight - 70}}>


            <div className="flex-column text-center">
                <Nav.Link className="h2" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
                <h1> Standings</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Points</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {game.sessions.map(session =>
                        <tr>
                            <td>{session.id}</td>
                            <td>{session.gamerId}</td>
                            <td>{session.score}</td>
                            <td>{session.time_session}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default StandingsPage;
