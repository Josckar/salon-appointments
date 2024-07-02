import React, { useEffect, useState } from 'react';
import './Users.css';
import api from '../../../axiosConfig';
import { Container } from 'react-bootstrap';
import Table from '../Table/Table';
import Row from './UserRow/UserRow';

const Users = () => {
    const [adminUsers, setAdminUsers] = useState([]);
    const [nonAdminUsers, setNonAdminUsers] = useState([]);
    const [servicers, setServicers] = useState([]);
    const [columnWidths, setColumnWidths] = useState({ email: 0, name: 0, phone: 0 });

    const userColumns = [
        { name: 'Email', width: columnWidths.email },
        { name: 'Name', width: columnWidths.name },
        { name: 'Phone', width: columnWidths.phone },
        { name: 'Appointment Taker', width: 'auto' },
        { name: 'Admin', width: 'auto' }
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/get-users');
                if (response) {
                    const users = response.data.users;
                    calculateColumnWidths(users);
                    const admins = [];
                    const servicers = [];
                    const nonAdmins = [];

                    users.forEach(user => {
                        if (user.admin) {
                            admins.push(user);
                        } else if (user.appointmentTaker) {
                            servicers.push(user);
                        } else {
                            nonAdmins.push(user);
                        }
                    });
                    console.log(admins, servicers, nonAdmins);
                    setNonAdminUsers(nonAdmins);
                    setAdminUsers(admins);
                    setServicers(servicers);

                } else {
                    throw new Error(response.error || 'Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
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
                <h1>Admin Users</h1>
                <Table columns={userColumns} data={adminUsers} RowComponent={Row} />
            </Container>
            <Container className='user-list'>
                <h1>Servicers</h1>
                <Table columns={userColumns} data={servicers} RowComponent={Row} />
            </Container>
            <Container className='user-list'>
                <h1>Customers</h1>
                <Table columns={userColumns} data={nonAdminUsers} RowComponent={Row} />
            </Container>
        </Container>
    );
};

export default Users;