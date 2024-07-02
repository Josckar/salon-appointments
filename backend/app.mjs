import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import connect from './config/db.mjs';
import authenticationRoutes from './routes/auth.mjs';
import appointmentRoutes from './routes/appointment.mjs';
import profileRoutes from './routes/profile.mjs';
import apiRoutes from './routes/api/api.mjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import User from './models/User.mjs';


const app = express();

dotenv.config();

const mongoStoreOptions = {
    mongoUrl: process.env.MONGO_URI,
    collection: 'sessions'
};

const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'real secret keys should be long and random',
    resave: false,
    saveUninitialized: false,
    dbName: process.env.DB_NAME || 'test',
    store: MongoStore.create(mongoStoreOptions),
    cookie:{
        sameSite: 'none',
        secure: true
    }
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionOptions));


app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',') || ['http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    sameOrigin: true
}));

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

connect();

app.use('/', authenticationRoutes);
app.use('/', appointmentRoutes);
app.use('/', profileRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);

app.listen(PORT, '0.0.0.0', () => console.log(`Server has started on port: ${PORT}`));