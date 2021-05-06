import React from "react";
import {Container, Nav, Table} from "react-bootstrap";
import '../styles.css';
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";

const StandingsPage = () => {

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
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>1900</td>
                        <td>1:23</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>1290</td>
                        <td>1:00</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default StandingsPage;
