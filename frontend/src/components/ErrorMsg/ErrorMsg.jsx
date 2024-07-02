import React from 'react';
import { Alert } from 'react-bootstrap';
import './ErrorMsg.css';

const ErrorMsg = ({ info }) => {
    return (
        <Alert variant="danger" className='error-msg'>
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            <span>{info}</span>
        </Alert>
    );
};

export default ErrorMsg;