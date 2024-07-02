import React, { useEffect, useState } from 'react';
import './Appointments.css';
import api from '../../../axiosConfig';
import { Container } from 'react-bootstrap';
import Table from '../Table/Table';
import Row from './AppointmentRow/AppointmentRow';

const Users = () => {
    const [appointments, setAppointments] = useState([]);
    const [columnWidths, setColumnWidths] = useState({ email: 0, name: 0, phone: 0 });

    const appointmentColumns = [
        { name: 'Name', width: columnWidths.name },
        { name: 'Date', width: columnWidths.date },
        { name: 'Time', width: columnWidths.time },
        { name: 'Phone', width: columnWidths.phone },
        { name: 'Employee', width: 'auto' },
        { name: 'Customer', width: 'auto' }
    ];

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/api/get-appointments');
                if (response) {
                    const appts = response.data.appts;
                    console.log("Appointments", appts);
                    calculateColumnWidths(appts);
                    setAppointments(appts);
                } else {
                    throw new Error(response.error || 'Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchAppointments();
    }, []);

    const calculateColumnWidths = (users) => {
        let maxWidths = { email: 0, name: 0, phone: 0 };
        users.forEach(user => {
            maxWidths.email = Math.max(maxWidths.email, user.username?.length || 0);
            maxWidths.name = Math.max(maxWidths.name, user.name?.length || 0);
            maxWidths.phone = Math.max(maxWidths.phone, user.phone?.length || 0);
        });
        setColumnWidths({
            email: maxWidths.email + 20,
            name: maxWidths.name + 20,
            phone: maxWidths.phone + 20,
        });
    };

    return (
        <Container>
            <Container className='user-list'>
                <h1>Appointments</h1>
                <Table columns={appointmentColumns} data={appointments} RowComponent={Row} />
            </Container>
        </Container>
    );
};

export default Users;