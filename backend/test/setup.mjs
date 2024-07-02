import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongoServer = await MongoMemoryServer.create();

async function startDatabase() {

    if (mongoose.connection.readyState) {
    // If it does, disconnect from it
        await mongoose.disconnect();
    }
  
  
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
}

async function stopDatabase() {
    await mongoose.disconnect();
    await mongoServer.stop();
}

// Initialize and start the MongoDB Memory Server before all tests
before(async () => {
    await startDatabase();
});

// Stop the MongoDB Memory Server after all tests
after(async () => {
    await stopDatabase();
});

const setup = {
    startDatabase: async () => {
        await startDatabase();
    },
    stopDatabase: async () => {
        await stopDatabase();
    },
    beforeAll: async () => {
        before(async () => {
            await startDatabase();
        });
    },
    afterAll: async () => {
        after(async () => {
            await stopDatabase();
        });
    },
    mongoUri : mongoServer.getUri(),
};

export default setup;