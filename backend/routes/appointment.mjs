import Router from 'express';
import appointment from '../models/Appointment.mjs';
import Users from '../models/User.mjs';

const router = Router();

/**
 * Schedule an appointment for the user
 */
router.post('/appointment', async (req, res) => {
    console.log('Scheduling Appointment');
    console.log('Appointment Data', req.body);
    const userID = req.body.userID;
    let employee, customer;
    const verifyUser = await Users.findById(userID);
    console.log('Verify User', verifyUser);
    if ( verifyUser ) {
        if (verifyUser.appointmentTaker) {
            employee = verifyUser;
            customer = await Users.findById(req.body.customer._id);
        } else {
            customer = verifyUser;
            employee = await Users.findById(req.body.employee._id);
        }
    }

    if(!employee) {
        employee.name = 'Employee not provided';
    }
    if(!customer) {
        customer.name = 'Customer not provided';
    }
    console.log('Employee: ', employee, 'Customer:', customer);

    try {
        const appointmentExists = await appointment.find({ userID: userID });
        if (appointmentExists[0]) {
            console.log('User already has an appointment');
            return res.status(400).send({ error: 'You already have an appointment' });
        }

        const timeExists = await appointment.find({ appointmentKey: req.body.key });
        if (timeExists[0]) {
            console.log('Time is unavailable');
            return res.status(400).send({ error: 'Time is unavailable, try another time' });
        }
    } catch (error) {
        console.log('No appointment, appointment being set');
    }

    const { key, name, date, time, phone, timeInMS } = req.body;

    const newAppointment = new appointment({
        userID,
        appointmentKey: key,
        name,
        date,
        time,
        phone,
        timeInMS,
        employee: employee.name,
        customer: customer.name,
    });
    newAppointment.save();
    console.log(userID);
    try {
        const user = await Users.findById(userID);
        if (user) {
            console.log('User found:', user);
            user.save();
        } else {
            console.log('No user found with this ID.');
        }
    } catch (err) {
        console.error('Error finding user:', err);
        return res.status(400).send({ error: 'Error finding user' });
    }
    return res.status(200).send('Appointment scheduled successfully!');
});

/**
 * Modify an appointment for the user
 */
router.post('/change-appointment', async (req, res) => {

    console.log('Changing existing appointment', req.body);
    const userID = req.user._id;

    try {

        const appointmentExists = await appointment.find({ userID: userID });
        console.log('Appointment found',  appointmentExists[0]);
        const apptId = appointmentExists[0].id;

        const timeExists = await appointment.findById(apptId);
        if (timeExists[0]) {
            console.log('Time is unavailable');
            return res.status(400).send({ error: 'Time is unavailable, try another time' });
        }
        const { key, date, time, day, timeInMS } = req.body;
        appointmentExists[0].date = date;
        appointmentExists[0].time = time;
        appointmentExists[0].day = day;
        appointmentExists[0].timeInMS = timeInMS;
    
        appointmentExists[0].save();
    } catch (error) {
        console.log("User's appointment not found", error);
    }
    return res.status(200).send( { message: 'Appointment Changed Successfully' });
});

/**
 * Retrieve an appointment for the user, if it exists
 */
router.get('/get-appointment', async (req, res) => {

    console.log('user appointment');
    const userID = req.user._id;

    try {
        const appointmentExists = await appointment.find({ userID: userID });

        console.log('not found');

        const obj = {};
        obj.day = appointmentExists[0].day;
        obj.time = appointmentExists[0].time;
        obj.date = appointmentExists[0].date;

        return res.status(200).send(obj);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Appointment not found' });
    }

});

/**
 * Delete an appointment for the user, if it exists
 */
router.post('/cancel-appointment', async (req, res) => {

    console.log('cancel appointment', req.body);

    const appointmentExists = await appointment.find({ userID: req.user._id });
    if (!appointmentExists[0]) {
        return res.status(400).send({ error: 'Appointment not found' });
    }

    try {
        const deleteRes = await appointment.deleteOne({ _id: appointmentExists[0]._id });
        console.log('deleteRes: ', deleteRes);

    } catch (error) {
        console.log('Error cancelling appointment', error);
    }
    res.status(200).send( { message: 'Appointment successfully cancelled' } );
});

export default router;