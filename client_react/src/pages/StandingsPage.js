import React, {useContext, useEffect, useState} from "react";
import {Container, Nav, Table} from "react-bootstrap";
import '../styles.css';
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {fetchGamer, fetchSession} from "../http/space_x_api";
import {observer} from "mobx-react-lite";
import ReactPaginate from 'react-paginate';


const StandingsPage = observer(() => {
    const {game} = useContext(Context)

    useEffect(() => {
        fetchSession().then(data => game.setSessions(data))
        fetchGamer().then(data => game.setGamers(data))
    }, [])


    const [pageNumber, setPageNumber] = useState(0)

    const sessionsPerPage = 10
    const pagesVisited = pageNumber * sessionsPerPage

    console.log(game.sessions)

    const displaySessions = game.sessions
        .slice(pagesVisited, pagesVisited + sessionsPerPage)
        .map((session) => {
            return (
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
            );
        });

    const pageCount = Math.ceil( game.sessions.length / sessionsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    return (
        <Container className="d-flex justify-content-center"
                   style={{height: window.innerHeight - 70}}>

            <div className="flex-column text-center">
                <Nav.Link className="h2" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
                <h1> Standings</h1>
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
                        {displaySessions}
                        </tbody>
                    </Table>

                </div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>
        </Container>
    );
});
export default StandingsPage;
