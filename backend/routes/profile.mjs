import Router from 'express';
import Users from '../models/User.mjs';
import NewAppointment from '../models/Appointment.mjs';

const router = Router();

/**
 * Get user data of the logged in user
 */
router.get('/profile-data', async (req, res) => {

    console.log('profile data');
    try {
        const user = await Users.findById(req.query.userID);
        console.log(user);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        if (user._id !== req.user._id) {
            return res.status(403).send({ error: 'Authentication mismatch, data requested not of the authenticated user' });
        }
        res.status(200).send({
            username: user.username,
            phone: user.phone,
            name: user.name
        });
    } catch (error) {
        console.log(error);
        return res.status(404).send({ error: 'An error occurred while fetching user data' });
    }

});

/**
 * Update user profile
 */
router.post('/update-profile', async (req, res) => {

    console.log('update profile');
    const { name, phone, userID } = req.body;
    console.log(name, phone, userID);
    const username = req.body.username || req.body.email;
    const user = await Users.findOne({ _id: userID });
    if (!user){
        return res.status(404).send({ error: 'User not found' });
    } 
    
    if (name) {
        user.name = name;
    }
    if (username) {
        user.username = username;
    } 
    if (phone) {
        user.phone = phone;
    }
    console.log(user);

    user.save();
    res.send('update succeed');
});

/**
 * Delete the user's account
 */
router.post('/delete-account', async (req, res) => {

    console.log('delete account: ', req.body);

    const appointmentExists = await NewAppointment.find({ userID: req.body.id });
    if (appointmentExists[0]) {

        try {
            const deleteRes = await NewAppointment.deleteOne({ _id: appointmentExists[0]._id });
            console.log('deleteRes: ', deleteRes);

        } catch (e) {
            console.log(e);
        }
    }

    try {
        const userDeleteRes = await Users.deleteOne({ _id: req.body.id });
        console.log('user deleted: ', userDeleteRes.deletedCount);

    } catch (e) {
        console.log(e);
    }

    res.status(200).send('Account deleted successfully');

});

export default router;