import React, {useContext, useEffect} from "react";
import {Button, Card, Col, Container, Form, Nav, Row, Table} from "react-bootstrap";
import '../styles.css';
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {fetchGamer, fetchSession} from "../http/space_x_api";
import {observer} from "mobx-react-lite";
import {useCookies} from "react-cookie";

const UserPage = observer(() => {
    const {user, game} = useContext(Context)
    const [cookies] = useCookies(['id'])
    console.log(user.user)
    useEffect(() => {
        fetchSession().then(data => game.setSessions(data.rows))
        fetchGamer().then(data => game.setGamers(data.rows))


    }, [])
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
                        />
                        <Form.Control
                            className="mt-3 input_style"
                            placeholder="Email"
                        />
                        <Form.Control
                            className="mt-3 input_style"
                            placeholder="Password"
                        />
                        <Form.Control as="select"
                                      className="mt-3 text-center"
                                      placeholder="Country">
                            <option>Russia</option>
                            <option>USA</option>
                            <option>Kazakhstan</option>
                        </Form.Control>
                        <Button className="mt-4 ">Update</Button>
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
                                return(
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
