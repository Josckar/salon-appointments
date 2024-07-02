import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../../axiosConfig.jsx';

const DefaultRow = ({ item, onSave = () => { }, onDelete = () => { } }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedItem, setEditedItem] = useState({ ...item });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await api.post('api/update-item', editedItem);
            onSave(editedItem);
            setIsEditMode(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await api.post('api/delete-item/', editedItem);
            if (response.status === 200) {
                onDelete(item._id);
                window.location.reload();
            } else {
                throw new Error('Failed to delete the item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <tr>
            {isEditMode ? (
                <>
                    <td><input type="text" name="category1" value={editedItem.category1} onChange={handleInputChange} /></td>
                    <td><input type="text" name="category2" value={editedItem.category2} onChange={handleInputChange} /></td>
                    <td><input type="text" name="category3" value={editedItem.category3} onChange={handleInputChange} /></td>
                    <td><input type="text" name="category4" value={editedItem.category4} onChange={handleInputChange} /></td>
                    <td>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                        <Button variant="danger" onClick={() => setIsEditMode(false)}>Cancel</Button>
                    </td>
                </>
            ) : (
                <>
                    <td>{item.category1}</td>
                    <td>{item.category2}</td>
                    <td>{item.category3}</td>
                    <td>{item.category4}</td>
                    <td>
                        <Button variant="primary" onClick={() => setIsEditMode(true)}>Edit</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default DefaultRow;