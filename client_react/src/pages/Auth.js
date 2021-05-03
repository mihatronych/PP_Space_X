import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
        <Container
            className="d-flex justify-content-center align-items-center "
            style={{height: window.innerHeight - 100}}
        >
            <Card className="p-2 auth_card">
                <h2 className="m-auto pb-4">{isLogin ? 'Вход' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3 input_style"
                        placeholder="Почта"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                    />
                    {isLogin ? "" :
                        <Form.Control
                            className="mt-3"
                            placeholder="Повторите пароль"
                        />
                    }
                    <Button className="mt-3">{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                    {isLogin ?
                        <div className="d-flex justify-content-center mt-2 small-text">Нет аккаунта? <NavLink
                            to={REGISTRATION_ROUTE}> Зарегистрироваться</NavLink></div>
                        :
                        <div className="d-flex justify-content-center mt-2 small-text">Уже есть аккаунт? <NavLink
                            to={LOGIN_ROUTE}> Войти</NavLink></div>
                    }
                </Form>
            </Card>
        </Container>
    );
};
export default Auth;
