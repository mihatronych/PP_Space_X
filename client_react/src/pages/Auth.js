import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Nav} from "react-bootstrap";
import {Link, NavLink, useLocation, useHistory} from "react-router-dom";
import {GAME_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import '../styles.css';
import {Context} from "../index";
import {login, registration} from "../http/user_api";
import {observer} from "mobx-react-lite";
import {useCookies} from 'react-cookie'

const Auth = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const history = useHistory()
    const {user} = useContext(Context)
    const {game} = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [countryId, setCountryId] = useState('')
    const [cookies, setCookie] = useCookies(['id'])

    const setOurCookie = async (jwt)=>{
        console.log(jwt)
        let exp = jwt.exp
        setCookie('id', jwt.id, {path: '/', exp})
    }
    const click = async () => {

        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                await setOurCookie(data)
                console.log(data)
            } else {
                console.log(email, nickname, countryId, password)
                data = await registration(email, nickname, countryId, password);
                await setOurCookie(data)
                console.log(data)
            }
            user.setIsAuth(true)
            user.setUser(data)
            history.push(MAIN_ROUTE)
        } catch (e) {
            alert(e)
            alert(e.response.data.message)
        }

    }
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {isLogin ? "" :

                        <Form.Control
                            className="mt-3 input_style"
                            placeholder="Nickname"
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                        />
                    }
                    {isLogin ? "" :

                        <Form.Control as="select"
                                      className="mt-3 text-center"
                                      placeholder="Country"
                                      value={countryId}
                                      onChange={e => setCountryId(e.target.value)}
                        >
                            <option defaultChecked>----< /option>
                            {game.countries.map(country =>

                                <option value={country.id}>{country.name}</option>
                            )}
                        </Form.Control>
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    {/*{isLogin ? "" :*/}

                    {/*    <Form.Control*/}
                    {/*        className="mt-3"*/}
                    {/*        placeholder="Repeat password"*/}
                    {/*        value={password}*/}
                    {/*        onChange={e => setPassword(e.target.value)}*/}
                    {/*        type="password"*/}
                    {/*    />*/}
                    {/*}*/}
                    <Button onClick={click} className="mt-4 " as={Link}
                            to={MAIN_ROUTE}>{isLogin ? 'Log in' : 'Sign up'}</Button>
                    {isLogin ?
                        <div className="d-flex justify-content-center mt-2 small-text">Don't have an account? <NavLink
                            to={REGISTRATION_ROUTE}> Sign up</NavLink></div>
                        :
                        <div className="d-flex justify-content-center mt-2 small-text">Already have an account? <NavLink
                            to={LOGIN_ROUTE}> Log in</NavLink></div>
                    }
                </Form>
            </Card>
        </Container>
    );
});
export default Auth;
