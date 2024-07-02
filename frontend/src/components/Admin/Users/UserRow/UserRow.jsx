import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../../../axiosConfig.jsx';

const UserRow = ({ item, onSave = () => { }, onDelete = () => { } }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...item });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setEditedUser(prev => ({ ...prev, [name]: inputValue }));
    };

    const handleSave = async () => {
        try {
            await api.post('api/update-user', editedUser);
            onSave(editedUser);
            setIsEditMode(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this user?');
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await api.post('api/delete-user/', editedUser);
            if (response.status === 200) {
                onDelete(item._id);
                window.location.reload();
            } else {
                throw new Error('Failed to delete the user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <tr>
            {isEditMode ? (
                <>
                    <td><input type="text" name="username" value={editedUser.username} onChange={handleInputChange} /></td>
                    <td><input type="text" name="name" value={editedUser.name} onChange={handleInputChange} /></td>
                    <td><input type="text" name="phone" value={editedUser.phone} onChange={handleInputChange} /></td>
                    <td><input type="checkbox" name="appointmentTaker" checked={editedUser.appointmentTaker} onChange={handleInputChange} /></td>
                    <td><input type="checkbox" name="admin" checked={editedUser.admin} onChange={handleInputChange} /></td>
                    <td>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                        <Button variant="danger" onClick={() => setIsEditMode(false)}>Cancel</Button>
                    </td>
                </>
            ) : (
                <>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td><input type="checkbox" name="appointmentTaker" checked={item.appointmentTaker} readOnly /></td>
                    <td><input type="checkbox" name="admin" checked={item.admin} readOnly /></td>
                    <td>
                        <Button variant="primary" onClick={() => setIsEditMode(true)}>Edit</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default UserRow;