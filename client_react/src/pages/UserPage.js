import React, {Component, useContext, useEffect, useState} from "react";
import {Alert, Button, Card, Col, Container, Form, Nav, Row, Table} from "react-bootstrap";
import '../styles.css';
import {Link, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {fetchCountry, fetchGamer, fetchSession} from "../http/space_x_api";
import {observer} from "mobx-react-lite";
import {delete_, update} from "../http/user_api";
import jwt_decode from "jwt-decode";
import {render} from "react-dom";
import ReactPaginate from 'react-paginate';


//to do:
//скролл таблицы ВЕЗДЕ / Пагинация
//

const UserPage = observer(() => {
    const {user, game} = useContext(Context)
    //const cookies = jwt_decode(localStorage.getItem('token'))
    const history = useHistory()
    const storedToken = localStorage.getItem("token");
    if (storedToken){
        let decodedData = jwt_decode(storedToken, { header: true });
        let expirationDate = decodedData.exp;
        let current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
    }

    const [pageNumber, setPageNumber] = useState(0)

    const sessionsPerPage = 5
    const pagesVisited = pageNumber * sessionsPerPage

    const displaySessions = game.sessions
        .filter((data) => {if (data.gamerId === parseInt(jwt_decode(storedToken).id)) return data})
        .slice(pagesVisited, pagesVisited + sessionsPerPage)
        .map((data) => {
            return (
                <tr>
                    <td>{data.id}</td>
                    <td>{data.score}</td>
                    <td>{data.time_session}</td>
                </tr>
            );
        });

    const pageCount = Math.ceil( game.sessions.length / sessionsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        fetchSession().then(data => game.setSessions(data))
        fetchGamer().then(data => game.setGamers(data))
        fetchCountry().then(data => game.setCountries(data))
        fetchGamer().then(data => data.map(data => data.id === parseInt(jwt_decode(storedToken).id) ? setEmail(data.email) : undefined))
        fetchGamer().then(data => data.map(data => data.id === parseInt(jwt_decode(storedToken).id) ? setNickname(data.nickname) : undefined))
        fetchGamer().then(data => data.map(data => data.id === parseInt(jwt_decode(storedToken).id) ? setCountryId(data.countryId) : undefined))
    }, [])

    const [email, setEmail] = useState(undefined)
    const [nickname, setNickname] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [countryId, setCountryId] = useState(undefined)


    const Update = () => {
        update({email: email, nickname: nickname, password: password, countryId: countryId}).then()
        alert("Данные обновлены");
    }
    const Delete = () => {
        delete_({id: jwt_decode(storedToken).id}).then()
        alert("Данные удалены");
        user.setUser({})
        user.setIsAuth(false)
        history.push(REGISTRATION_ROUTE)
    }

    let counter = 0

    return (
        <Container className="">
            <div className="flex-column text-center">
                <Nav.Link className="h2" as={Link} to={MAIN_ROUTE}>Home page</Nav.Link>
            </div>
            <Row>
                <Col className="flex-column">
                    <h1>Profile</h1>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3 input_style"
                            placeholder="Nickname"
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3 input_style"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3 input_style "
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}

                        />
                        <Form.Control as="select"
                                      className="mt-3 text-center"
                                      placeholder="Country"
                                      value={countryId}
                                      onChange={e => setCountryId(e.target.value)}>

                            {game.countries.map(country => {

                                if (countryId === country.id) {
                                    return <option defaultChecked value={country.id}>{country.name}</option>
                                } else {
                                    return <option value={country.id}>{country.name}</option>
                                }
                            })}
                        </Form.Control>
                        <Button className="mt-4" onClick={Update}>Update</Button>
                        <Button className="mt-4" onClick={Delete}>Delete</Button>
                    </Form>

                </Col>
                <Col className="flex-column">
                    <h1>User score</h1>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Points</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displaySessions}
                        {/*{game.sessions.map(data => {*/}
                        {/*    counter += 1*/}
                        {/*        if (data.gamerId === parseInt(jwt_decode(storedToken).id))*/}
                        {/*            return (*/}
                        {/*                <tr>*/}
                        {/*                    <td>{data.id}</td>*/}
                        {/*                    <td>{data.score}</td>*/}
                        {/*                    <td>{data.time_session}</td>*/}
                        {/*                </tr>*/}
                        {/*            )*/}
                        {/*    }*/}
                        {/*)}*/}
                        </tbody>
                    </Table>
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
                </Col>
            </Row>
        </Container>
    );
});

export default UserPage;
