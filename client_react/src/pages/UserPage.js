import React from "react";
import {Button, Card, Col, Container, Form, Nav, Row, Table} from "react-bootstrap";
import '../styles.css';
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";


const UserPage = () => {

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
                        <tr>
                            <td>1</td>
                            <td>1900</td>
                            <td>1:23</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>1290</td>
                            <td>1:00</td>
                        </tr>
                        </tbody>
                    </Table></Col>

            </Row>
        </Container>
    );
}

export default UserPage;
