import mongoose from 'mongoose';

const newAppointment = new mongoose.Schema({

    userID:{
        type:String
    },
    appointmentKey:{
        type:String
    },
    name:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },   
    phone:{
        type:String
    },
    day:{
        type:String
    },
    timeInMS:{
        type:Number
    },
    employee:{
        type:String
    },
    customer:{
        type:String
    },
});

const appointment = mongoose.model('appointment', newAppointment);

export default appointment;
