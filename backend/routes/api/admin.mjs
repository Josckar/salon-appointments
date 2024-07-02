import Router from 'express';
import User from '../../models/User.mjs';
import Appointment from '../../models/Appointment.mjs';

const router = Router();

/**
 * Middleware function to only allow access to admin users
 */
function isAdmin(req, res, next) {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.status(403).send({ error: 'Access denied. Admin rights required.' });
    }
}

router.use(isAdmin);

/**
 * Get all users
 */
router.get('/get-users', async (req, res) => {
    try {
        const users = await User.find({});
        console.log('Sending Users');
        res.status(200).send({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Error fetching users' });
    }
});

/**
 * Update a user
 */
router.post('/update-user', async (req, res) => {  
    const editedUser = req.body;
    console.log(editedUser);

    User.findById(editedUser._id, (err, user) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).send({ error: 'Error finding appointments' });
        }

        user.username = editedUser.username;
        user.name = editedUser.name;
        user.phone = editedUser.phone;
        user.appointmentTaker = editedUser.appointmentTaker;
        user.admin  = editedUser.admin;

        user.save((err) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(500).send({ error: 'Error updating user' });
            }
            res.status(200).send({ message: 'User updated' });
        });
    });

});

/**
 * Delete a user
 */
router.post('/delete-user', async (req, res) => {
    console.log('Deleting user', req.body);
    const userId = req.body._id;

    try {
        const user = await User.findById(userId);
        console.log('User found', user);
        await User.findByIdAndDelete(userId);
        console.log('User deleted');
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
    
    const appt = await Appointment.find({ userID: userId });
    if (appt[0]) {
        try {
            const deleteRes = await Appointment.deleteOne({ _id: appt[0]._id });
            console.log('Deleting Appointment: ', deleteRes);
            return res.status(200).send({ message: 'User deleted, Appointment deleted' });
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log('User had no appointments');
    }

    return res.status(200).send({ message: 'User deleted' });

});

/**
 * Get all appointments
 */
router.get('/get-appointments', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ error: 'User not authenticated' });
    }
    try {
        const appts = await Appointment.find({});
        console.log('Sending Appointments', appts);
        res.status(200).send({ appts });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

/**
 * Update an appointment
 */
router.post('/update-appointment', async (req, res) => {  
    const editedAppt = req.body;
    console.log('Deleting appointment', editedAppt);
    Appointment.findById(editedAppt._id, (err, appt) => {
        if (err) {
            console.error('Error finding appointment:', err);
            return res.status(500).send({ error: 'Error finding appointment' });
        }

        appt.appointmentKey = editedAppt.appointmentKey;
        appt.name = editedAppt.name;
        appt.date = editedAppt.date;
        appt.time = editedAppt.time;
        appt.phone = editedAppt.phone;
        appt.day = editedAppt.day;
        appt.timeInMS = editedAppt.timeInMS;
        appt.employee = editedAppt.employee;
        appt.customer = editedAppt.customer;
        appt.appointmentTaker = editedAppt.appointmentTaker;

        appt.save((err) => {
            if (err) {
                console.error('Error updating appointment:', err);
                return res.status(500).send({ error: 'Error updating appointment' });
            }
            res.status(200).send({ message: 'Appointment updated' });
        });
    });

});

/**
 * Delete an appointment
 */
router.post('/delete-appointment', async (req, res) => {
    console.log('Deleting Appointment', req.body);
    const apptId = req.body._id;

    if (!req.isAuthenticated()) {
        return res.status(401).send({ error: 'User not authenticated' });
    }

    try {
        const appt = await Appointment.findById(apptId);
        if (!appt) {
            return res.status(404).send({ error: 'Appointment not found' });
        }
        await Appointment.findByIdAndDelete(apptId);
        console.log('Appointment deleted');
        res.status(200).send({ message: 'Appointment successfully deleted' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).send({ error: 'Error deleting appointment' });
    }
});

export default router;