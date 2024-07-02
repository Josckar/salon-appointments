import React from 'react';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import loadingIcon from '../../assets/loading_icon.gif';
import api from '../../axiosConfig';
import { Container, Form, Button, Image } from 'react-bootstrap';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();



    const handleRegister = async () => {
        let loading = document.querySelector('.register-loading');
        loading.style.display = 'block';

        let userData = {};
        userData.username = email;
        userData.password = password;
        userData.confirmPass = confirmPass;

        try {
            await api.post(`/register`, userData);
            navigate('/login');
            console.log('register success');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Bad request:', error.response);
                setError(error.response.data.error);
            } else {
                console.error('Axios request failed:', error);
            }
        } finally {
            loading.style.display = 'none';
        }
    };

    const registerByPress = (e) => {
        if (e.key === 'Enter') {
            handleRegister();
        }

    };

    return (
        <Container className='register-container'>

            <Container className='register-placeholder' />

            <Form>
                <Container className='register-form-container'>
                    <Container className='register-label'>
                        <h1>Register</h1>
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
                    <Form.Group className="mb-3">
                        <Form.Control type="password"
                            placeholder="Password..."
                            className='form-outline mb-4'
                            name='password'
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password"
                            placeholder="Password..."
                            className='form-outline mb-4'
                            name='confirmPassword'
                            onChange={(e) => setConfirmPass(e.target.value)}
                            onKeyPress={(e) => registerByPress(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div className='reg-btn-div'>
                            <Button variant='primary' onClick={handleRegister} className='btn-primary btn-block mb-4 reg-submit pink-btn'>Register</Button>
                        </div>
                        <div className='new-account-login'>
                            <Link to='/login' className='new-account-link'>
                                Already have an account?
                            </Link>
                        </div>
                    </Form.Group>
                    <Container className='login-div'>
                        <Image className='register-loading' src={loadingIcon} alt="Loading..." />
                    </Container>
                </Container>
            </Form>



        </Container >
    );
};

export default Register;
