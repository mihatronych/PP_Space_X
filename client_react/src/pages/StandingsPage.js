import React, {useContext, useEffect} from "react";
import {Container, Nav, Table} from "react-bootstrap";
import {MDBContainer, MDBScrollbar} from "mdbreact";
import '../styles.css';
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {fetchGamer, fetchSession} from "../http/space_x_api";
import {observer} from "mobx-react-lite";

const StandingsPage = observer(() => {
    const {game} = useContext(Context)

    useEffect(() => {
        fetchSession().then(data => game.setSessions(data.rows))
        fetchGamer().then(data => game.setGamers(data.rows))
    }, [])
    const scrollContainerStyle = {width: "800px", maxHeight: "600px"};
    return (
        <Container className="d-flex justify-content-center"
                   style={{height: window.innerHeight - 70}}>

            <div className="flex-column text-center">
                <Nav.Link className="h2" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
                <h1> Standings</h1>
                <MDBContainer style={scrollContainerStyle} className="mt-5">
                    <div className="scroll">
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
                                    {game.gamers.map(items => {
                                        console.log(items.id, session.gamerId)
                                        if (items.id === parseInt(session.gamerId))
                                            return <td>{items.nickname}</td>
                                    })
                                    }
                                    <td>{session.score}</td>
                                    <td>{session.time_session}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                </MDBContainer>
            </div>
        </Container>
    );
});
export default StandingsPage;
