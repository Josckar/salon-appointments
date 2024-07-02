import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../../../axiosConfig.jsx';

const AppointmentRow = ({ item, onSave = () => {}, onDelete = () => {} }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedAppointment, setEditedAppointment] = useState({ ...item });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAppointment(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await api.post('api/update-appointment', editedAppointment);
            onSave(editedAppointment);
            setIsEditMode(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this appointment?');
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await api.post('api/delete-appointment/', editedAppointment);
            if (response.status === 200) {
                onDelete(item._id);
                window.location.reload();
            } else {
                throw new Error('Failed to delete the appointment');
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    return (
        <tr>
            {isEditMode ? (
                <>
                    <td><input type="text" name="name" value={editedAppointment.name} onChange={handleInputChange} /></td>
                    <td><input type="text" name="date" value={editedAppointment.date} onChange={handleInputChange} /></td>
                    <td><input type="text" name="time" value={editedAppointment.time} onChange={handleInputChange} /></td>
                    <td><input type="text" name="phone" value={editedAppointment.phone} onChange={handleInputChange} /></td>
                    <td><input type="text" name="employee" value={editedAppointment.employee} onChange={handleInputChange} /></td>
                    <td><input type="text" name="customer" value={editedAppointment.customer} onChange={handleInputChange} /></td>
                    <td>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                        <Button variant="danger" onClick={() => setIsEditMode(false)}>Cancel</Button>
                    </td>
                </>
            ) : (
                <>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.phone}</td>
                    <td>{item.employee}</td>
                    <td>{item.customer}</td>
                    <td>
                        <Button variant="primary" onClick={() => setIsEditMode(true)}>Edit</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default AppointmentRow;