# Salon Appointment System

## Overview

The Salon Appointment System is a full-stack web application for booking, managing, and canceling appointments for both clients and administrators in a salon. 

The server requires a .env file to run, [.env](./.env)
```
MONGO_URI=mongodb://127.0.0.1:27017/ 
DB_NAME=test 
PORT=5000
# A Comma separated list of your CORS Origins. For development purposes, this is (typically) sufficient
ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173 

BACKEND_APP_ADDRESS=http://127.0.0.1 
BACKEND_APP_PORT=5000 
```

## Features

- **User Registration and Authentication**: Secure sign-up and login process for users and administrators.
- **Appointment Scheduling**: Users may schedule new appointments with specific employees based on availability.
- **Appointment Management**: Users can view, modify, or cancel their existing appointment.
- **Control Panel**: Administrators can manage all scheduled appointments and user accounts.

## Use Cases

### User

As a User, you may:
- Schedule an appointment with any available employee
- View, modify, and cancel your scheduled appointment
- Modify your account information (Email, Name, Password)

### Appointment Taking Employee

In addition to a User's capabilities, as an Appointment Taking Employee, you may:
- **TBA** View, Modify, and Cancel all your scheduled appointments via a centralized control panel

### Administrator
In addition to a User's capabilities, as an Admin, you may:
- Manage all User accounts via a centralized control panel: 
    - Modify Username, Email and Roles (Service Worker, Admin)
- **TBA** View, Modify, and Cancel existing appointments

## Technologies

- **Frontend**: React.js with Vite.
- **Styling**: Bootstrap and React-Bootstrap for modern UI.
- **Backend**: 
    - **Server** Node.js with Express.js for REST API Responses handling sensitive information.
    - **Authentication**: Passport.js for secure user authentication and session management.
    - **Database**: MongoDB with Mongoose ODM for data modeling, storage, and management.

## Data Models

### Customer: 
 ```js
 const newUser = new User({

    username: "John@gmail.com",

    // Salt and Hash are stored in place of passwords in order to store an account's password securely
    salt: "real salts are long and random",
    hash: "real hashes are long and random",
    // Salt and Hash are stored in place of passwords in order to store an account's password securely

    phone: "(987) 654-3210",

    // admin and appoiintmentTaker determine (and are the only distinction between) whether or not a User is an administrator or appointment taker, respectively
    admin: false,
    appointmentTaker: false,

    //TBA
    Appointments: 
    [
        Appointment {
            userID: "12345",
            appointmentKey: "2023/04/0114:00",
            name: "John Doe",
            date: "2023/04/01",
            time: "14:00",
            phone: "555-1234",
            day: "Saturday",
            timeInMS: 1672455600000,
            employee: "Jane Smith",
            customer: "John Doe",
        },
    ]
});
```

### Appointment Taker (non-admin)
 ```js
 const newUser = new User({

    username: "John@gmail.com",

    // Salt and Hash are stored in place of passwords in order to store an account's password securely
    salt: "real salts are long and random",
    hash: "real hashes are long and random",

    phone: "(987) 654-3210",

    // admin and appontmentTaer determine (and are the only distinction between) whether or not a User is an administrator or appointment taker, respectively
    admin: false,
    appointmentTaker: true,

    //TBA
    Appointments: 
    [
        Appointment {
            userID: "12345",
            appointmentKey: "2023/04/0114:00",
            name: "John Doe",
            date: "2023/04/01",
            time: "14:00",
            phone: "555-1234",
            day: "Saturday",
            timeInMS: 1672455600000,
            employee: "Jane Smith",
            customer: "John Doe",
        },
    ]
});
```

### Appointment Taker and Admin
 ```js
 const newUser = new User({

    username: "John@gmail.com",

    // Salt and Hash are stored in place of passwords in order to store an account's password securely
    salt: "real salts are long and random",
    hash: "real hashes are long and random",

    phone: "(987) 654-3210",

    // admin and appointmentTaker determine (and are the only distinction between) whether or not a User is an administrator or appointment taker, respectively
    admin: true,
    appointmentTaker: true, 

    // TBA
    Appointments: 
    [
        Appointment {
            userID: "12345",
            appointmentKey: "2023/04/0114:00",
            name: "John Doe",
            date: "2023/04/01",
            time: "14:00",
            phone: "555-1234",
            day: "Saturday",
            timeInMS: 1672455600000,
            employee: "Jane Smith",
            customer: "John Doe",
        },
    ]
});
```

### Appointment 

TBA

```js
    const appt = new Appointment({
        userID: "12345",
        appointmentKey: "abcde12345",
        name: "John Doe",
        date: "2023/04/01",
        time: "14:00",
        phone: "555-1234",
        day: "Saturday",
        timeInMS: 1672455600000,
        employee: "Jane Smith",
        customer: "John Doe",
    }),
```
