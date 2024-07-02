import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Intro.css';

const Intro = () => {
    return (
        <div className='intro' id='intro-navigate'>
            <div className='intro-text'>
                <h1 className='intro-h1'>Beauty Salon</h1>
                <div className='intro-para-div'>
                    <p className='text-center intro-para'>
                        Beauty Salon.
                    </p>
                </div>
                <NavLink to="/appointment" className="btn btn-pink">
                    <Button className='btn btn-pink'>Book An Appointment</Button>
                </NavLink>
            </div>
        </div>
    );
};

export default Intro;