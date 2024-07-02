import { config } from 'dotenv';
import mongoose from 'mongoose';

config( { path: '../.env' } );

const connect = async () => {

    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('MongoDB database connection established successfully');
        });
    }
    catch (err) {
        console.log(err);
    }

};

export default connect;