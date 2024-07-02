import request from 'supertest';
import { expect } from 'chai';
import express from 'express';
import authRoute from '../routes/auth.mjs'; // Adjust the path as per your project structure
import setup from './setup.mjs'; // Adjust the path as per your project structure
import passport from 'passport';
import NewUser from '../models/User.mjs';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
app.use(express.json());

const mongoStoreOptions = {
    mongoUrl: setup.mongoUri,
    collection: 'sessions'
};

const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'real secret keys should be long and random',
    resave: false,
    saveUninitialized: false,
    dbName: 'test',
    store: MongoStore.create(mongoStoreOptions),
};

app.use(session(sessionOptions));


app.use(passport.initialize());
app.use(passport.session());
passport.use(NewUser.createStrategy());

passport.serializeUser(NewUser.serializeUser());
passport.deserializeUser(NewUser.deserializeUser());

app.use('/', authRoute);

before(async () => {
    await setup.startDatabase();
});

// Stop the MongoDB Memory Server after all tests
after(async () => {
    await setup.stopDatabase();
});

describe('GET /', () => {

    it('Connects and responds with JSON', async () => {
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).expect({ message: 'Server connected' });
    });
});

describe('POST /register', () => {
    it('Registers a new user and responds with JSON', async () => {
        const newUser = {
            username: 'testuser',
            password: 'testpassword'
        };

        const response = await request(app)
            .post('/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

    });
});

describe('POST /login, GET /api/check-auth', () => {
    it('Registers, then logs in a user and responds with JSON', async () => {
        const newUser = {
            username: 'testuser2',
            password: 'testpassword'
        };

        // Register the user
        let response = await request(app)
            .post('/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        // Login the user
        response = await request(app)
            .post('/login')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .get('/api/check-auth');

    });
});


