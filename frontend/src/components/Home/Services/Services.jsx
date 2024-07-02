import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import hairWash from '../../../assets/hair_wash.jpg';
import hairCut from '../../../assets/hair_cut.jpg';
import products from '../../../assets/products.jpg';
import logo from '../../../assets/logo.png';

import './Services.css';

const Services = () => {
    return (
        <Container fluid className='services' id='what-we-do'>
            <Row className='services-container'>
                <Col className='services-info'>
                    <Image src={logo} alt='' />
                    <h1>What do we do?</h1>
                    <p className='mr-bottom services-para'>What do we do?</p>
                    <p className='mr-bottom services-para'></p>
                </Col>
            </Row>

            <Row>
                <Row className='services-grid'>
                    <Col className='services-box'>
                        <Image src={hairCut} alt='' />
                        <h2>Haircuts</h2>
                        <p className='mr-bottom services-para'>We cut hair</p>
                        <p className='mr-bottom services-para'></p>
                    </Col>
                    <Col className='services-box'>
                        <Image src={hairWash} alt='' />
                        <h2>Wash and Condition</h2>
                        <p className='mr-bottom services-para'>Wash and Condition</p>
                        <p className='mr-bottom services-para'></p>
                    </Col>
                    <Col className='services-box'>
                        <Image src={products} alt='' />
                        <h2>Hair Products</h2>
                        <p className='mr-bottom services-para'>We sell products</p>
                        <p className='mr-bottom services-para'></p>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default Services;