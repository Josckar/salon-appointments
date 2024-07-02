import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { time, fullTime } from '../../time';
import { getCookie, deleteCookie } from '../../cookies';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {
    AiOutlineHome,
    AiOutlineUser,
} from "react-icons/ai";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './Navbar.css';

const NavBar = () => {
    const [day, setDay] = useState('');
    const [workTime, setWorkTime] = useState('');
    const [clientsideLogin, setClientsideLogin] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 25);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (getCookie('clientsideLogin') === 'true') {
            setClientsideLogin(true);
        }
        let controlPanel = document.querySelector('.cp');
        let userProfile = document.querySelector('.up');

        let { day } = time();
        dayOfWeek(day);
        // setName(getCookie('name'));
        if (getCookie('admin') === 'true') {
            if (controlPanel) {
                controlPanel.style.display = 'block';
            }
            if (userProfile) {
                userProfile.style.display = 'none';
            }
        }
        else {
            if (controlPanel) {
                controlPanel.style.display = 'none';
            }
            if (userProfile) {
                userProfile.style.display = 'block';
            }
        }

    }, []);

    const login = async () => {
        navigate('/login');
    };

    const logout = async () => {
        let response;
        try {
            console.log('user logout');
            deleteCookie('name');
            deleteCookie('id');
            deleteCookie('status');
            deleteCookie('admin');
            deleteCookie('clientsideLogin');
            response = await api.post('/logout');
            console.log('response data: ', response.data);
        } catch (err) {
            console.error('Error logging out:', err.response.data);
        } finally {
            deleteCookie('clientsideLogin');

        }
        console.log('hi');
        navigate('/');
    };

    const dayOfWeek = (num) => {
        let obj = fullTime(num);
        setDay(obj.day);
        setWorkTime(obj.workTime);
    };

    return (
        <Navbar bg="transparent" data-bs-theme="dark" collapseOnSelect expand="lg"
            className={`bg-body-tertiary navbar-wrapper ${isScrolled ? 'sticky' : 'non-sticky'}`}>
            <Container>
                <Navbar.Brand href="/">Salon</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/#home">
                            <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
                        </Nav.Link>
                        <Nav.Link href="/#what-we-do">
                            <AiOutlineUser style={{ marginBottom: "2px" }} /> Services
                        </Nav.Link>
                        <Nav.Link href="/#hours-navigate">
                            <AiOutlineUser style={{ marginBottom: "2px" }} /> Hours
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <i className="info" aria-hidden="true"></i>
                            <label> (000) 000-0000 </label>
                        </Nav.Link>
                        <Nav.Link>
                            <i className="info" aria-hidden="true"></i>
                            <label> {day} - {workTime} </label>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {!clientsideLogin ?
                            <Container style={{ display: 'flex', alignItems: 'center' }}>
                                <Nav.Link onClick={login}>
                                    Login
                                </Nav.Link>
                                <span style={{ margin: '0px 2px', color: 'white' }}>/</span>

                                <Nav.Link as={Link} to='/register'>
                                    Register
                                </Nav.Link>

                            </Container>
                            : <Nav.Link onClick={logout}>
                                Logout
                            </Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

};

export default NavBar;
