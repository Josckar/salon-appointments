import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const newUser = new mongoose.Schema({

    name: {
        type: String
    },
    username: {
        type: String
    },
    salt: {
        type: String
    },
    hash: {
        type: String
    },
    phone: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    appointmentTaker: {
        type: Boolean,
        default: false
    }
});

newUser.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', newUser);

export default UserModel;

