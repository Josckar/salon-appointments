import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import profileImg from '../../assets/profile-img.jpg';
import { useNavigate } from 'react-router-dom';
import api from "../../axiosConfig";
import { getCookie, setCookie, setCookieInMins } from '../../cookies';
import { Container, Row, Col, Button, Image, Form, Card } from 'react-bootstrap';

const UserProfile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPhone, setUpdatedPhone] = useState('');

    const [time, setTime] = useState('Empty');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getProfile(getCookie('userID'));
    }, []);



    const getProfile = async () => {
        const userID = getCookie('userID');
        try {
            const response = await api.get(`/profile-data`, { params: { userID } });
            let { username, name, phone } = response.data;
            setName(name);
            setEmail(username);
            setPhone(phone);
            setCookie('phone', phone, 2);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data.error);
        }

        try {
            const response = await api.get(`/get-appointment`, { params: { userID } });
            console.log(response.data);
            let { day, time, date } = response.data;
            setTime(time);
            setDate(date);
            setDay(day);
        } catch (error) {
            console.error(error.response.data.error);
        }
    };

    const updateProfile = async () => {
        let obj = { userID: getCookie('userID') };

        if (updatedName !== '') {
            obj.name = updatedName;
        }
        if (updatedEmail !== '') {
            obj.email = updatedEmail;
        }
        if (updatedPhone !== '') {
            obj.phone = updatedPhone;
        }

        if (Object.keys(obj).length === 1) { 
            alert('all fields are empty');
        } else {
            try {
                const response = await api.post('/update-profile', obj);
                let { error } = response.data;

                if (error) {
                    alert('update profile: ' + error);
                } else {
                    if (updatedEmail !== '') setEmail(updatedEmail);
                    if (updatedPhone !== '') {
                        setPhone(updatedPhone);
                        setCookie('phone', updatedPhone, 2);
                    }
                    if (updatedName !== '') {
                        setName(updatedName);
                        setCookie('name', updatedName, 2);
                    }
                    alert('data successfully updated!');
                    window.location.reload(false);
                    console.log('server res: ', response.data);
                }
            } catch (error) {
                console.error(error.response.data.error);
            }
        }
    };


    const changeAppointment = () => {
        console.log('change appointment');

        if (time === 'Empty') {
            alert('No existing appointment to change');
        } else {
            setCookieInMins('change', true, 1);
            navigate('/appointment');
        }
    };

    const cancelAppointment = async () => {
        try {
            let response = await api.post('/cancel-appointment', { id: getCookie('userID') });
            console.log(response.data);

            alert('Appointment deleted');
            window.location.replace('/profile');

        } catch (error) {
            alert(error);
            console.error(error.response.data.error);
        }

    };

    const deleteAcc = async () => {
        console.log('id cookie ', getCookie('userID'));
        let response = await api.post('/delete-account', { id: getCookie('userID') });
        let { error } = response.data;
        if (error) {
            alert(error);
            console.error(error.response.data.error);
        }
        else {
            const cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            }
            alert(response.data);
            window.location.replace('/');
        }
    };

    return (
        <Container fluid className='user-profile-container'>
            <Container>
                <Col className="right-column">
                <Image src={profileImg} alt="" roundedCircle className="profile-img" />
                    <Card id="user-profile-info" className="user-profile-box">
                        <Card.Body>
                            <Card.Title>Profile Info</Card.Title>
                            <div className="profile-underline"></div>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control readOnly defaultValue={name} className="readOnlyInput mb-3" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control readOnly defaultValue={email} className="readOnlyInput mb-3" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone:</Form.Label>
                                    <Form.Control readOnly defaultValue={phone} className="readOnlyInput mb-3" />
                                </Form.Group>
                            </Form>
                            <Card className="user-profile-appointment">
                                <Card.Body>
                                    <Col>
                                        <Card.Title>Your Appointment is on:</Card.Title>
                                        <Row>
                                            <Col>
                                                <p>{day}, {date} at {time}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Button onClick={changeAppointment} id="change-btn" className='pink-btn'>Change Appointment</Button>
                                    <Button onClick={cancelAppointment} id="cancel-btn" className='pink-btn'>Cancel Appointment</Button>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                    <Card id="update-profile" className="user-profile-box">
                        <Card.Body>
                            <Card.Title>Update Info</Card.Title>
                            <div className="profile-underline"></div>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder="name..." onChange={(e) => setUpdatedName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" placeholder="email..." onChange={(e) => setUpdatedEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone:</Form.Label>
                                    <Form.Control type="text" placeholder="phone..." onChange={(e) => setUpdatedPhone(e.target.value)} />
                                </Form.Group>
                                <Button onClick={updateProfile} className="update-btn">Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card id="user-profile-delete-acc" className="user-profile-box">
                        <Card.Body>
                            <Card.Title>Delete Account</Card.Title>
                            <div className="profile-underline"></div>
                            <p>Deleting your account is a permanent action...</p>
                            <Button variant="danger" onClick={deleteAcc} id="profile-delete-btn">Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>


        </Container>
    );
};

export default UserProfile;