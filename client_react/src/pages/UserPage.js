import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Nav, Row, Table} from "react-bootstrap";
import '../styles.css';
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {createSession, fetchCountry, fetchGamer, fetchSession} from "../http/space_x_api";
import {observer} from "mobx-react-lite";
import {useCookies} from "react-cookie";
import {update} from "../http/user_api";

const UserPage = observer(() => {
    const {user, game} = useContext(Context)
    const [cookies] = useCookies(['id'])

    useEffect(() => {
        fetchSession().then(data => game.setSessions(data.rows))
        fetchGamer().then(data => game.setGamers(data.rows))
        fetchCountry().then(data => game.setCountries(data))
        fetchGamer().then(data =>  data.rows.map(data=> data.id === parseInt(cookies.id)? setEmail(data.email): undefined))
        fetchGamer().then(data =>  data.rows.map(data=> data.id === parseInt(cookies.id)? setNickname(data.nickname): undefined))
        fetchGamer().then(data =>  data.rows.map(data=> data.id === parseInt(cookies.id)? setCountryId(data.countryId): undefined))
    }, [])


    const [email, setEmail] = useState('here email')
    const [nickname, setNickname] = useState('here need to change to gamer nickname')
    const [password, setPassword] = useState('Password')
    const [countryId, setCountryId] = useState('etc.')



    const Update = () => {
        update({email:email, nickname:nickname, password:password,countryId:countryId}).then()
    }

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
                            className="mt-3 input_style"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Form.Control as="select"
                                      className="mt-3 text-center"
                                      placeholder="Country">
                            value={countryId}
                            onChange={e => setCountryId(e.target.value)}
                            <option defaultChecked>----< /option>
                            {game.countries.map(country =>
                                <option value={country.id}>{country.name}</option>
                            )}
                        </Form.Control>
                        <Button className="mt-4" onClick={Update}>Update</Button>
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

                        {game.sessions.map(data => {
                                if (data.gamerId === parseInt(cookies.id))
                                    return (
                                        <tr>
                                            <td>{data.gamerId}</td>
                                            <td>{data.score}</td>
                                            <td>{data.time_session}</td>
                                        </tr>
                                    )
                            }
                        )}
                        </tbody>
                    </Table></Col>

            </Row>
        </Container>
    );
});

export default UserPage;
