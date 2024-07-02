import React, { useState, useEffect } from 'react';
import { setCookie } from '../../cookies';
import './Login.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import loadingIcon from '../../assets/loading_icon.gif';
import api from '../../axiosConfig';
import { Container, Form, Button, Image } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Login Rendered');

        const checkAuth = async () => {
            try {
                const response = await api.get(`$/api/check-auth`);
                if (response.data.authenticated) {
                    navigate('/profile');
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogin = async () => {
        let loading = document.querySelector('.login-loading');
        loading.style.display = 'block';

        let userData = {
            username: email,
            password: password,
        };

        try {
            let response = await api.post(`/login`, userData);
            console.log(response);
            let { admin } = response.data;
            setCookie('clientsideLogin', 'true', 1);
            setCookie('userID', response.data.userID, 1);
            console.log('login succeess');
            if (admin) {
                console.log("admin cookie");
                setCookie('admin', 'true', 1);
                navigate('/admin');
            } else {
                navigate('/appointment');
            }

        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Bad request:', error.response.data);
                setError(error.response.data.error);
            } else {
                console.error('Axios request failed:', error);
            }
        } finally {
            loading.style.display = 'none';
        }

    };

    const loginByPress = (e) => {
        if (e.key === 'Enter')
            handleLogin();
    };

    return (
        <Container className='login-container'>

            <Container className='placeholder' />

            <Form>

                <Container className='login-form-container'>
                    <Container className='label'>
                        <h1>Login</h1>
                        <Image src={logo} alt='Company Logo' className='logo' />
                    </Container>
                    {error && <ErrorMsg info={error} />}
                    <Form.Group>
                        <Form.Control type="text"
                            placeholder='Email'
                            className='form-outline mb-4'
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password"
                            placeholder='Password'
                            className='form-outline mb-4'
                            name='password'
                            onChange={(e) => setPass(e.target.value)}
                            onKeyPress={(e) => loginByPress(e)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Container className='login-div'>
                            <Button variant="primary" onClick={handleLogin} className='btn-primary btn-block mb-4 reg-submit pink-btn'>Login</Button>
                        </Container>

                        <Container className='new-account-login'>
                            <Link to='/register' className='new-account-link small fw-bold mt-2 pt-1 mb-0'>
                                No account?
                            </Link>
                        </Container>
                    </Form.Group>

                    <Container className='login-div'>
                        <Image className='login-loading' src={loadingIcon} alt="Loading..." />
                    </Container>
                </Container>

            </Form>

        </Container>

    );
};

export default Login;
