import React, { useState, useEffect } from 'react';
import './Schedule.css';
import { Container, Row } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { fullTime, time } from '../../../time';

const Hours = () => {
    const [currentDay, setCurrentDay] = useState(0);

    useEffect(() => {
        let { day } = time();
        setCurrentDay(day);
    }, []);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <Container fluid className='hours' id='hours-navigate'>
            <Row className='hours-container'>
            <h1 className="display-4">Working Hours</h1>

                <ListGroup>
                    {days.map((day, index) => {
                        let { workTime } = fullTime(index);
                        return (
                            <ListGroup.Item key={index} className={currentDay === index ? 'active-day' : 'inactive-day'}>
                                <h2>{day} - {workTime}</h2>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Row>
        </Container>
    );
};

export default Hours;