# Server

This directory contains the server-side code for the application, built with Express.js and other Node.js libraries. It's responsible for handling API requests, interacting with the database, and serving as the backend part of the project.

## Getting Started

To get the server running locally:

- Navigate to the [server](/server) directory from the root of the project.
- Install dependencies with `npm install`.
- Start the server using `npm start`. This will use nodemon for hot reloading.

## Available Scripts

In the `server` directory, you can run:

### `npm start`

Runs the server in development mode with hot reload enabled.

### `npm run mocha`

Runs the Mocha test suite. Make sure to write your tests in the `test` directory.

## Environment Variables

You need to set up your environment variables before running the server. Create a `.env` file in the `server` directory and include the following variables:

- `MONGO_URI`: The MongoDB connection string.
- `DB_NAME` : The Mongo Database Name, defaults to test
- `PORT`: The port on which the server will run, defaults to 5000.

## Structure

- `config/`: Contains configuration files, including the database setup.
- `models/`: Contains Mongoose models for the application's data.
- `routes/`: Contains route definitions for the API.
- `server.mjs`: The entry point to the server application.

## Testing

Testing is set up with Mocha and Chai. Tests are located in the `test` directory. Run tests with `npm run mocha`.
