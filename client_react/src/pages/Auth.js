import React, {useContext} from 'react';
import {Button, Card, Container, Form, Nav} from "react-bootstrap";
import {Link, NavLink, useLocation} from "react-router-dom";
import {GAME_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import '../styles.css';
import {Context} from "../index";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)
    return (
        <Container
            className="d-flex justify-content-center align-items-center "
            style={{height: window.innerHeight - 70}}
        >
            <Card className="p-1 auth_card">
                <h2 className="m-auto ">{isLogin ? 'Log in' : 'Sign up'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3 input_style"
                        placeholder="Email"
                    />
                    {isLogin ? "" :
                        <Form.Control as="select"
                                      className="mt-3 text-center"
                                      placeholder="Country">
                            <option>Russia</option>
                            <option>USA</option>
                            <option>Kazakhstan</option>
                        </Form.Control>
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Password"
                    />

                    {isLogin ? "" :

                        <Form.Control
                            className="mt-3"
                            placeholder="Repeat password"
                        />
                    }
                    <Button className="mt-4 " as={Link} to={MAIN_ROUTE}>{isLogin ? 'Log in' : 'Sign up'}</Button>
                    {isLogin ?
                        <div className="d-flex justify-content-center mt-2 small-text">Don't have an account? <NavLink
                            to={REGISTRATION_ROUTE}> Sign up</NavLink></div>
                        :
                        <div className="d-flex justify-content-center mt-2 small-text">Already have an account? <NavLink
                            to={LOGIN_ROUTE} > Log in</NavLink></div>
                    }
                </Form>
            </Card>
        </Container>
    );
};
export default Auth;
