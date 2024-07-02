
import Router from 'express';
import User from '../models/User.mjs';
import Appointment from '../models/Appointment.mjs';
import passport from 'passport';

const router = Router();

router.get('/', function (req, res) {
    res.status(200).send({ message: 'Server connected' });
});

router.post('/register', async function (req, res, next) {
    console.log('registering user');
    console.log(req.body);
    try {
        const username = req.body.username || req.body.email;
        const newUser = new User({ username: username });
        await User.register(newUser, req.body.password);
    } catch (err) {
        console.error('error while user register!', err);
        return res.status(400).send({ error: err });
    }
    console.log('user registered!');
    return res.status(200).send({ message: 'success' });
});

router.post('/login', passport.authenticate('local', { failureFlash: false }), function (req, res) {
    console.log(req.user._id);
    return res.status(200).send({ message: 'success', userID: req.user._id, admin: req.user.admin });
});

router.post('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            return res.status(400).send({ error: err });
        } else {
            res.status(200).send({ message: 'logged out' });
        }
    });
});

export default router;